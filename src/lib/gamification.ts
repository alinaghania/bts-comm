export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
}

export interface UserProgress {
  userId: string;
  xp: number;
  level: number;
  streak: number;
  lastActivity: Date;
  badges: string[];
  stats: {
    totalQuestions: number;
    correctAnswers: number;
    studyTime: number; // en minutes
    examsTaken: number;
  };
}

/**
 * Seuils XP par niveau : 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250...
 * Formule : somme de (100 + 50*(n-1)) pour chaque niveau n.
 */
const XP_THRESHOLDS: number[] = [];
{
  let cumul = 0;
  for (let n = 1; n <= 100; n++) {
    cumul += 100 + 50 * (n - 1);
    XP_THRESHOLDS.push(cumul);
  }
}

export function calculateLevel(xp: number): number {
  for (let i = 0; i < XP_THRESHOLDS.length; i++) {
    if (xp < XP_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return XP_THRESHOLDS.length + 1;
}

/**
 * Retourne l'XP nécessaire pour atteindre le niveau suivant.
 */
export function xpForNextLevel(currentLevel: number): number {
  if (currentLevel - 1 < XP_THRESHOLDS.length) {
    return XP_THRESHOLDS[currentLevel - 1];
  }
  return Infinity;
}

export type Difficulty = "easy" | "medium" | "hard";

const XP_MAP: Record<Difficulty, { correct: number; incorrect: number }> = {
  easy: { correct: 10, incorrect: 2 },
  medium: { correct: 20, incorrect: 5 },
  hard: { correct: 35, incorrect: 8 },
};

export function calculateXP(difficulty: Difficulty, correct: boolean): number {
  return correct ? XP_MAP[difficulty].correct : XP_MAP[difficulty].incorrect;
}

/**
 * Vérifie si le streak continue (activité dans les dernières 24h).
 * Retourne le nouveau streak.
 */
export function checkStreak(lastActivity: Date | null): {
  streak: number;
  continued: boolean;
} {
  if (!lastActivity) {
    return { streak: 1, continued: false };
  }

  const now = new Date();
  const diffMs = now.getTime() - new Date(lastActivity).getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 24) {
    // Même journée ou dans les 24h : le streak continue (on ne l'incrémente que si c'est un nouveau jour)
    const sameDay =
      now.toDateString() === new Date(lastActivity).toDateString();
    if (sameDay) {
      return { streak: 0, continued: true }; // streak inchangé, pas de +1
    }
    return { streak: 1, continued: true }; // +1 au streak
  } else if (diffHours < 48) {
    // Entre 24h et 48h : le streak continue (+1)
    return { streak: 1, continued: true };
  } else {
    // Plus de 48h : streak perdu
    return { streak: 1, continued: false };
  }
}

// -- Badges --

export const BADGES: Badge[] = [
  {
    id: "premier-quiz",
    name: "Premier Quiz",
    description: "Termine ton premier quiz",
    icon: "Trophy",
    condition: "totalQuestions >= 1",
  },
  {
    id: "dix-quiz",
    name: "Quizmaster",
    description: "Réponds à 50 questions",
    icon: "Brain",
    condition: "totalQuestions >= 50",
  },
  {
    id: "cent-quiz",
    name: "Encyclopédiste",
    description: "Réponds à 200 questions",
    icon: "BookOpen",
    condition: "totalQuestions >= 200",
  },
  {
    id: "streak-7",
    name: "Streak 7j",
    description: "Étudie 7 jours consécutifs",
    icon: "Flame",
    condition: "streak >= 7",
  },
  {
    id: "streak-30",
    name: "Streak 30j",
    description: "Étudie 30 jours consécutifs",
    icon: "Flame",
    condition: "streak >= 30",
  },
  {
    id: "maitre-barthes",
    name: "Maître Barthes",
    description: "100% en sémiologie",
    icon: "Eye",
    condition: "semiologie_perfect",
  },
  {
    id: "stratege",
    name: "Stratège",
    description: "Termine ta première épreuve blanche",
    icon: "Target",
    condition: "examsTaken >= 1",
  },
  {
    id: "perfectionniste",
    name: "Perfectionniste",
    description: "Obtiens 100% sur un quiz complet",
    icon: "Star",
    condition: "perfect_quiz",
  },
  {
    id: "assidu",
    name: "Assidu",
    description: "Cumule 10 heures d'étude",
    icon: "Clock",
    condition: "studyTime >= 600",
  },
  {
    id: "marathonien",
    name: "Marathonien",
    description: "Cumule 50 heures d'étude",
    icon: "Medal",
    condition: "studyTime >= 3000",
  },
  {
    id: "precision",
    name: "Précision",
    description: "Maintiens un taux de réussite de 80% sur 100 questions",
    icon: "Crosshair",
    condition: "accuracy_80_100",
  },
  {
    id: "touche-a-tout",
    name: "Touche-à-tout",
    description: "Étudie au moins un chapitre de chaque épreuve (E1, E5, E6)",
    icon: "Layers",
    condition: "all_exams_studied",
  },
];

/**
 * Vérifie quels nouveaux badges ont été débloqués.
 */
export function checkBadges(
  progress: UserProgress,
  extra?: {
    perfectQuiz?: boolean;
    semiologiePerfect?: boolean;
    allExamsStudied?: boolean;
  }
): string[] {
  const newBadges: string[] = [];
  const { stats, streak, badges } = progress;

  const check = (id: string, condition: boolean) => {
    if (condition && !badges.includes(id)) {
      newBadges.push(id);
    }
  };

  check("premier-quiz", stats.totalQuestions >= 1);
  check("dix-quiz", stats.totalQuestions >= 50);
  check("cent-quiz", stats.totalQuestions >= 200);
  check("streak-7", streak >= 7);
  check("streak-30", streak >= 30);
  check("stratege", stats.examsTaken >= 1);
  check("assidu", stats.studyTime >= 600);
  check("marathonien", stats.studyTime >= 3000);
  check("perfectionniste", !!extra?.perfectQuiz);
  check("maitre-barthes", !!extra?.semiologiePerfect);
  check("touche-a-tout", !!extra?.allExamsStudied);
  check(
    "precision",
    stats.totalQuestions >= 100 &&
      stats.correctAnswers / stats.totalQuestions >= 0.8
  );

  return newBadges;
}
