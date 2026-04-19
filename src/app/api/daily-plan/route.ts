import { type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";
import { COMPETENCES, type Competence } from "@/lib/competences";
import { getAuteurDuJour, getAuteurDeDemain } from "@/lib/auteurs-data";

function getUserId(request: NextRequest): string | null {
  return request.headers.get("x-user-id");
}

interface CompetenceScore {
  competence: Competence;
  score: number; // 0-100
  lastPracticed: Date | null;
  practiceCount: number;
}

interface DailyStep {
  id: number;
  type: "reactivation" | "competence_faible" | "exercice_examen" | "bilan";
  title: string;
  duration: number; // minutes
  description: string;
  data: Record<string, unknown>;
}

/**
 * Calcule la priorite d'une competence pour la seance du jour.
 * Formule : poids_epreuve x faiblesse x proximite_examen x recency
 */
function calculatePriority(
  cs: CompetenceScore,
  daysUntilExam: number
): number {
  // Faiblesse : plus le score est bas, plus la priorite est haute
  const faiblesse = Math.max(0, (100 - cs.score) / 100);

  // Poids de l'epreuve
  const poids = cs.competence.weight;

  // Proximite de l'examen : urgence croissante quand l'examen approche
  // Entre 0.5 (loin) et 2.0 (tres proche)
  const proximite = Math.min(2.0, Math.max(0.5, 60 / Math.max(daysUntilExam, 1)));

  // Recency : bonus si pas pratique recemment
  let recency = 1.0;
  if (cs.lastPracticed) {
    const daysSince = Math.floor(
      (Date.now() - cs.lastPracticed.getTime()) / (1000 * 60 * 60 * 24)
    );
    recency = Math.min(2.0, 1.0 + daysSince * 0.1);
  } else {
    recency = 2.0; // Jamais pratique = haute priorite
  }

  return poids * faiblesse * proximite * recency;
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const db = await getDb();

    // Recuperer le profil utilisateur
    const user = await db.collection("users").findOne({ userId });
    const examDate = user?.examDate
      ? new Date(user.examDate)
      : new Date("2026-06-15");
    const daysUntilExam = Math.max(
      1,
      Math.ceil(
        (examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
    );

    // Recuperer les resultats de quiz pour estimer les competences
    const quizResults = await db
      .collection("quiz_results")
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    // Recuperer la progression des flashcards
    const flashcardProgress = await db
      .collection("flashcard_progress")
      .find({ userId })
      .toArray();

    // Recuperer l'historique des seances quotidiennes
    const dailySessions = await db
      .collection("daily_sessions")
      .find({ userId })
      .sort({ date: -1 })
      .limit(30)
      .toArray();

    // Calculer le score par competence
    const competenceScores: CompetenceScore[] = COMPETENCES.map((comp) => {
      // Chercher les quiz lies a cette competence (par tags ou exam)
      const relatedQuizzes = quizResults.filter(
        (q) =>
          q.exam?.toLowerCase() === comp.exam ||
          q.tags?.some((t: string) =>
            comp.id.includes(t.toLowerCase())
          )
      );

      let score = 50; // Score par defaut si aucune donnee
      let lastPracticed: Date | null = null;
      let practiceCount = 0;

      if (relatedQuizzes.length > 0) {
        // Moyenne ponderee (plus recents = plus de poids)
        let totalWeight = 0;
        let weightedSum = 0;
        relatedQuizzes.forEach((q, i) => {
          const weight = Math.max(1, 10 - i);
          weightedSum += (q.percentage || 0) * weight;
          totalWeight += weight;
        });
        score = totalWeight > 0 ? weightedSum / totalWeight : 50;
        lastPracticed = new Date(relatedQuizzes[0].createdAt);
        practiceCount = relatedQuizzes.length;
      }

      // Bonus si flashcards liees sont bien maitrisees
      const relatedFlashcards = flashcardProgress.filter(
        (f) => f.exam?.toLowerCase() === comp.exam
      );
      if (relatedFlashcards.length > 0) {
        const masteredRatio =
          relatedFlashcards.filter((f) => f.repetitions >= 4).length /
          relatedFlashcards.length;
        score = score * 0.7 + masteredRatio * 100 * 0.3;
      }

      return {
        competence: comp,
        score: Math.round(Math.min(100, Math.max(0, score))),
        lastPracticed,
        practiceCount,
      };
    });

    // Trier par priorite
    const prioritized = competenceScores
      .map((cs) => ({
        ...cs,
        priority: calculatePriority(cs, daysUntilExam),
      }))
      .sort((a, b) => b.priority - a.priority);

    // La competence la plus faible
    const weakestCompetence = prioritized[0];
    // La deuxieme pour demain
    const secondWeakest = prioritized[1];

    // Auteur du jour
    const auteurDuJour = getAuteurDuJour();
    const auteurDeDemain = getAuteurDeDemain();

    // Flashcards dues aujourd'hui
    const today = new Date().toISOString().split("T")[0];
    const dueFlashcards = flashcardProgress.filter(
      (f) => new Date(f.nextReview).toISOString().split("T")[0] <= today
    );

    // Verifier si la seance du jour est deja faite
    const todayStr = new Date().toISOString().split("T")[0];
    const todaySession = dailySessions.find(
      (s) => s.date === todayStr
    );

    // Construire les 4 etapes
    const steps: DailyStep[] = [
      {
        id: 1,
        type: "reactivation",
        title: "Reactivation",
        duration: 8,
        description: `7 flashcards a reviser + decouverte de ${auteurDuJour.auteur}`,
        data: {
          flashcardsCount: Math.min(7, Math.max(3, dueFlashcards.length)),
          flashcardIds: dueFlashcards.slice(0, 7).map((f) => f.cardId),
          auteur: auteurDuJour,
        },
      },
      {
        id: 2,
        type: "competence_faible",
        title: "Competence ciblee",
        duration: 12,
        description: `Travail sur : ${weakestCompetence.competence.label}`,
        data: {
          competence: weakestCompetence.competence,
          score: weakestCompetence.score,
          priority: weakestCompetence.priority,
          exam: weakestCompetence.competence.exam.toUpperCase(),
        },
      },
      {
        id: 3,
        type: "exercice_examen",
        title: "Exercice examen",
        duration: 15,
        description: `Exercice chronometre type ${weakestCompetence.competence.exam.toUpperCase()}`,
        data: {
          exam: weakestCompetence.competence.exam,
          competenceId: weakestCompetence.competence.id,
          timed: true,
        },
      },
      {
        id: 4,
        type: "bilan",
        title: "Bilan",
        duration: 7,
        description: "Resume de la seance + apercu de demain",
        data: {
          previewTomorrow: {
            competence: secondWeakest?.competence.label || "A determiner",
            auteur: auteurDeDemain.auteur,
          },
        },
      },
    ];

    const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0);

    return Response.json({
      date: todayStr,
      completed: !!todaySession?.completed,
      sessionData: todaySession || null,
      daysUntilExam,
      totalDuration,
      steps,
      auteurDuJour,
      competences: {
        weakest: {
          id: weakestCompetence.competence.id,
          label: weakestCompetence.competence.label,
          exam: weakestCompetence.competence.exam,
          score: weakestCompetence.score,
        },
        all: prioritized.slice(0, 6).map((p) => ({
          id: p.competence.id,
          label: p.competence.label,
          exam: p.competence.exam,
          score: p.score,
          priority: Math.round(p.priority * 100) / 100,
        })),
      },
      preview: {
        tomorrow: {
          competence: secondWeakest?.competence.label || "A determiner",
          auteur: auteurDeDemain.auteur,
          auteurIdee: auteurDeDemain.idee_centrale,
        },
      },
      stats: {
        streak: user?.streak || 0,
        xp: user?.xp || 0,
        level: user?.level || 1,
        flashcardsDue: dueFlashcards.length,
      },
    });
  } catch (error) {
    console.error("GET /api/daily-plan error:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
