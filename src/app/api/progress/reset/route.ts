import { type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const db = await getDb();

    // Delete user profile
    await db.collection("users").deleteOne({ userId });

    // Delete all flashcard progress
    await db.collection("flashcard_progress").deleteMany({ userId });

    // Delete all quiz results
    await db.collection("quiz_results").deleteMany({ userId });

    // Delete all exam results
    await db.collection("exam_results").deleteMany({ userId });

    // Delete custom flashcards
    await db.collection("custom_flashcards").deleteMany({ userId });

    return Response.json({ success: true, message: "Profil reinitialise" });
  } catch (error) {
    console.error("POST /api/progress/reset error:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
