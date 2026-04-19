import { type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";

function getUserId(request: NextRequest): string | null {
  return request.headers.get("x-user-id");
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const db = await getDb();

    // Récupérer le profil utilisateur
    const user = await db.collection("users").findOne({ userId });

    // Récupérer l'historique des quiz
    const quizResults = await db
      .collection("quiz_results")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    // Récupérer l'historique des épreuves blanches
    const examResults = await db
      .collection("exam_results")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    // Récupérer les flashcards
    const flashcardProgress = await db
      .collection("flashcard_progress")
      .find({ userId })
      .toArray();

    // --- Score moyen par module ---
    const scoresByModule: Record<
      string,
      { total: number; count: number }
    > = {};

    for (const quiz of quizResults) {
      const mod = quiz.module || "general";
      if (!scoresByModule[mod]) {
        scoresByModule[mod] = { total: 0, count: 0 };
      }
      scoresByModule[mod].total += quiz.percentage || 0;
      scoresByModule[mod].count += 1;
    }

    const averageByModule: Record<string, number> = {};
    for (const [mod, data] of Object.entries(scoresByModule)) {
      averageByModule[mod] = Math.round(data.total / data.count);
    }

    // --- Score moyen par épreuve ---
    const scoresByExam: Record<
      string,
      { total: number; count: number }
    > = {};

    for (const exam of examResults) {
      const type = exam.type || "unknown";
      if (!scoresByExam[type]) {
        scoresByExam[type] = { total: 0, count: 0 };
      }
      scoresByExam[type].total += exam.percentage || 0;
      scoresByExam[type].count += 1;
    }

    const averageByExam: Record<string, number> = {};
    for (const [type, data] of Object.entries(scoresByExam)) {
      averageByExam[type] = Math.round(data.total / data.count);
    }

    // --- Courbe de progression (derniers 30 jours) ---
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentQuizzes = quizResults.filter(
      (q) => new Date(q.createdAt) >= thirtyDaysAgo
    );

    const progressionByDay: Record<
      string,
      { total: number; count: number }
    > = {};

    for (const quiz of recentQuizzes) {
      const day = quiz.createdAt.split("T")[0];
      if (!progressionByDay[day]) {
        progressionByDay[day] = { total: 0, count: 0 };
      }
      progressionByDay[day].total += quiz.percentage || 0;
      progressionByDay[day].count += 1;
    }

    const progressionCurve = Object.entries(progressionByDay)
      .map(([date, data]) => ({
        date,
        averageScore: Math.round(data.total / data.count),
        quizCount: data.count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // --- Points forts / faibles ---
    const moduleEntries = Object.entries(averageByModule).sort(
      (a, b) => b[1] - a[1]
    );

    const strengths = moduleEntries
      .filter(([, avg]) => avg >= 70)
      .map(([mod, avg]) => ({ module: mod, averageScore: avg }));

    const weaknesses = moduleEntries
      .filter(([, avg]) => avg < 60)
      .map(([mod, avg]) => ({ module: mod, averageScore: avg }));

    // --- Prédiction de note ---
    // Basée sur la moyenne pondérée des derniers résultats (plus récents = plus de poids)
    let predictedGrade: number | null = null;

    if (quizResults.length >= 3) {
      const recentScores = quizResults
        .slice(0, 10)
        .map((q, i) => ({
          score: q.percentage,
          weight: 10 - i, // Plus récent = plus de poids
        }));

      const totalWeight = recentScores.reduce(
        (sum, s) => sum + s.weight,
        0
      );
      const weightedAvg =
        recentScores.reduce(
          (sum, s) => sum + s.score * s.weight,
          0
        ) / totalWeight;

      // Convertir en note sur 20
      predictedGrade = Math.round((weightedAvg / 100) * 20 * 10) / 10;
    }

    // --- Temps d'étude ---
    const totalStudyMinutes =
      user?.stats?.studyTimeMinutes || 0;
    const studyTimeFormatted = {
      totalMinutes: totalStudyMinutes,
      hours: Math.floor(totalStudyMinutes / 60),
      minutes: totalStudyMinutes % 60,
    };

    // --- Flashcards stats ---
    const flashcardStats = {
      total: flashcardProgress.length,
      mastered: flashcardProgress.filter(
        (f) => f.repetitions >= 5
      ).length,
      learning: flashcardProgress.filter(
        (f) => f.repetitions > 0 && f.repetitions < 5
      ).length,
      new: flashcardProgress.filter(
        (f) => f.repetitions === 0
      ).length,
      dueToday: flashcardProgress.filter(
        (f) => new Date(f.nextReview) <= new Date()
      ).length,
    };

    return Response.json({
      profile: {
        xp: user?.xp || 0,
        level: user?.level || 1,
        streak: user?.streak || 0,
        badges: user?.badges || [],
      },
      averageByModule,
      averageByExam,
      progressionCurve,
      strengths,
      weaknesses,
      predictedGrade,
      studyTime: studyTimeFormatted,
      flashcards: flashcardStats,
      totals: {
        quizzes: quizResults.length,
        exams: examResults.length,
        flashcards: flashcardProgress.length,
      },
      recentActivity: {
        lastQuiz: quizResults[0] || null,
        lastExam: examResults[0] || null,
      },
    });
  } catch (error) {
    console.error("GET /api/stats error:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
