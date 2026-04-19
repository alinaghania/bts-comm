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

    // Recuperer toutes les donnees
    const user = await db.collection("users").findOne({ userId });

    const quizResults = await db
      .collection("quiz_results")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    const examResults = await db
      .collection("exam_results")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    const flashcardProgress = await db
      .collection("flashcard_progress")
      .find({ userId })
      .toArray();

    // --- Scores par module ---
    const scoresByModule: Record<string, { total: number; count: number }> = {};
    for (const quiz of quizResults) {
      const mod = quiz.module || "general";
      if (!scoresByModule[mod]) scoresByModule[mod] = { total: 0, count: 0 };
      scoresByModule[mod].total += quiz.percentage || 0;
      scoresByModule[mod].count += 1;
    }

    const averageByModule: Record<string, number> = {};
    for (const [mod, data] of Object.entries(scoresByModule)) {
      averageByModule[mod] = Math.round(data.total / data.count);
    }

    // --- Points forts ---
    const moduleEntries = Object.entries(averageByModule).sort(
      (a, b) => b[1] - a[1]
    );

    const strengths = moduleEntries
      .filter(([, avg]) => avg >= 65)
      .map(([mod, avg]) => {
        // Calculer la tendance
        const recentQuizzes = quizResults
          .filter((q) => q.module === mod)
          .slice(0, 5);
        const olderQuizzes = quizResults
          .filter((q) => q.module === mod)
          .slice(5, 10);
        const recentAvg =
          recentQuizzes.length > 0
            ? recentQuizzes.reduce(
                (s, q) => s + (q.percentage || 0),
                0
              ) / recentQuizzes.length
            : avg;
        const olderAvg =
          olderQuizzes.length > 0
            ? olderQuizzes.reduce(
                (s, q) => s + (q.percentage || 0),
                0
              ) / olderQuizzes.length
            : avg;
        const trend =
          recentAvg > olderAvg + 5
            ? "up"
            : recentAvg < olderAvg - 5
            ? "down"
            : "stable";

        return { topic: mod, score: avg, trend };
      });

    // --- Points faibles avec erreurs courantes ---
    const weaknesses = moduleEntries
      .filter(([, avg]) => avg < 65)
      .map(([mod, avg]) => {
        const recentQuizzes = quizResults
          .filter((q) => q.module === mod)
          .slice(0, 5);
        const olderQuizzes = quizResults
          .filter((q) => q.module === mod)
          .slice(5, 10);
        const recentAvg =
          recentQuizzes.length > 0
            ? recentQuizzes.reduce(
                (s, q) => s + (q.percentage || 0),
                0
              ) / recentQuizzes.length
            : avg;
        const olderAvg =
          olderQuizzes.length > 0
            ? olderQuizzes.reduce(
                (s, q) => s + (q.percentage || 0),
                0
              ) / olderQuizzes.length
            : avg;
        const trend =
          recentAvg > olderAvg + 5
            ? "up"
            : recentAvg < olderAvg - 5
            ? "down"
            : "stable";

        // Extraire les erreurs courantes depuis les quiz de ce module
        const commonErrors: string[] = [];
        for (const quiz of quizResults.filter((q) => q.module === mod)) {
          if (quiz.wrongAnswers && Array.isArray(quiz.wrongAnswers)) {
            for (const wrong of quiz.wrongAnswers) {
              const errorText =
                typeof wrong === "string"
                  ? wrong
                  : wrong.question || wrong.text || "";
              if (errorText && !commonErrors.includes(errorText)) {
                commonErrors.push(errorText);
              }
            }
          }
        }

        return {
          topic: mod,
          score: avg,
          trend,
          commonErrors: commonErrors.slice(0, 5),
        };
      });

    // --- Questions pieges (les plus ratees) ---
    const questionStats: Record<
      string,
      { question: string; timesWrong: number; timesRight: number; lastSeen: string }
    > = {};

    for (const quiz of quizResults) {
      if (quiz.questions && Array.isArray(quiz.questions)) {
        for (const q of quiz.questions) {
          const key = q.question || q.text || "";
          if (!key) continue;
          if (!questionStats[key]) {
            questionStats[key] = {
              question: key,
              timesWrong: 0,
              timesRight: 0,
              lastSeen: quiz.createdAt || "",
            };
          }
          if (q.correct) {
            questionStats[key].timesRight += 1;
          } else {
            questionStats[key].timesWrong += 1;
          }
          if (
            quiz.createdAt &&
            quiz.createdAt > questionStats[key].lastSeen
          ) {
            questionStats[key].lastSeen = quiz.createdAt;
          }
        }
      }
    }

    const traps = Object.values(questionStats)
      .filter((q) => q.timesWrong > 0)
      .sort((a, b) => b.timesWrong - a.timesWrong)
      .slice(0, 15);

    // --- Progression par semaine ---
    const weeklyScores: Record<string, Record<string, { total: number; count: number }>> = {};

    for (const quiz of quizResults) {
      if (!quiz.createdAt) continue;
      const date = new Date(quiz.createdAt);
      // Calculer le lundi de la semaine
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(date.setDate(diff));
      const weekKey = monday.toISOString().split("T")[0];
      const mod = quiz.module || "general";

      if (!weeklyScores[weekKey]) weeklyScores[weekKey] = {};
      if (!weeklyScores[weekKey][mod])
        weeklyScores[weekKey][mod] = { total: 0, count: 0 };

      weeklyScores[weekKey][mod].total += quiz.percentage || 0;
      weeklyScores[weekKey][mod].count += 1;
    }

    const weeklyProgress = Object.entries(weeklyScores)
      .map(([week, modules]) => {
        const scores: Record<string, number> = {};
        for (const [mod, data] of Object.entries(modules)) {
          scores[mod] = Math.round(data.total / data.count);
        }
        return { week, scores };
      })
      .sort((a, b) => a.week.localeCompare(b.week))
      .slice(-8); // Derniers 8 semaines

    // --- Plan suggere ---
    const suggestedPlan = moduleEntries.map(([mod, avg]) => {
      let priority: "high" | "medium" | "low";
      let estimatedMinutes: number;

      if (avg < 40) {
        priority = "high";
        estimatedMinutes = 45;
      } else if (avg < 65) {
        priority = "high";
        estimatedMinutes = 30;
      } else if (avg < 80) {
        priority = "medium";
        estimatedMinutes = 20;
      } else {
        priority = "low";
        estimatedMinutes = 10;
      }

      const reason =
        avg < 40
          ? `Score critique (${avg}%) - necessite une revision approfondie`
          : avg < 65
          ? `Score insuffisant (${avg}%) - a travailler en priorite`
          : avg < 80
          ? `Score correct (${avg}%) - a consolider`
          : `Bon niveau (${avg}%) - maintenir les acquis`;

      return { module: mod, priority, estimatedMinutes, reason };
    });

    // --- Resume du jour ---
    const todayStr = new Date().toISOString().split("T")[0];

    const todayQuizzes = quizResults.filter(
      (q) => q.createdAt && q.createdAt.startsWith(todayStr)
    );
    const questionsToday = todayQuizzes.reduce(
      (sum, q) => sum + (q.totalQuestions || q.questions?.length || 0),
      0
    );
    const correctToday = todayQuizzes.reduce(
      (sum, q) => sum + (q.correctAnswers || q.score || 0),
      0
    );

    const todayFlashcards = flashcardProgress.filter(
      (f) => f.lastReviewed && f.lastReviewed.startsWith(todayStr)
    );

    const studyMinutes = user?.stats?.studyTimeMinutes || 0;
    const xpEarned = todayQuizzes.reduce(
      (sum, q) => sum + (q.xpEarned || 0),
      0
    );

    const dailySummary = {
      questionsToday,
      correctToday,
      flashcardsToday: todayFlashcards.length,
      studyMinutes,
      xpEarned,
    };

    return Response.json({
      strengths,
      weaknesses,
      traps,
      weeklyProgress,
      suggestedPlan,
      dailySummary,
      profile: {
        xp: user?.xp || 0,
        level: user?.level || 1,
        streak: user?.streak || 0,
      },
      averageByModule,
    });
  } catch (error) {
    console.error("GET /api/analyse error:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
