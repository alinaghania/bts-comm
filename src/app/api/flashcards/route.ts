import { type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";

// Algorithme SM-2 (SuperMemo 2) pour la répétition espacée
function sm2(
  quality: number, // 0-5
  repetitions: number,
  easeFactor: number,
  interval: number
): { repetitions: number; easeFactor: number; interval: number } {
  let newRepetitions = repetitions;
  let newEaseFactor = easeFactor;
  let newInterval = interval;

  if (quality >= 3) {
    // Bonne réponse
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easeFactor);
    }
    newRepetitions = repetitions + 1;
  } else {
    // Mauvaise réponse - on reset
    newRepetitions = 0;
    newInterval = 1;
  }

  // Mise à jour du ease factor
  newEaseFactor =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEaseFactor < 1.3) newEaseFactor = 1.3;

  return {
    repetitions: newRepetitions,
    easeFactor: newEaseFactor,
    interval: newInterval,
  };
}

function getUserId(request: NextRequest): string | null {
  return request.headers.get("x-user-id");
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

    const db = await getDb();
    const now = new Date();

    // Construire le filtre
    const filter: Record<string, unknown> = {
      userId,
      nextReview: { $lte: now.toISOString() },
    };
    if (exam) filter.exam = exam;
    if (module) filter.module = module;

    // Récupérer les cartes à réviser
    const cards = await db
      .collection("flashcard_progress")
      .find(filter)
      .sort({ nextReview: 1 })
      .toArray();

    return Response.json({ cards, count: cards.length });
  } catch (error) {
    console.error("GET /api/flashcards error:", error);
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
    const { cardId, quality, exam, module, question, answer } = body;

    if (cardId === undefined || quality === undefined) {
      return Response.json(
        { error: "cardId et quality sont requis" },
        { status: 400 }
      );
    }

    if (quality < 0 || quality > 5) {
      return Response.json(
        { error: "quality doit être entre 0 et 5" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const now = new Date();

    // Récupérer le progress existant ou créer un nouveau
    let progress = await db
      .collection("flashcard_progress")
      .findOne({ userId, cardId });

    const currentRepetitions = progress?.repetitions ?? 0;
    const currentEaseFactor = progress?.easeFactor ?? 2.5;
    const currentInterval = progress?.interval ?? 0;

    // Calculer le prochain intervalle avec SM-2
    const result = sm2(
      quality,
      currentRepetitions,
      currentEaseFactor,
      currentInterval
    );

    // Calculer la prochaine date de révision
    const nextReview = new Date(now);
    nextReview.setDate(nextReview.getDate() + result.interval);

    const updateData = {
      userId,
      cardId,
      exam: exam || progress?.exam,
      module: module || progress?.module,
      question: question || progress?.question,
      answer: answer || progress?.answer,
      repetitions: result.repetitions,
      easeFactor: result.easeFactor,
      interval: result.interval,
      nextReview: nextReview.toISOString(),
      lastReviewed: now.toISOString(),
      totalReviews: (progress?.totalReviews ?? 0) + 1,
      updatedAt: now.toISOString(),
    };

    await db.collection("flashcard_progress").updateOne(
      { userId, cardId },
      {
        $set: updateData,
        $setOnInsert: { createdAt: now.toISOString() },
      },
      { upsert: true }
    );

    return Response.json({
      ...updateData,
      message: "Flashcard mise à jour",
    });
  } catch (error) {
    console.error("POST /api/flashcards error:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
