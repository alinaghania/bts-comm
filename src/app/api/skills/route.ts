import { type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COMPETENCES } from "@/lib/competences";

function getUserId(request: NextRequest): string | null {
  return request.headers.get("x-user-id");
}

/**
 * Initialise les 18 competences pour un nouvel utilisateur.
 */
function buildDefaultSkills(userId: string) {
  const now = new Date().toISOString();
  return COMPETENCES.map((c) => ({
    userId,
    skillId: c.id,
    label: c.label,
    exam: c.exam.toUpperCase(),
    score: 0,
    confidence: 0,
    lastPracticedAt: null,
    streak: 0,
    errorPatterns: [] as string[],
    prerequisites: getPrerequisites(c.id),
    createdAt: now,
    updatedAt: now,
  }));
}

/**
 * Retourne les prerequis connus pour une competence.
 */
function getPrerequisites(skillId: string): string[] {
  const prereqs: Record<string, string[]> = {
    "e1-relier-corpus": ["e1-positions-corpus"],
    "e1-analyser-campagne": ["e1-positions-corpus", "e1-relier-corpus"],
    "e1-mobiliser-auteur": ["e1-positions-corpus"],
    "e1-rediger-message": ["e1-analyser-campagne", "e1-mobiliser-auteur"],
    "e1-justifier-choix": ["e1-rediger-message"],
    "e5-diagnostic": ["e5-demande-annonceur"],
    "e5-enjeux": ["e5-diagnostic"],
    "e5-preconisation": ["e5-diagnostic", "e5-enjeux"],
    "e5-plan-communication": ["e5-preconisation"],
    "e5-moyens-indicateurs": ["e5-plan-communication"],
    "e6-justifier-creatifs": ["e6-presenter-parcours"],
    "e6-expliquer-production": ["e6-justifier-creatifs"],
    "e6-repondre-jury": ["e6-presenter-parcours", "e6-expliquer-production"],
    "e6-defendre-fiche": ["e6-expliquer-production"],
  };
  return prereqs[skillId] || [];
}

/**
 * GET /api/skills
 * Retourne tous les skills d'un user.
 * Si aucun skill n'existe, initialise les 18 competences avec score=0, confidence=0.
 */
export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const db = await getDb();
    const collection = db.collection("skills");

    let skills = await collection.find({ userId }).toArray();

    if (skills.length === 0) {
      const defaults = buildDefaultSkills(userId);
      await collection.insertMany(defaults);
      skills = await collection.find({ userId }).toArray();
    }

    // Si de nouvelles competences ont ete ajoutees depuis l'initialisation
    if (skills.length < COMPETENCES.length) {
      const existingIds = new Set(skills.map((s) => s.skillId));
      const missing = COMPETENCES.filter((c) => !existingIds.has(c.id));
      if (missing.length > 0) {
        const now = new Date().toISOString();
        const newSkills = missing.map((c) => ({
          userId,
          skillId: c.id,
          label: c.label,
          exam: c.exam.toUpperCase(),
          score: 0,
          confidence: 0,
          lastPracticedAt: null,
          streak: 0,
          errorPatterns: [] as string[],
          prerequisites: getPrerequisites(c.id),
          createdAt: now,
          updatedAt: now,
        }));
        await collection.insertMany(newSkills);
        skills = await collection.find({ userId }).toArray();
      }
    }

    return Response.json({ skills });
  } catch (error) {
    console.error("GET /api/skills error:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * POST /api/skills
 * Met a jour un skill apres un exercice.
 * Body: { skillId, score_delta, error_pattern?, correct: boolean }
 *
 * - Recalcule le score (moyenne mobile ponderee: new_score = old_score * 0.7 + attempt_score * 0.3)
 * - Met a jour confidence (augmente si correct, baisse si incorrect)
 * - Met a jour lastPracticedAt
 * - Ajoute l'error_pattern si fourni
 */
export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const body = await request.json();
    const { skillId, score_delta, error_pattern, correct } = body;

    if (!skillId || typeof correct !== "boolean") {
      return Response.json(
        { error: "skillId et correct sont requis" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection("skills");

    const skill = await collection.findOne({ userId, skillId });
    if (!skill) {
      return Response.json(
        { error: `Skill ${skillId} non trouve pour cet utilisateur` },
        { status: 404 }
      );
    }

    const oldScore = skill.score || 0;
    const attemptScore = typeof score_delta === "number" ? score_delta : (correct ? 100 : 0);

    // Moyenne mobile ponderee
    const newScore = Math.round(
      Math.min(100, Math.max(0, oldScore * 0.7 + attemptScore * 0.3))
    );

    // Confidence: augmente si correct, baisse si incorrect
    const oldConfidence = skill.confidence || 0;
    let newConfidence: number;
    if (correct) {
      newConfidence = Math.min(1, oldConfidence + 0.1);
    } else {
      newConfidence = Math.max(0, oldConfidence - 0.15);
    }
    newConfidence = Math.round(newConfidence * 100) / 100;

    // Streak
    const newStreak = correct ? (skill.streak || 0) + 1 : 0;

    // Error patterns
    const updateOps: Record<string, unknown> = {
      $set: {
        score: newScore,
        confidence: newConfidence,
        streak: newStreak,
        lastPracticedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    if (error_pattern && typeof error_pattern === "string") {
      // Ajouter le pattern sans doublon, garder les 20 derniers
      const existingPatterns: string[] = skill.errorPatterns || [];
      if (!existingPatterns.includes(error_pattern)) {
        updateOps.$push = {
          errorPatterns: {
            $each: [error_pattern],
            $slice: -20,
          },
        };
      }
    }

    await collection.updateOne({ userId, skillId }, updateOps);

    const updated = await collection.findOne({ userId, skillId });

    return Response.json({
      skill: updated,
      changes: {
        score: { from: oldScore, to: newScore },
        confidence: { from: oldConfidence, to: newConfidence },
        streak: newStreak,
      },
    });
  } catch (error) {
    console.error("POST /api/skills error:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
