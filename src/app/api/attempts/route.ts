import { type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";

function getUserId(request: NextRequest): string | null {
  return request.headers.get("x-user-id");
}

const VALID_TYPES = [
  "quiz",
  "exam",
  "flashcard",
  "oral",
  "rewrite",
  "reperage",
  "analyse",
  "redaction",
] as const;

const VALID_EXAMS = ["E1", "E5", "E6"] as const;

/**
 * POST /api/attempts
 * Enregistre une tentative.
 * Body: {
 *   type: "quiz|exam|flashcard|oral|rewrite|reperage|analyse|redaction",
 *   exam: "E1|E5|E6",
 *   skillIds: ["e1-positions-corpus"],
 *   score: 0-100,
 *   durationMin: 18,
 *   mistakes: ["citation mal utilisee"]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const body = await request.json();
    const { type, exam, skillIds, score, durationMin, mistakes } = body;

    // Validation
    if (!type || !VALID_TYPES.includes(type)) {
      return Response.json(
        {
          error: `type requis, valeurs acceptees: ${VALID_TYPES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    if (!exam || !VALID_EXAMS.includes(exam)) {
      return Response.json(
        {
          error: `exam requis, valeurs acceptees: ${VALID_EXAMS.join(", ")}`,
        },
        { status: 400 }
      );
    }

    if (typeof score !== "number" || score < 0 || score > 100) {
      return Response.json(
        { error: "score requis (0-100)" },
        { status: 400 }
      );
    }

    const attempt = {
      userId,
      type,
      exam,
      skillIds: Array.isArray(skillIds) ? skillIds : [],
      score,
      durationMin: typeof durationMin === "number" ? durationMin : 0,
      mistakes: Array.isArray(mistakes) ? mistakes : [],
      createdAt: new Date().toISOString(),
    };

    const db = await getDb();
    const result = await db.collection("attempts").insertOne(attempt);

    return Response.json({
      attemptId: result.insertedId,
      attempt,
    });
  } catch (error) {
    console.error("POST /api/attempts error:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * GET /api/attempts?limit=20&exam=E1
 * Retourne les X dernieres tentatives.
 */
export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return Response.json({ error: "userId requis" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") || "20", 10))
    );
    const examFilter = searchParams.get("exam");

    const db = await getDb();
    const query: Record<string, string> = { userId };
    if (examFilter && VALID_EXAMS.includes(examFilter as (typeof VALID_EXAMS)[number])) {
      query.exam = examFilter;
    }

    const attempts = await db
      .collection("attempts")
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return Response.json({ attempts, count: attempts.length });
  } catch (error) {
    console.error("GET /api/attempts error:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
