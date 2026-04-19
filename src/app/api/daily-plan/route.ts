import { type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COMPETENCES } from "@/lib/competences";
import { getAuteurDuJour } from "@/lib/auteurs-data";

const ENDPOINT = process.env.AZURE_ANTHROPIC_ENDPOINT || "";
const API_KEY = process.env.AZURE_ANTHROPIC_API_KEY || "";
const MODEL = process.env.AZURE_ANTHROPIC_MODEL || "claude-opus-4-6";

function getUserId(request: NextRequest): string | null {
  return request.headers.get("x-user-id");
}

// --- Poids des epreuves ---
const EXAM_WEIGHTS: Record<string, number> = {
  E1: 3,
  e1: 3,
  E5: 5,
  e5: 5,
  E6: 4,
  e6: 4,
};

// --- Templates de distribution du temps ---
interface TimeBlock {
  type: string;
  minutes: number;
  title: string;
}

const TIME_TEMPLATES: Record<number, TimeBlock[]> = {
  20: [
    { type: "author_of_day", minutes: 5, title: "Auteur du jour" },
    { type: "flashcards", minutes: 5, title: "Rappel actif" },
    { type: "targeted_exercise", minutes: 10, title: "Exercice cible" },
  ],
  30: [
    { type: "author_of_day", minutes: 5, title: "Auteur du jour" },
    { type: "flashcards", minutes: 7, title: "Rappel actif" },
    { type: "targeted_exercise", minutes: 12, title: "Exercice cible" },
    { type: "reflection", minutes: 6, title: "Bilan" },
  ],
  45: [
    { type: "author_of_day", minutes: 6, title: "Auteur du jour" },
    { type: "flashcards", minutes: 8, title: "Rappel actif" },
    { type: "targeted_exercise", minutes: 12, title: "Competence faible" },
    { type: "mini_case", minutes: 14, title: "Mini-epreuve" },
    { type: "reflection", minutes: 5, title: "Bilan" },
  ],
  60: [
    { type: "author_of_day", minutes: 6, title: "Auteur du jour" },
    { type: "flashcards", minutes: 10, title: "Rappel actif" },
    { type: "e1_exercise", minutes: 15, title: "Exercice E1" },
    { type: "e5_exercise", minutes: 15, title: "Exercice E5" },
    { type: "e6_oral", minutes: 9, title: "Oral E6" },
    { type: "reflection", minutes: 5, title: "Bilan" },
  ],
  90: [
    { type: "author_of_day", minutes: 8, title: "Auteur du jour" },
    { type: "flashcards", minutes: 12, title: "Rappel actif" },
    { type: "e1_exercise", minutes: 20, title: "Exercice E1" },
    { type: "e5_exercise", minutes: 25, title: "Exercice E5" },
    { type: "e6_oral", minutes: 15, title: "Oral E6" },
    { type: "reflection", minutes: 10, title: "Bilan" },
  ],
};

const VALID_MINUTES = [20, 30, 45, 60, 90];

interface SkillWithPriority {
  skillId: string;
  label: string;
  exam: string;
  score: number;
  confidence: number;
  lastPracticedAt: string | null;
  streak: number;
  errorPatterns: string[];
  priority: number;
}

/**
 * Calcul DETERMINISTE des priorites.
 *
 * priority = examWeight * weaknessScore * recencyPenalty * examProximityBoost
 */
function calculatePriority(
  skill: { score: number; exam: string; lastPracticedAt: string | null },
  daysUntilExam: number
): number {
  const examKey = skill.exam.toUpperCase();
  const examWeight = EXAM_WEIGHTS[examKey] || 3;

  const weaknessScore = (100 - skill.score) / 100;

  // recencyPenalty: days_since_last_practice / 7 (cap at 2.0)
  let recencyPenalty = 2.0; // Jamais pratique = max
  if (skill.lastPracticedAt) {
    const lastDate = new Date(skill.lastPracticedAt);
    const daysSince = Math.max(
      0,
      Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
    );
    recencyPenalty = Math.min(2.0, daysSince / 7);
  }

  // examProximityBoost: 1 + (30 - days_until_exam) / 30 (cap at 2.0)
  const rawBoost = 1 + (30 - daysUntilExam) / 30;
  const examProximityBoost = Math.min(2.0, Math.max(0.5, rawBoost));

  return examWeight * weaknessScore * recencyPenalty * examProximityBoost;
}

/**
 * Determine le type d'exercice adapte pour un skill.
 */
function getExerciseType(skillId: string): string {
  if (skillId.includes("positions-corpus") || skillId.includes("relier-corpus")) return "reperage";
  if (skillId.includes("analyser-campagne")) return "analyse";
  if (skillId.includes("rediger-message") || skillId.includes("justifier-choix")) return "redaction";
  if (skillId.includes("diagnostic") || skillId.includes("preconisation") || skillId.includes("plan-communication")) return "analyse";
  if (skillId.includes("oral") || skillId.includes("jury") || skillId.includes("presenter") || skillId.includes("defendre")) return "oral";
  return "quiz";
}

