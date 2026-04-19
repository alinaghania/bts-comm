import { type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";

const DEFAULT_PROFILE = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActive: null as string | null,
  badges: [] as string[],
  stats: {
    totalQuizzes: 0,
    totalFlashcards: 0,
    totalExams: 0,
    averageScore: 0,
    studyTimeMinutes: 0,
  },
  createdAt: "",
  updatedAt: "",
};

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
    let user = await db.collection("users").findOne({ userId });

    if (!user) {
      const now = new Date().toISOString();
      const newUser = {
        userId,
        ...DEFAULT_PROFILE,
        createdAt: now,
        updatedAt: now,
      };
      const result = await db.collection("users").insertOne(newUser);
      user = { _id: result.insertedId, ...newUser };
    }

    return Response.json(user);
  } catch (error) {
    console.error("GET /api/progress error:", error);
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
    const { xp, streak, badges, stats } = body;

    const db = await getDb();
    const now = new Date().toISOString();

    const updateFields: Record<string, unknown> = { updatedAt: now };

    if (xp !== undefined) updateFields.xp = xp;
    if (streak !== undefined) updateFields.streak = streak;
    if (badges !== undefined) updateFields.badges = badges;
    if (stats !== undefined) updateFields.stats = stats;

    // Calcul du level basé sur l'XP (100 XP par level)
    if (xp !== undefined) {
      updateFields.level = Math.floor(xp / 100) + 1;
    }

    // Gestion du streak : si dernière activité était hier, on incrémente
    if (streak !== undefined) {
      updateFields.lastActive = now;
    }

    const result = await db.collection("users").findOneAndUpdate(
      { userId },
      {
        $set: updateFields,
        $setOnInsert: {
          userId,
          ...DEFAULT_PROFILE,
          createdAt: now,
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    return Response.json(result);
  } catch (error) {
    console.error("POST /api/progress error:", error);
    return Response.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
