'use client';

import { useState, useEffect, useCallback } from 'react';

// Generate a random user ID
function generateUserId(): string {
  return 'user_' + Math.random().toString(36).substring(2, 15);
}

export function useUser() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let stored = localStorage.getItem('bts-user-id');
    if (!stored) {
      stored = generateUserId();
      localStorage.setItem('bts-user-id', stored);
    }
    setUserId(stored);
  }, []);

  return { userId };
}

export interface UserProgress {
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  totalQuestions: number;
  accuracy: number;
  studyTimeToday: number;
  e1Progress: number;
  e4Progress: number;
  e5Progress: number;
  flashcardsDue: number;
  examDate: string;
}

export function useProgress() {
  const { userId } = useUser();
  const [progress, setProgress] = useState<UserProgress>({
    level: 7,
    xp: 2450,
    xpToNext: 3000,
    streak: 12,
    totalQuestions: 847,
    accuracy: 78,
    studyTimeToday: 45,
    e1Progress: 62,
    e4Progress: 45,
    e5Progress: 38,
    flashcardsDue: 23,
    examDate: '2026-06-15',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    // In a real app, fetch from API with x-user-id header
    // For now, use default data
    setLoading(false);
  }, [userId]);

  return { progress, loading, setProgress };
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  exam: string;
  module: string;
  box: number;
  nextReview: string;
}

export function useFlashcards(exam?: string, module?: string) {
  const { userId } = useUser();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFlashcards = useCallback(() => {
    // Mock flashcard data
    const allCards: Flashcard[] = [
      { id: '1', question: 'Quelles sont les 6 fonctions du langage selon Jakobson ?', answer: 'Referentielle, emotive, conative, phatique, metalinguistique, poetique', exam: 'E1', module: 'com-ecrite', box: 1, nextReview: '2026-04-19' },
      { id: '2', question: 'Qu\'est-ce que le SWOT ?', answer: 'Strengths (Forces), Weaknesses (Faiblesses), Opportunities (Opportunites), Threats (Menaces) - Outil d\'analyse strategique', exam: 'E4', module: 'strategie', box: 2, nextReview: '2026-04-19' },
      { id: '3', question: 'Definir le positionnement en communication', answer: 'Place qu\'occupe une marque/produit dans l\'esprit du consommateur par rapport a la concurrence', exam: 'E4', module: 'strategie', box: 1, nextReview: '2026-04-19' },
      { id: '4', question: 'Qu\'est-ce que la ligne editoriale ?', answer: 'Ensemble des choix et decisions qui definissent l\'identite d\'un media : ton, sujets, angle, frequence, cible', exam: 'E1', module: 'veille', box: 3, nextReview: '2026-04-20' },
      { id: '5', question: 'Citer les etapes d\'un plan de communication', answer: 'Diagnostic, objectifs, cible, strategie, moyens/actions, planning, budget, evaluation', exam: 'E4', module: 'strategie', box: 1, nextReview: '2026-04-19' },
      { id: '6', question: 'Qu\'est-ce que le brief creatif ?', answer: 'Document de synthese remis a l\'equipe creative qui resume la problematique, les objectifs, la cible, le message et les contraintes', exam: 'E5', module: 'production', box: 2, nextReview: '2026-04-19' },
      { id: '7', question: 'Definir l\'identite visuelle', answer: 'Ensemble des elements graphiques qui permettent d\'identifier une marque : logo, couleurs, typographie, iconographie', exam: 'E5', module: 'production', box: 1, nextReview: '2026-04-19' },
      { id: '8', question: 'Qu\'est-ce que la semiotique ?', answer: 'Science qui etudie les signes et leur signification dans la communication', exam: 'E1', module: 'com-ecrite', box: 4, nextReview: '2026-04-22' },
      { id: '9', question: 'Les 5 axes de la communication digitale ?', answer: 'Site web, reseaux sociaux, emailing, SEO/SEA, content marketing', exam: 'E4', module: 'digital', box: 2, nextReview: '2026-04-19' },
      { id: '10', question: 'Qu\'est-ce qu\'un cahier des charges ?', answer: 'Document contractuel qui definit les specifications, contraintes et attentes d\'un projet de communication', exam: 'E5', module: 'production', box: 3, nextReview: '2026-04-21' },
      { id: '11', question: 'Definir la communication institutionnelle', answer: 'Communication qui vise a promouvoir l\'image et les valeurs de l\'organisation aupres de ses differents publics', exam: 'E1', module: 'cultures', box: 1, nextReview: '2026-04-19' },
      { id: '12', question: 'Qu\'est-ce que le storytelling ?', answer: 'Technique de communication qui utilise la narration pour transmettre un message et creer une connexion emotionnelle', exam: 'E4', module: 'strategie', box: 2, nextReview: '2026-04-19' },
    ];

    let filtered = allCards;
    if (exam) filtered = filtered.filter(c => c.exam === exam);
    if (module) filtered = filtered.filter(c => c.module === module);

    setFlashcards(filtered);
    setLoading(false);
  }, [exam, module]);

  useEffect(() => {
    if (!userId) return;
    loadFlashcards();
  }, [userId, loadFlashcards]);

  const dueToday = flashcards.filter(c => c.nextReview <= '2026-04-19');
  const mastered = flashcards.filter(c => c.box >= 4);
  const learning = flashcards.filter(c => c.box < 4);

  return { flashcards, dueToday, mastered, learning, loading, setFlashcards };
}