/**
 * Appelle Claude pour habiller le plan (summary, encouragement, tomorrowPreview).
 */
async function callClaudeForDressing(
  priorities: SkillWithPriority[],
  blocks: Record<string, unknown>[],
  availableMinutes: number,
  daysUntilExam: number
): Promise<{ summary: string; encouragement: string; tomorrowPreview: string }> {
  const fallback = {
    summary: `Seance de ${availableMinutes} minutes -- focus sur les competences les plus fragiles.`,
    encouragement: `Plus que ${daysUntilExam} jours avant l'examen. Chaque minute compte.`,
    tomorrowPreview: "On continuera sur les points faibles identifies aujourd'hui.",
  };

  if (!ENDPOINT || !API_KEY) return fallback;

  try {
    const top5 = priorities.slice(0, 5).map((s) => ({
      skill: s.label,
      exam: s.exam,
      score: s.score,
      priority: Math.round(s.priority * 100) / 100,
    }));

    const prompt = `Voici le plan de revision du jour pour une etudiante en BTS Communication (examen dans ${daysUntilExam} jours).

Competences prioritaires :
${JSON.stringify(top5, null, 2)}

Blocs de la seance (${availableMinutes} min) :
${JSON.stringify(blocks.map((b) => ({ type: b.type, minutes: b.minutes, title: b.title })), null, 2)}

Reponds en JSON strict (pas de markdown, pas de backticks) :
{
  "summary": "1-2 phrases resumant le focus du jour, mentionnant les competences cibles",
  "encouragement": "1 phrase motivante et concrete, pas generique, en lien avec la progression reelle",
  "tomorrowPreview": "1 phrase annoncant ce qu'on travaillera demain"
}`;

    const url = `${ENDPOINT}v1/messages`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 512,
        system: "Tu es Coline, tutrice du BTS Communication. Reponds uniquement en JSON valide, sans backticks ni markdown. Sois precise, concrete, jamais floue.",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      console.error("Claude dressing error:", res.status);
      return fallback;
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "";
    const parsed = JSON.parse(text);
    return {
      summary: parsed.summary || fallback.summary,
      encouragement: parsed.encouragement || fallback.encouragement,
      tomorrowPreview: parsed.tomorrowPreview || fallback.tomorrowPreview,
    };
  } catch (error) {
    console.error("Claude dressing parse error:", error);
    return fallback;
  }
}

/**
 * GET /api/daily-plan?minutes=45
 *
 * 1. Calcul deterministe des priorites
 * 2. Distribution du temps selon le template
 * 3. Claude habille le plan (summary, encouragement, tomorrowPreview)
 * 4. Sauvegarde dans daily_plans
 */
