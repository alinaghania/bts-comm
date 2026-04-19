'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  ChevronRight,
  Layers,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Calendar,
  BookOpen,
} from 'lucide-react';
import StreakBadge from '@/components/StreakBadge';
import XPBar from '@/components/XPBar';
import ProgressRing from '@/components/ProgressRing';
import Link from 'next/link';
import { useProgress } from '@/lib/hooks';
import Onboarding from '@/components/Onboarding';
import PageGuide from '@/components/PageGuide';

function LoadingSkeleton() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-pulse">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 w-64 bg-bg-card rounded-lg" />
          <div className="h-4 w-48 bg-bg-card rounded-lg mt-2" />
        </div>
        <div className="w-14 h-14 bg-bg-card rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-20 bg-bg-card rounded-2xl" />
        <div className="h-20 bg-bg-card rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-44 bg-bg-card rounded-2xl" />
        <div className="h-44 bg-bg-card rounded-2xl" />
        <div className="h-44 bg-bg-card rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-36 bg-bg-card rounded-2xl" />
        <div className="h-36 bg-bg-card rounded-2xl" />
        <div className="h-36 bg-bg-card rounded-2xl" />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { progress, loading } = useProgress();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (loading) return;
    const localCompleted = localStorage.getItem('bts-onboarding-completed');
    const isNew =
      !progress.onboarding_completed &&
      progress.totalQuestions === 0 &&
      progress.xp === 0 &&
      !localCompleted;
    setShowOnboarding(isNew);
  }, [loading, progress.onboarding_completed, progress.totalQuestions, progress.xp]);

  if (loading) return <LoadingSkeleton />;

  // Calculate days until exam
  const examDate = new Date(progress.examDate);
  const today = new Date();
  const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const exams = [
    {
      id: 'E1',
      name: 'Cultures de la communication',
      progress: progress.e1Progress,
      color: 'from-primary to-purple-700',
      border: 'border-primary/20',
      icon: BookOpen,
    },
    {
      id: 'E4',
      name: 'Strategie de communication',
      progress: progress.e4Progress,
      color: 'from-secondary to-blue-700',
      border: 'border-secondary/20',
      icon: TrendingUp,
    },
    {
      id: 'E5',
      name: 'Portfolio oral',
      progress: progress.e5Progress,
      color: 'from-emerald-500 to-teal-700',
      border: 'border-success/20',
      icon: Target,
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Onboarding overlay */}
      <AnimatePresence>
        {showOnboarding && (
          <Onboarding onComplete={() => setShowOnboarding(false)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Salut ! Pret a reviser ?{' '}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Flame className="inline w-7 h-7 text-warning" />
            </motion.span>
          </h1>
          <p className="text-text-muted mt-1">
            {progress.xp === 0 && progress.streak === 0
              ? 'Bienvenue ! Lance-toi dans ta premiere revision.'
              : 'Continue comme ca, tu progresses bien !'}
          </p>
        </div>
        <StreakBadge days={progress.streak} size="lg" />
      </motion.div>

      {/* XP + Countdown row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <XPBar level={progress.level} xp={progress.xp} xpToNext={progress.xpToNext} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-bg-card border border-white/5 rounded-2xl p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-danger/15 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-danger" />
          </div>
          <div>
            <p className="text-2xl font-bold">J-{daysUntilExam}</p>
            <p className="text-xs text-text-muted">avant le BTS</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-text-muted">Date d&apos;examen</p>
            <p className="text-sm font-medium">{examDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>
          </div>
        </motion.div>
      </div>

      {/* Exam cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exams.map((exam, i) => {
          const Icon = exam.icon;
          return (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link href="/cours" className="block">
                <div className={`p-5 rounded-2xl bg-bg-card border ${exam.border} hover:border-white/20 transition-all duration-200 group`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${exam.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <ProgressRing percentage={exam.progress} size={48} strokeWidth={4} />
                  </div>
                  <p className="text-xs text-text-muted mb-1">{exam.id}</p>
                  <h3 className="font-semibold text-sm mb-4">{exam.name}</h3>
                  <div className="flex items-center text-xs text-primary font-medium group-hover:gap-2 transition-all">
                    Continuer <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Flashcards due */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/flashcards" className="block">
            <div className="p-5 rounded-2xl bg-bg-card border border-white/5 hover:border-primary/30 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Flashcards a revoir</p>
                  <p className="text-xs text-text-muted">Revision espacee</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-primary">{progress.flashcardsDue}</p>
              <p className="text-xs text-text-muted mt-1">cartes a reviser aujourd&apos;hui</p>
            </div>
          </Link>
        </motion.div>

        {/* Daily challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Link href="/quiz" className="block">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-warning/15 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Defi du jour</p>
                  <p className="text-xs text-text-muted">10 questions mixtes</p>
                </div>
              </div>
              <p className="text-sm text-text-muted">Gagne <span className="text-warning font-bold">+50 XP</span> en completant le defi</p>
              <div className="mt-3 flex items-center text-xs text-primary font-medium">
                Commencer <ChevronRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-5 rounded-2xl bg-bg-card border border-white/5"
        >
          <p className="text-sm font-semibold mb-4">Aujourd&apos;hui</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted flex items-center gap-2">
                <Target className="w-3.5 h-3.5" /> Questions
              </span>
              <span className="text-sm font-bold">{progress.totalQuestions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" /> Precision
              </span>
              <span className="text-sm font-bold text-success">{progress.totalQuestions > 0 ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100) : 0}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> Temps d&apos;etude
              </span>
              <span className="text-sm font-bold">{progress.studyTimeToday} min</span>
            </div>
          </div>
        </motion.div>
      </div>

      <PageGuide page="dashboard" />
    </div>
  );
}
