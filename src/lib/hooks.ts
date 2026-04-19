'use client';
import { useState, useEffect, useCallback } from 'react';

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
  lastActivity: string;
  totalQuestions: number;
  correctAnswers: number;
  studyTimeToday: number;
  e1Progress: number;
  e5Progress: number;
  e6Progress: number;
  flashcardsDue: number;
  examDate: string;
  badges: Array<{ id: string; name: string; icon: string; earned: boolean; description: string }>;
  quizHistory: Array<{ date: string; score: number; total: number; exam: string }>;
  examHistory: Array<{ date: string; score: number; exam: string; duration: string }>;
  weeklyStudyTime: Array<{ day: string; minutes: number }>;
  skillScores: Array<{ label: string; value: number }>;
  onboarding_completed: boolean;
}

const DEFAULT_PROGRESS: UserProgress = {
  level: 1,
  xp: 0,
  xpToNext: 100,
  streak: 0,
  lastActivity: '',
  totalQuestions: 0,
  correctAnswers: 0,
  studyTimeToday: 0,
  e1Progress: 0,
  e5Progress: 0,
  e6Progress: 0,
  flashcardsDue: 0,
  examDate: '2026-06-15',
  badges: [],
  quizHistory: [],
  examHistory: [],
  weeklyStudyTime: [
    { day: 'Lun', minutes: 0 },
    { day: 'Mar', minutes: 0 },
    { day: 'Mer', minutes: 0 },
    { day: 'Jeu', minutes: 0 },
    { day: 'Ven', minutes: 0 },
    { day: 'Sam', minutes: 0 },
    { day: 'Dim', minutes: 0 },
  ],
  skillScores: [
    { label: 'Theories', value: 0 },
    { label: 'Semiotique', value: 0 },
    { label: 'Strategie', value: 0 },
    { label: 'Digital', value: 0 },
    { label: 'Production', value: 0 },
    { label: 'Droit', value: 0 },
  ],
  onboarding_completed: false,
};

export function useProgress() {
  const { userId } = useUser();
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await fetch('/api/progress', {
        headers: { 'x-user-id': userId },
      });
      if (res.ok) {
        const data = await res.json();
        setProgress({ ...DEFAULT_PROGRESS, ...data });
      }
    } catch (e) {
      console.error('Failed to fetch progress:', e);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const updateProgress = useCallback(async (updates: Partial<UserProgress>) => {
    if (!userId) return;
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'x-user-id': userId, 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      setProgress(prev => ({ ...prev, ...updates }));
    } catch (e) {
      console.error('Failed to update progress:', e);
    }
  }, [userId]);

  return { progress, loading, updateProgress, refetch: fetchProgress };
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

export function useFlashcards(exam?: string) {
  const { userId } = useUser();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFlashcards = useCallback(async () => {
    if (!userId) return;
    try {
      const params = new URLSearchParams();
      if (exam) params.set('exam', exam);
      const res = await fetch(`/api/flashcards?${params}`, {
        headers: { 'x-user-id': userId },
      });
      if (res.ok) {
        const data = await res.json();
        setFlashcards(data.cards || []);
      }
    } catch (e) {
      console.error('Failed to fetch flashcards:', e);
    } finally {
      setLoading(false);
    }
  }, [userId, exam]);

  useEffect(() => {
    loadFlashcards();
  }, [loadFlashcards]);

  const rateCard = useCallback(async (cardId: string, quality: number) => {
    if (!userId) return;
    try {
      await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'x-user-id': userId, 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId, quality }),
      });
    } catch (e) {
      console.error('Failed to rate card:', e);
    }
  }, [userId]);

  const today = new Date().toISOString().split('T')[0];
  const dueToday = flashcards.filter(c => c.nextReview <= today);
  const mastered = flashcards.filter(c => c.box >= 4);
  const learning = flashcards.filter(c => c.box < 4);

  return { flashcards, dueToday, mastered, learning, loading, rateCard, refetch: loadFlashcards };
}

// Hook for sending messages to AI tutor
export function useTutor() {
  const { userId } = useUser();
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
    context?: string
  ): Promise<string> => {
    if (!userId) return '';
    setLoading(true);
    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'x-user-id': userId, 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, context }),
      });
      if (res.ok) {
        // Read streaming response
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let result = '';
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });
          }
        }
        return result || await res.text();
      }
      return 'Erreur de connexion avec le tuteur IA.';
    } catch (e) {
      console.error('Tutor error:', e);
      return 'Erreur de connexion avec le tuteur IA.';
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { sendMessage, loading };
}