export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    // Parse minutes parameter
    const { searchParams } = new URL(request.url);
    const rawMinutes = parseInt(searchParams.get("minutes") || "45", 10);
    const availableMinutes = VALID_MINUTES.includes(rawMinutes) ? rawMinutes : 45;

    const db = await getDb();

    // Recuperer les skills de l'utilisateur
    let skills = await db.collection("skills").find({ userId }).toArray();

    // Si pas de skills, les initialiser via l'API skills (inline)
    if (skills.length === 0) {
      const now = new Date().toISOString();
      const defaults = COMPETENCES.map((c) => ({
        userId,
        skillId: c.id,
        label: c.label,
        exam: c.exam.toUpperCase(),
        score: 0,
        confidence: 0,
        lastPracticedAt: null,
        streak: 0,
        errorPatterns: [] as string[],
        prerequisites: [],
        createdAt: now,
        updatedAt: now,
      }));
      await db.collection("skills").insertMany(defaults);
      skills = await db.collection("skills").find({ userId }).toArray();
    }

    // Recuperer la date d'examen
    const user = await db.collection("users").findOne({ userId });
    const examDate = user?.examDate
      ? new Date(user.examDate)
      : new Date("2026-06-15");
    const daysUntilExam = Math.max(
      1,
      Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    );

    // Calcul deterministe des priorites
    const prioritized: SkillWithPriority[] = skills
      .map((s) => ({
        skillId: s.skillId as string,
        label: s.label as string,
        exam: s.exam as string,
        score: (s.score as number) || 0,
        confidence: (s.confidence as number) || 0,
        lastPracticedAt: s.lastPracticedAt as string | null,
        streak: (s.streak as number) || 0,
        errorPatterns: (s.errorPatterns as string[]) || [],
        priority: calculatePriority(
          {
            score: (s.score as number) || 0,
            exam: s.exam as string,
            lastPracticedAt: s.lastPracticedAt as string | null,
          },
          daysUntilExam
        ),
      }))
      .sort((a, b) => b.priority - a.priority);

    // Selectionner le template de temps
    const template = TIME_TEMPLATES[availableMinutes];

    // Auteur du jour
    const auteurDuJour = getAuteurDuJour();

    // Identifier les skills faibles par epreuve
    const weakestByExam: Record<string, SkillWithPriority> = {};
    for (const s of prioritized) {
      const examKey = s.exam.toUpperCase();
      if (!weakestByExam[examKey]) {
        weakestByExam[examKey] = s;
      }
    }

    // Flashcards: selectionner les skills les plus fragiles
    const fragileSkills = prioritized
      .filter((s) => s.score < 60)
      .slice(0, 7);

    // Construire les blocs
    const blocks = template.map((tmpl) => {
      const block: Record<string, unknown> = {
        type: tmpl.type,
        minutes: tmpl.minutes,
        title: tmpl.title,
      };

      switch (tmpl.type) {
        case "author_of_day": {
          block.goal = `Decouvrir ${auteurDuJour.auteur} : ${auteurDuJour.idee_centrale}`;
          block.authorId = auteurDuJour.auteur
            .toLowerCase()
            .replace(/\s+/g, "-")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          break;
        }
        case "flashcards": {
          block.goal = `${fragileSkills.length} notions fragiles`;
          block.skillIds = fragileSkills.map((s) => s.skillId);
          break;
        }
        case "targeted_exercise": {
          const target = prioritized[0];
          block.goal = `Renforcer : ${target.label} (score: ${target.score}/100)`;
          block.skillId = target.skillId;
          block.exerciseType = getExerciseType(target.skillId);
          break;
        }
        case "mini_case": {
          // Choisir l'epreuve la plus prioritaire
          const topExam = prioritized[0].exam.toUpperCase();
          block.goal = `Mise en situation ${topExam}`;
          block.exam = topExam;
          break;
        }
        case "e1_exercise": {
          const e1Skill = weakestByExam["E1"] || prioritized.find((s) => s.exam.toUpperCase() === "E1");
          if (e1Skill) {
            block.goal = `${e1Skill.label} (score: ${e1Skill.score}/100)`;
            block.skillId = e1Skill.skillId;
            block.exerciseType = getExerciseType(e1Skill.skillId);
          } else {
            block.goal = "Revision E1";
          }
          block.exam = "E1";
          break;
        }
        case "e5_exercise": {
          const e5Skill = weakestByExam["E5"] || prioritized.find((s) => s.exam.toUpperCase() === "E5");
          if (e5Skill) {
            block.goal = `${e5Skill.label} (score: ${e5Skill.score}/100)`;
            block.skillId = e5Skill.skillId;
            block.exerciseType = getExerciseType(e5Skill.skillId);
          } else {
            block.goal = "Revision E5";
          }
          block.exam = "E5";
          break;
        }
        case "e6_oral": {
          const e6Skill = weakestByExam["E6"] || prioritized.find((s) => s.exam.toUpperCase() === "E6");
          if (e6Skill) {
            block.goal = `${e6Skill.label} (score: ${e6Skill.score}/100)`;
            block.skillId = e6Skill.skillId;
            block.exerciseType = "oral";
          } else {
            block.goal = "Entrainement oral E6";
          }
          block.exam = "E6";
          break;
        }
        case "reflection": {
          block.goal = "Fixer la priorite de demain";
          break;
        }
      }

      return block;
    });

    // Focus: top 2 skills prioritaires
    const focus = prioritized.slice(0, 2).map((s) => s.skillId);

    // Appeler Claude pour habiller le plan
    const dressing = await callClaudeForDressing(
      prioritized,
      blocks,
      availableMinutes,
      daysUntilExam
    );

    const todayStr = new Date().toISOString().split("T")[0];

    const plan = {
      date: todayStr,
      availableMinutes,
      summary: dressing.summary,
      focus,
      blocks,
      encouragement: dressing.encouragement,
      tomorrowPreview: dressing.tomorrowPreview,
      daysUntilExam,
      skills: prioritized.slice(0, 6).map((s) => ({
        skillId: s.skillId,
        label: s.label,
        exam: s.exam,
        score: s.score,
        priority: Math.round(s.priority * 100) / 100,
      })),
    };

    // Sauvegarder le plan dans daily_plans
    await db.collection("daily_plans").updateOne(
      { userId, date: todayStr },
      {
        $set: {
          ...plan,
          userId,
          updatedAt: new Date().toISOString(),
        },
        $setOnInsert: {
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    return Response.json(plan);
  } catch (error) {
    console.error("GET /api/daily-plan error:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
