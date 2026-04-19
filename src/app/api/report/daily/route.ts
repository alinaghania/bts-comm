import { type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";

const ENDPOINT = process.env.AZURE_ANTHROPIC_ENDPOINT || "";
const API_KEY = process.env.AZURE_ANTHROPIC_API_KEY || "";
const MODEL = process.env.AZURE_ANTHROPIC_MODEL || "claude-opus-4-6";

function getUserId(request: NextRequest): string | null {
  return request.headers.get("x-user-id");
}

/**
 * POST /api/report/daily
 *
 * Genere le rapport du jour et le plan de demain.
 * - Recupere les tentatives du jour
 * - Recupere les skills
 * - Calcule ce qui a progresse, ce qui stagne
 * - Appelle Claude avec mode=daily_report + les donnees
 * - Sauvegarde le rapport dans collection "daily_reports"
 */
export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const db = await getDb();
    const todayStr = new Date().toISOString().split("T")[0];

    // Recuperer les tentatives du jour
    const todayStart = new Date(todayStr + "T00:00:00.000Z").toISOString();
    const todayEnd = new Date(todayStr + "T23:59:59.999Z").toISOString();

    const todayAttempts = await db
      .collection("attempts")
      .find({
        userId,
        createdAt: { $gte: todayStart, $lte: todayEnd },
      })
      .sort({ createdAt: -1 })
      .toArray();

    // Recuperer tous les skills
    const skills = await db.collection("skills").find({ userId }).toArray();

    // Recuperer les tentatives des 7 derniers jours pour detecter les stagnations
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAttempts = await db
      .collection("attempts")
      .find({
        userId,
        createdAt: { $gte: weekAgo.toISOString() },
      })
      .sort({ createdAt: -1 })
      .toArray();

    // Calculer les progressions et stagnations
    const skillAnalysis = skills.map((s) => {
      const relatedAttempts = todayAttempts.filter(
        (a) =>
          Array.isArray(a.skillIds) && a.skillIds.includes(s.skillId)
      );
      const weekRelated = weekAttempts.filter(
        (a) =>
          Array.isArray(a.skillIds) && a.skillIds.includes(s.skillId)
      );

      const todayAvgScore =
        relatedAttempts.length > 0
          ? relatedAttempts.reduce((sum, a) => sum + (a.score || 0), 0) /
            relatedAttempts.length
          : null;

      const weekAvgScore =
        weekRelated.length > 0
          ? weekRelated.reduce((sum, a) => sum + (a.score || 0), 0) /
            weekRelated.length
          : null;

      let trend: "progresse" | "stagne" | "recule" | "non_travaille" =
        "non_travaille";
      if (todayAvgScore !== null && weekAvgScore !== null) {
        if (todayAvgScore > weekAvgScore + 5) trend = "progresse";
        else if (todayAvgScore < weekAvgScore - 5) trend = "recule";
        else trend = "stagne";
      } else if (todayAvgScore !== null) {
        trend = todayAvgScore >= 60 ? "progresse" : "stagne";
      }

      return {
        skillId: s.skillId,
        label: s.label,
        exam: s.exam,
        score: s.score,
        confidence: s.confidence,
        streak: s.streak,
        errorPatterns: s.errorPatterns || [],
        todayAttempts: relatedAttempts.length,
        todayAvgScore: todayAvgScore !== null ? Math.round(todayAvgScore) : null,
        weekAvgScore: weekAvgScore !== null ? Math.round(weekAvgScore) : null,
        trend,
      };
    });

    // Stats du jour
    const totalAttempts = todayAttempts.length;
    const totalMinutes = todayAttempts.reduce(
      (sum, a) => sum + ((a.durationMin as number) || 0),
      0
    );
    const avgScore =
      totalAttempts > 0
        ? Math.round(
            todayAttempts.reduce((sum, a) => sum + ((a.score as number) || 0), 0) /
              totalAttempts
          )
        : 0;

    const allMistakes = todayAttempts.flatMap(
      (a) => (a.mistakes as string[]) || []
    );

    const progressing = skillAnalysis.filter((s) => s.trend === "progresse");
    const stagnating = skillAnalysis.filter((s) => s.trend === "stagne");
    const declining = skillAnalysis.filter((s) => s.trend === "recule");

    // Appeler Claude pour generer le rapport
    const reportData = {
      date: todayStr,
      totalAttempts,
      totalMinutes,
      avgScore,
      mistakes: allMistakes.slice(0, 10),
      progressing: progressing.map((s) => ({
        label: s.label,
        exam: s.exam,
        score: s.score,
        todayAvg: s.todayAvgScore,
      })),
      stagnating: stagnating.map((s) => ({
        label: s.label,
        exam: s.exam,
        score: s.score,
        errorPatterns: s.errorPatterns.slice(0, 3),
      })),
      declining: declining.map((s) => ({
        label: s.label,
        exam: s.exam,
        score: s.score,
        todayAvg: s.todayAvgScore,
        weekAvg: s.weekAvgScore,
      })),
    };

    let claudeReport = {
      bilanTexte: `Aujourd'hui : ${totalAttempts} exercices en ${totalMinutes} min, score moyen ${avgScore}/100.`,
      actions: [
        "Revoir les competences faibles identifiees",
        "Consolider les acquis du jour",
        "Preparer la prochaine epreuve",
      ],
      alertes: [] as string[],
    };

    if (ENDPOINT && API_KEY) {
      try {
        const prompt = `Voici les donnees de la journee de revision BTS Communication :

${JSON.stringify(reportData, null, 2)}

Fais un bilan PRESCRIPTIF (pas descriptif). Reponds en JSON strict :
{
  "bilanTexte": "3-5 phrases de bilan precis avec chiffres et exemples d'erreurs",
  "actions": ["action 1 (X min) - competence ciblee", "action 2 (X min) - competence ciblee", "action 3 (X min) - competence ciblee"],
  "alertes": ["competence X stagne depuis Y jours", ...]
}`;

        const url = `${ENDPOINT}v1/messages`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": API_KEY,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: MODEL,
            max_tokens: 1536,
            system: `Tu es Coline, tutrice experte du BTS Communication 2026.
Tu fais le bilan du jour. Sois PRESCRIPTIVE, pas descriptive.
Pas de "c'est bien" generique. Cite des chiffres, des erreurs precises.
Chaque action de demain doit avoir une duree en minutes et cibler une competence precise.
Reponds uniquement en JSON valide, sans backticks ni markdown.`,
            messages: [{ role: "user", content: prompt }],
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.content?.[0]?.text || "";
          const parsed = JSON.parse(text);
          claudeReport = {
            bilanTexte: parsed.bilanTexte || claudeReport.bilanTexte,
            actions: Array.isArray(parsed.actions) ? parsed.actions : claudeReport.actions,
            alertes: Array.isArray(parsed.alertes) ? parsed.alertes : [],
          };
        }
      } catch (error) {
        console.error("Claude report error:", error);
        // On garde le fallback
      }
    }

    // Construire le rapport final
    const report = {
      userId,
      date: todayStr,
      stats: {
        totalAttempts,
        totalMinutes,
        avgScore,
      },
      skillAnalysis: skillAnalysis.filter((s) => s.todayAttempts > 0),
      progressing: progressing.map((s) => ({
        skillId: s.skillId,
        label: s.label,
        exam: s.exam,
        score: s.score,
      })),
      stagnating: stagnating.map((s) => ({
        skillId: s.skillId,
        label: s.label,
        exam: s.exam,
        score: s.score,
        errorPatterns: s.errorPatterns,
      })),
      declining: declining.map((s) => ({
        skillId: s.skillId,
        label: s.label,
        exam: s.exam,
        score: s.score,
      })),
      mistakes: allMistakes.slice(0, 10),
      bilan: claudeReport.bilanTexte,
      tomorrowActions: claudeReport.actions,
      alertes: claudeReport.alertes,
      createdAt: new Date().toISOString(),
    };

    // Sauvegarder dans daily_reports (upsert pour eviter les doublons)
    await db.collection("daily_reports").updateOne(
      { userId, date: todayStr },
      {
        $set: report,
        $setOnInsert: { createdAt: new Date().toISOString() },
      },
      { upsert: true }
    );

    return Response.json(report);
  } catch (error) {
    console.error("POST /api/report/daily error:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
