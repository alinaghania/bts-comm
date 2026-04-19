'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  ClipboardCheck,
  CheckCircle2,
  Target,
  Layers,
  Clock,
  Zap,
  Flame,
  ArrowRight,
  Loader2,
  RefreshCw,
  BookOpen,
} from 'lucide-react';
import { useUser, useTutor } from '@/lib/hooks';

interface DailySummary {
  questionsToday: number;
  correctToday: number;
  flashcardsToday: number;
  studyMinutes: number;
  xpEarned: number;
}

interface BilanData {
  dailySummary: DailySummary;
  profile: {
    xp: number;
    level: number;
    streak: number;
  };
  strengths: Array<{ topic: string; score: number; trend: string }>;
  weaknesses: Array<{ topic: string; score: number; trend: string; commonErrors: string[] }>;
  averageByModule: Record<string, number>;
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-bg-card border border-white/5 rounded-xl p-4 text-center"
    >
      <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-text-muted mt-0.5">{label}</p>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8 animate-pulse">
      <div>
        <div className="h-8 w-48 bg-bg-card rounded-lg" />
        <div className="h-4 w-64 bg-bg-card rounded-lg mt-2" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-28 bg-bg-card rounded-xl" />
        <div className="h-28 bg-bg-card rounded-xl" />
        <div className="h-28 bg-bg-card rounded-xl" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-28 bg-bg-card rounded-xl" />
        <div className="h-28 bg-bg-card rounded-xl" />
        <div className="h-28 bg-bg-card rounded-xl" />
      </div>
      <div className="h-48 bg-bg-card rounded-2xl" />
    </div>
  );
}

export default function BilanPage() {
  const { userId } = useUser();
  const { sendMessage } = useTutor();
  const [data, setData] = useState<BilanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [bilan, setBilan] = useState<string>('');
  const [bilanLoading, setBilanLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await fetch('/api/analyse', {
        headers: { 'x-user-id': userId },
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error('Failed to fetch bilan data:', e);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const generateBilan = useCallback(async () => {
    if (!data || !userId) return;
    setBilanLoading(true);

    const summary = data.dailySummary;
    const successRate =
      summary.questionsToday > 0
        ? Math.round((summary.correctToday / summary.questionsToday) * 100)
        : 0;

    const bilanContext = `
Tu generes le BILAN DU JOUR pour un etudiant en BTS Communication. Voici ses stats d'aujourd'hui:

- Questions repondues: ${summary.questionsToday}
- Taux de reussite: ${successRate}%
- Flashcards revisees: ${summary.flashcardsToday}
- Temps d'etude: ${summary.studyMinutes} minutes
- XP gagnes: +${summary.xpEarned}
- Streak actuel: ${data.profile.streak} jours
- Niveau: ${data.profile.level}

Points forts actuels:
${data.strengths.length > 0 ? data.strengths.map(s => `- ${s.topic}: ${s.score}% (${s.trend})`).join('\n') : 'Aucun identifie'}

Points faibles actuels:
${data.weaknesses.length > 0 ? data.weaknesses.map(w => `- ${w.topic}: ${w.score}%`).join('\n') : 'Aucun identifie'}

Scores par module:
${Object.entries(data.averageByModule).map(([m, s]) => `- ${m}: ${s}%`).join('\n') || 'Aucun quiz'}

Genere un bilan quotidien PERSONNALISE et MOTIVANT. Structure:
1. Felicitation pour la session (mentionne le temps et le nombre de questions)
2. Ce qui a bien progresse aujourd'hui
3. Points d'attention / difficultes persistantes
4. Suggestion concrete pour la prochaine session (ex: "15 flashcards semiologie + 1 quiz SWOT")
Sois concis (max 200 mots), encourageant mais honnete. Ne mets pas de emojis.`;

    const result = await sendMessage(
      [{ role: 'user', content: bilanContext }],
      'weakness_analysis'
    );
    setBilan(result);
    setBilanLoading(false);
  }, [data, userId, sendMessage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data && !bilan && !bilanLoading) {
      generateBilan();
    }
  }, [data, bilan, bilanLoading, generateBilan]);

  if (loading) return <LoadingSkeleton />;

  const summary = data?.dailySummary;
  const profile = data?.profile;
  const successRate =
    summary && summary.questionsToday > 0
      ? Math.round((summary.correctToday / summary.questionsToday) * 100)
      : 0;

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Bilan du jour</h1>
            <p className="text-text-muted mt-0.5">
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats du jour */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          icon={CheckCircle2}
          label="Questions"
          value={summary?.questionsToday || 0}
          color="bg-primary/15 text-primary"
          delay={0.1}
        />
        <StatCard
          icon={Target}
          label="Taux de reussite"
          value={`${successRate}%`}
          color="bg-success/15 text-success"
          delay={0.15}
        />
        <StatCard
          icon={Layers}
          label="Flashcards"
          value={summary?.flashcardsToday || 0}
          color="bg-secondary/15 text-secondary"
          delay={0.2}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard
          icon={Clock}
          label="Temps d'etude"
          value={`${summary?.studyMinutes || 0}min`}
          color="bg-warning/15 text-warning"
          delay={0.25}
        />
        <StatCard
          icon={Zap}
          label="XP gagnes"
          value={`+${summary?.xpEarned || 0}`}
          color="bg-primary/15 text-primary"
          delay={0.3}
        />
        <StatCard
          icon={Flame}
          label="Streak"
          value={`${profile?.streak || 0}j`}
          color="bg-danger/15 text-danger"
          delay={0.35}
        />
      </div>

      {/* Barre de progression du jour */}
      {summary && summary.questionsToday > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-bg-card border border-white/5 rounded-xl p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted">Reussite du jour</span>
            <span className="text-xs font-medium">
              {summary.correctToday}/{summary.questionsToday}
            </span>
          </div>
          <div className="h-2.5 bg-bg-hover rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${successRate}%` }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={`h-full rounded-full ${
                successRate >= 70
                  ? 'bg-gradient-to-r from-success to-success/80'
                  : successRate >= 50
                  ? 'bg-gradient-to-r from-warning to-warning/80'
                  : 'bg-gradient-to-r from-danger to-danger/80'
              }`}
            />
          </div>
        </motion.div>
      )}

      {/* Bilan Opus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/15 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Bilan Opus</h2>
          </div>
          <button
            onClick={generateBilan}
            disabled={bilanLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card/50 border border-white/10 text-xs font-medium text-text-muted hover:text-text transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${bilanLoading ? 'animate-spin' : ''}`} />
            Regenerer
          </button>
        </div>

        {bilanLoading ? (
          <div className="flex items-center gap-3 py-8 justify-center">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <span className="text-sm text-text-muted">Opus prepare ton bilan...</span>
          </div>
        ) : bilan ? (
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-text/90">
            {bilan}
          </div>
        ) : (
          <div className="text-center py-6">
            <BookOpen className="w-10 h-10 text-text-muted/30 mx-auto mb-3" />
            <p className="text-sm text-text-muted">
              {summary && summary.questionsToday > 0
                ? 'Bilan en cours de generation...'
                : 'Fais au moins un quiz ou revise des flashcards pour obtenir ton bilan du jour.'}
            </p>
          </div>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        <Link
          href="/analyse"
          className="flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Target className="w-5 h-5" />
          Plan de demain
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/quiz"
          className="flex items-center justify-center gap-2 py-4 rounded-xl bg-bg-card border border-white/10 text-text font-medium hover:bg-bg-hover transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          Continuer a reviser
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
