import { type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";

// Base de questions type BTS Communication
// En production, ces données seraient en DB, mais on fournit une structure de base
interface QuizQuestion {
  id: string;
  exam: string;
  module: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

function getUserId(request: NextRequest): string | null {
  return request.headers.get("x-user-id");
}

// Mélange Fisher-Yates
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Calcul XP basé sur la performance
function calculateXP(
  score: number,
  total: number,
  difficulty: string
): number {
  const baseXP = Math.round((score / total) * 50);
  const multiplier =
    difficulty === "hard" ? 2 : difficulty === "medium" ? 1.5 : 1;
  return Math.round(baseXP * multiplier);
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const exam = searchParams.get("exam");
    const module = searchParams.get("module");
    const count = parseInt(searchParams.get("count") || "10", 10);
    const difficulty = searchParams.get("difficulty") || "mixed";
    const mode = searchParams.get("mode");

    const db = await getDb();

    // Construire le filtre pour récupérer les questions depuis la DB
    const filter: Record<string, unknown> = {};
    if (exam) filter.exam = exam;

    if (mode === "interleaving") {
      // Mode entrelacement : mélange de plusieurs modules
      // Ne pas filtrer par module unique
    } else if (module) {
      filter.module = module;
    }

    if (difficulty !== "mixed") {
      filter.difficulty = difficulty;
    }

    // Récupérer les questions depuis la collection "questions"
    let questions = await db
      .collection("questions")
      .find(filter)
      .toArray();

    // Si pas de questions en DB, renvoyer un tableau vide avec un message
    if (questions.length === 0) {
      return Response.json({
        questions: [],
        count: 0,
        message:
          "Aucune question trouvée. Ajoutez des questions dans la collection 'questions'.",
        filters: { exam, module, difficulty, mode },
      });
    }

    // Mélanger les questions
    questions = shuffle(questions);

    // Si difficulty=mixed, on s'assure d'avoir un bon mix
    if (difficulty === "mixed" && questions.length >= count) {
      const easy = questions.filter(
        (q) => q.difficulty === "easy"
      );
      const medium = questions.filter(
        (q) => q.difficulty === "medium"
      );
      const hard = questions.filter(
        (q) => q.difficulty === "hard"
      );

      const mixed: typeof questions = [];
      const perDifficulty = Math.floor(count / 3);
      const remainder = count - perDifficulty * 3;

      mixed.push(...shuffle(easy).slice(0, perDifficulty));
      mixed.push(
        ...shuffle(medium).slice(0, perDifficulty + remainder)
      );
      mixed.push(...shuffle(hard).slice(0, perDifficulty));

      // Si on n'a pas assez d'une difficulté, compléter avec les autres
      if (mixed.length < count) {
        const usedIds = new Set(
          mixed.map((q) => q._id?.toString())
        );
        const remaining = questions.filter(
          (q) => !usedIds.has(q._id?.toString())
        );
        mixed.push(...remaining.slice(0, count - mixed.length));
      }

      questions = shuffle(mixed);
    }

    // Limiter au nombre demandé
    questions = questions.slice(0, count);

    // Retirer les réponses correctes pour le client (ne pas tricher!)
    const clientQuestions = questions.map((q) => ({
      id: q._id?.toString() || q.id,
      exam: q.exam,
      module: q.module,
      difficulty: q.difficulty,
      question: q.question,
      choices: q.choices,
      explanation: q.explanation,
    }));

    return Response.json({
      questions: clientQuestions,
      count: clientQuestions.length,
      filters: { exam, module, difficulty, mode },
    });
  } catch (error) {
    console.error("GET /api/quiz error:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const body = await request.json();
    const { questions, answers, score, total, timeSeconds, exam, module } =
      body;

    if (
      score === undefined ||
      total === undefined ||
      !answers
    ) {
      return Response.json(
        { error: "score, total et answers sont requis" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const now = new Date().toISOString();

    // Déterminer la difficulté dominante pour le calcul XP
    const dominantDifficulty =
      questions?.[0]?.difficulty || "medium";

    // Calculer les XP gagnés
    const xpEarned = calculateXP(score, total, dominantDifficulty);

    // Enregistrer le résultat du quiz
    const quizResult = {
      userId,
      exam: exam || null,
      module: module || null,
      questions: questions || [],
      answers,
      score,
      total,
      percentage: Math.round((score / total) * 100),
      timeSeconds: timeSeconds || 0,
      xpEarned,
      createdAt: now,
    };

    await db.collection("quiz_results").insertOne(quizResult);

    // Mettre à jour les stats de l'utilisateur
    const user = await db.collection("users").findOne({ userId });
    const currentStats = user?.stats || {
      totalQuizzes: 0,
      totalFlashcards: 0,
      totalExams: 0,
      averageScore: 0,
      studyTimeMinutes: 0,
    };

    const newTotalQuizzes = currentStats.totalQuizzes + 1;
    const newAverageScore = Math.round(
      (currentStats.averageScore * currentStats.totalQuizzes +
        quizResult.percentage) /
        newTotalQuizzes
    );
    const newStudyTime =
      currentStats.studyTimeMinutes +
      Math.round((timeSeconds || 0) / 60);

    const newXp = (user?.xp || 0) + xpEarned;

    await db.collection("users").updateOne(
      { userId },
      {
        $set: {
          xp: newXp,
          level: Math.floor(newXp / 100) + 1,
          "stats.totalQuizzes": newTotalQuizzes,
          "stats.averageScore": newAverageScore,
          "stats.studyTimeMinutes": newStudyTime,
          updatedAt: now,
          lastActive: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    );

    return Response.json({
      ...quizResult,
      xpEarned,
      newTotalXp: newXp,
      newLevel: Math.floor(newXp / 100) + 1,
    });
  } catch (error) {
    console.error("POST /api/quiz error:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
