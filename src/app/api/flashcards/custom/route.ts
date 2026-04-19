import { type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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
    const cards = await db
      .collection("custom_flashcards")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    const mapped = cards.map((c) => ({
      id: c._id.toString(),
      question: c.question,
      answer: c.answer,
      exam: c.exam,
      tags: c.tags || [],
      createdAt: c.createdAt,
    }));

    return Response.json({ cards: mapped, count: mapped.length });
  } catch (error) {
    console.error("GET /api/flashcards/custom error:", error);
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
    const { question, answer, exam, tags } = body;

    if (!question || !answer) {
      return Response.json(
        { error: "question et answer sont requis" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const now = new Date().toISOString();

    const doc = {
      userId,
      question,
      answer,
      exam: exam || "",
      tags: tags || [],
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection("custom_flashcards").insertOne(doc);

    // Aussi ajouter dans flashcard_progress pour l'integration avec la revision espacee
    const cardId = `custom_${result.insertedId.toString()}`;
    await db.collection("flashcard_progress").insertOne({
      userId,
      cardId,
      question,
      answer,
      exam: exam || "",
      module: "custom",
      repetitions: 0,
      easeFactor: 2.5,
      interval: 0,
      nextReview: now,
      lastReviewed: null,
      totalReviews: 0,
      createdAt: now,
      updatedAt: now,
    });

    return Response.json({
      id: result.insertedId.toString(),
      ...doc,
      message: "Flashcard creee",
    });
  } catch (error) {
    console.error("POST /api/flashcards/custom error:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const body = await request.json();
    const { cardId } = body;

    if (!cardId) {
      return Response.json(
        { error: "cardId est requis" },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Supprimer la flashcard custom
    await db.collection("custom_flashcards").deleteOne({
      _id: new ObjectId(cardId),
      userId,
    });

    // Supprimer aussi dans flashcard_progress
    await db.collection("flashcard_progress").deleteOne({
      userId,
      cardId: `custom_${cardId}`,
    });

    return Response.json({ message: "Flashcard supprimee" });
  } catch (error) {
    console.error("DELETE /api/flashcards/custom error:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
