export interface FlashcardProgress {
  cardId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: Date;
  lastReview: Date;
}

export type Quality = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Algorithme SM-2 de répétition espacée.
 *
 * quality:
 *   0 = blackout total
 *   1 = incorrect
 *   2 = difficile (avec erreurs)
 *   3 = correct mais difficile
 *   4 = bon
 *   5 = parfait
 */
export function calculateNextReview(
  card: FlashcardProgress,
  quality: Quality
): FlashcardProgress {
  const now = new Date();

  let { easeFactor, interval, repetitions } = card;

  if (quality < 3) {
    // Mauvaise réponse : on recommence
    repetitions = 0;
    interval = 1;
  } else {
    // Bonne réponse : on augmente l'intervalle
    repetitions += 1;

    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }

  // Ajustement du facteur de facilité (SM-2)
  easeFactor =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Le facteur de facilité ne descend jamais en dessous de 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

  return {
    cardId: card.cardId,
    easeFactor,
    interval,
    repetitions,
    nextReview,
    lastReview: now,
  };
}

/**
 * Crée un FlashcardProgress initial pour une nouvelle carte.
 */
export function createInitialProgress(cardId: string): FlashcardProgress {
  return {
    cardId,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: new Date(),
    lastReview: new Date(),
  };
}
