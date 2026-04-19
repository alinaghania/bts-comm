import { type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";

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

// Structure d'une épreuve blanche selon le format officiel BTS Communication
const EXAM_CONFIG: Record<
  string,
  {
    name: string;
    duration: number; // en minutes
    coefficient: number;
    modules: string[];
    questionCount: number;
    description: string;
  }
> = {
  e1: {
    name: "E1 - Cultures de la Communication",
    duration: 240,
    coefficient: 3,
    modules: [
      "culture_generale",
      "expression_ecrite",
      "theorie_communication",
      "histoire_comm",
      "semiologie",
    ],
    questionCount: 40,
    description:
      "Épreuve écrite portant sur la culture générale et l'expression en lien avec la communication.",
  },
  e5: {
    name: "E5 - Contribution a l'elaboration et au pilotage de la strategie de communication",
    duration: 240,
    coefficient: 5,
    modules: [
      "strategie_comm",
      "conseil_annonceur",
      "diagnostic",
      "veille",
      "droit_comm",
    ],
    questionCount: 30,
    description:
      "Épreuve écrite portant sur le diagnostic, les préconisations stratégiques, le plan de communication et le droit de la communication.",
  },
  e6: {
    name: "E6 - Conception et mise en oeuvre de solutions de communication",
    duration: 40,
    coefficient: 4,
    modules: [
      "projet_communication",
      "production",
      "strategie_comm",
      "media_planning",
      "creation",
    ],
    questionCount: 30,
    description:
      "Épreuve orale portant sur la conception et mise en oeuvre de solutions de communication. Situation A (portfolio) + Situation B (parcours + fiches descriptives).",
  },
};

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || "e1";

    const config = EXAM_CONFIG[type];
    if (!config) {
      return Response.json(
        {
          error: `Type d'épreuve invalide. Valeurs acceptées : ${Object.keys(EXAM_CONFIG).join(", ")}`,
        },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Récupérer les questions depuis la DB pour cette épreuve
    const questions = await db
      .collection("questions")
      .find({ exam: type })
      .toArray();

    if (questions.length === 0) {
      return Response.json({
        exam: {
          type,
          ...config,
          questions: [],
        },
        message:
          "Aucune question trouvée pour cette épreuve. Ajoutez des questions avec le champ exam correspondant.",
      });
    }

    // Sélectionner les questions par module pour un bon équilibre
    const questionsByModule: Record<string, typeof questions> = {};
    for (const q of questions) {
      const mod = q.module || "general";
      if (!questionsByModule[mod]) questionsByModule[mod] = [];
      questionsByModule[mod].push(q);
    }

    // Répartir équitablement entre les modules
    const selectedQuestions: typeof questions = [];
    const modules = Object.keys(questionsByModule);
    const perModule = Math.ceil(config.questionCount / modules.length);

    for (const mod of modules) {
      const modQuestions = shuffle(questionsByModule[mod]);
      selectedQuestions.push(...modQuestions.slice(0, perModule));
    }

    // Limiter et mélanger
    const finalQuestions = shuffle(selectedQuestions).slice(
      0,
      config.questionCount
    );

    // Retirer les réponses correctes pour le client
    const clientQuestions = finalQuestions.map((q, index) => ({
      id: q._id?.toString() || q.id,
      number: index + 1,
      exam: q.exam,
      module: q.module,
      difficulty: q.difficulty,
      question: q.question,
      choices: q.choices,
      points: q.points || 1,
    }));

    return Response.json({
      exam: {
        type,
        name: config.name,
        duration: config.duration,
        coefficient: config.coefficient,
        description: config.description,
        totalQuestions: clientQuestions.length,
        totalPoints: clientQuestions.reduce(
          (sum, q) => sum + (q.points || 1),
          0
        ),
        questions: clientQuestions,
      },
    });
  } catch (error) {
    console.error("GET /api/exam error:", error);
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
    const { type, answers, timeSeconds, score, total } = body;

    if (!type || !answers || score === undefined || total === undefined) {
      return Response.json(
        { error: "type, answers, score et total sont requis" },
        { status: 400 }
      );
    }

    const config = EXAM_CONFIG[type];
    if (!config) {
      return Response.json(
        { error: "Type d'épreuve invalide" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const now = new Date().toISOString();
    const percentage = Math.round((score / total) * 100);

    // Convertir le pourcentage en note sur 20
    const noteOn20 = Math.round((percentage / 100) * 20 * 10) / 10;

    // Calculer les XP (plus d'XP pour les épreuves blanches)
    const xpEarned = Math.round((percentage / 100) * 100);

    // Enregistrer le résultat
    const examResult = {
      userId,
      type,
      name: config.name,
      coefficient: config.coefficient,
      answers,
      score,
      total,
      percentage,
      noteOn20,
      timeSeconds: timeSeconds || 0,
      timeLimitSeconds: config.duration * 60,
      xpEarned,
      createdAt: now,
    };

    await db.collection("exam_results").insertOne(examResult);

    // Mettre à jour les stats de l'utilisateur
    const user = await db.collection("users").findOne({ userId });
    const currentStats = user?.stats || {
      totalQuizzes: 0,
      totalFlashcards: 0,
      totalExams: 0,
      averageScore: 0,
      studyTimeMinutes: 0,
    };

    const newXp = (user?.xp || 0) + xpEarned;

    await db.collection("users").updateOne(
      { userId },
      {
        $set: {
          xp: newXp,
          level: Math.floor(newXp / 100) + 1,
          "stats.totalExams": currentStats.totalExams + 1,
          "stats.studyTimeMinutes":
            currentStats.studyTimeMinutes +
            Math.round((timeSeconds || 0) / 60),
          updatedAt: now,
          lastActive: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    );

    return Response.json({
      ...examResult,
      xpEarned,
      newTotalXp: newXp,
      newLevel: Math.floor(newXp / 100) + 1,
      passed: noteOn20 >= 10,
    });
  } catch (error) {
    console.error("POST /api/exam error:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
