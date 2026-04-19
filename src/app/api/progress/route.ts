import { type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";
import { BADGES } from "@/lib/gamification";

function getUserId(request: NextRequest): string | null {
  return request.headers.get("x-user-id");
}

const DAY_NAMES = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

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
        createdAt: now,
        updatedAt: now,
      };
      const result = await db.collection("users").insertOne(newUser);
      user = { _id: result.insertedId, ...newUser };
    }

    // --- Fetch quiz_results ---
    const quizResults = await db
      .collection("quiz_results")
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    // --- Fetch exam_results ---
    const examResults = await db
      .collection("exam_results")
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    // --- Fetch flashcard_progress ---
    const flashcardProgress = await db
      .collection("flashcard_progress")
      .find({ userId })
      .toArray();

    // --- Compute totalQuestions and correctAnswers ---
    let totalQuestions = 0;
    let correctAnswers = 0;
    for (const quiz of quizResults) {
      totalQuestions += quiz.total || 0;
      correctAnswers += quiz.score || 0;
    }

    // --- Compute accuracy ---
    const accuracy =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;

    // --- Compute XP to next level ---
    const currentXp = user.xp || 0;
    const currentLevel = user.level || 1;
    const xpToNext = currentLevel * 100; // Each level requires level*100 XP

    // --- Compute e1Progress, e4Progress, e5Progress from flashcard mastery ---
    const examCards: Record<string, { total: number; mastered: number }> = {};
    for (const card of flashcardProgress) {
      const exam = (card.exam || "").toUpperCase();
      if (!examCards[exam]) examCards[exam] = { total: 0, mastered: 0 };
      examCards[exam].total += 1;
      if ((card.repetitions || 0) >= 5) examCards[exam].mastered += 1;
    }

    const computeExamProgress = (examKey: string): number => {
      const data = examCards[examKey];
      if (!data || data.total === 0) return 0;
      return Math.round((data.mastered / data.total) * 100);
    };

    const e1Progress = computeExamProgress("E1");
    const e4Progress = computeExamProgress("E4");
    const e5Progress = computeExamProgress("E5");

    // --- Compute flashcardsDue ---
    const now = new Date();
    const flashcardsDue = flashcardProgress.filter(
      (f) => new Date(f.nextReview) <= now
    ).length;

    // --- Compute studyTimeToday ---
    const todayStr = now.toISOString().split("T")[0];
    let studyTimeToday = 0;
    for (const quiz of quizResults) {
      if (quiz.createdAt && quiz.createdAt.startsWith(todayStr)) {
        studyTimeToday += Math.round((quiz.timeSeconds || 0) / 60);
      }
    }
    for (const exam of examResults) {
      if (exam.createdAt && exam.createdAt.startsWith(todayStr)) {
        studyTimeToday += Math.round((exam.timeSeconds || 0) / 60);
      }
    }

    // --- Compute badges ---
    const earnedBadgeIds: string[] = user.badges || [];
    const badges = BADGES.map((b) => ({
      id: b.id,
      name: b.name,
      icon: b.icon,
      description: b.description,
      earned: earnedBadgeIds.includes(b.id),
    }));

    // --- Compute quizHistory (last 30) ---
    const quizHistory = quizResults.slice(0, 30).map((q) => ({
      date: q.createdAt || "",
      score: q.score || 0,
      total: q.total || 0,
      exam: q.exam || "",
    }));

    // --- Compute examHistory ---
    const examHistory = examResults.map((e) => ({
      date: e.createdAt || "",
      score: e.noteOn20 || 0,
      exam: e.type || "",
      duration: e.timeSeconds
        ? `${Math.floor(e.timeSeconds / 3600)}h${String(
            Math.floor((e.timeSeconds % 3600) / 60)
          ).padStart(2, "0")}`
        : "0h00",
    }));

    // --- Compute weeklyStudyTime ---
    const weekMap: Record<string, number> = {
      Lun: 0,
      Mar: 0,
      Mer: 0,
      Jeu: 0,
      Ven: 0,
      Sam: 0,
      Dim: 0,
    };

    // Look at quiz_results from the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    for (const quiz of quizResults) {
      const quizDate = new Date(quiz.createdAt);
      if (quizDate >= sevenDaysAgo) {
        const dayName = DAY_NAMES[quizDate.getDay()];
        weekMap[dayName] += Math.round((quiz.timeSeconds || 0) / 60);
      }
    }
    for (const exam of examResults) {
      const examDate = new Date(exam.createdAt);
      if (examDate >= sevenDaysAgo) {
        const dayName = DAY_NAMES[examDate.getDay()];
        weekMap[dayName] += Math.round((exam.timeSeconds || 0) / 60);
      }
    }

    const weeklyStudyTime = [
      { day: "Lun", minutes: weekMap["Lun"] },
      { day: "Mar", minutes: weekMap["Mar"] },
      { day: "Mer", minutes: weekMap["Mer"] },
      { day: "Jeu", minutes: weekMap["Jeu"] },
      { day: "Ven", minutes: weekMap["Ven"] },
      { day: "Sam", minutes: weekMap["Sam"] },
      { day: "Dim", minutes: weekMap["Dim"] },
    ];

    // --- Compute skillScores from quiz_results grouped by module ---
    const moduleScores: Record<string, { total: number; count: number }> = {};
    const moduleToSkill: Record<string, string> = {
      culture_generale: "Theories",
      theorie_communication: "Theories",
      histoire_comm: "Theories",
      expression_ecrite: "Theories",
      semiologie: "Semiotique",
      semiotique: "Semiotique",
      strategie: "Strategie",
      strategie_comm: "Strategie",
      negociation: "Strategie",
      conseil_annonceur: "Strategie",
      marketing: "Strategie",
      digital: "Digital",
      media_planning: "Digital",
      achat_espace: "Digital",
      production: "Production",
      creation: "Production",
      projet_communication: "Production",
      pao_web: "Production",
      audiovisuel: "Production",
      evenementiel: "Production",
      droit_comm: "Droit",
      droit: "Droit",
      economie_comm: "Droit",
      recherche_info: "Droit",
      veille: "Droit",
    };

    for (const quiz of quizResults) {
      const mod = quiz.module || "general";
      const skill = moduleToSkill[mod] || "Theories";
      if (!moduleScores[skill]) moduleScores[skill] = { total: 0, count: 0 };
      moduleScores[skill].total += quiz.percentage || 0;
      moduleScores[skill].count += 1;
    }

    const skillLabels = [
      "Theories",
      "Semiotique",
      "Strategie",
      "Digital",
      "Production",
      "Droit",
    ];
    const skillScores = skillLabels.map((label) => ({
      label,
      value: moduleScores[label]
        ? Math.round(moduleScores[label].total / moduleScores[label].count)
        : 0,
    }));

    return Response.json({
      level: currentLevel,
      xp: currentXp,
      xpToNext,
      streak: user.streak || 0,
      lastActivity: user.lastActive || "",
      totalQuestions,
      correctAnswers,
      accuracy,
      studyTimeToday,
      e1Progress,
      e4Progress,
      e5Progress,
      flashcardsDue,
      examDate: "2026-06-15",
      badges,
      quizHistory,
      examHistory,
      weeklyStudyTime,
      skillScores,
    });
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
    const now = new Date().toISOString();

    // Accept partial updates and merge them into the user document
    const updateFields: Record<string, unknown> = { updatedAt: now };

    // Whitelist of fields that can be updated directly
    const allowedFields = [
      "xp",
      "streak",
      "badges",
      "stats",
      "lastActive",
      "examDate",
    ];

    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updateFields[key] = body[key];
      }
    }

    // Recalculate level if XP changed
    if (body.xp !== undefined) {
      updateFields.level = Math.floor(body.xp / 100) + 1;
    }

    // Update lastActive on any POST
    if (!updateFields.lastActive) {
      updateFields.lastActive = now;
    }

    const db = await getDb();
    const result = await db.collection("users").findOneAndUpdate(
      { userId },
      {
        $set: updateFields,
        $setOnInsert: {
          userId,
          xp: 0,
          level: 1,
          streak: 0,
          lastActive: null,
          badges: [],
          stats: {
            totalQuizzes: 0,
            totalFlashcards: 0,
            totalExams: 0,
            averageScore: 0,
            studyTimeMinutes: 0,
          },
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
