'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  Zap,
  Calendar,
  Play,
  RotateCcw,
  BookOpen,
  Target,
  FileEdit,
  BarChart3,
  Check,
  ChevronRight,
  Loader2,
  ArrowRight,
  Clock,
  Star,
} from 'lucide-react';
import { useProgress, useFlashcards } from '@/lib/hooks';
import DailyStep from '@/components/DailyStep';
import AuteurCard from '@/components/AuteurCard';
import FlashCard from '@/components/FlashCard';
import type { Auteur } from '@/lib/auteurs-data';
import Link from 'next/link';

interface DailyPlanStep {
  id: number;
  type: string;
  title: string;
  duration: number;
  description: string;
  data: Record<string, unknown>;
}

interface DailyPlan {
  date: string;
  completed: boolean;
  totalDuration: number;
  steps: DailyPlanStep[];
  auteurDuJour: Auteur;
  competences: {
    weakest: { id: string; label: string; exam: string; score: number };
    all: Array<{ id: string; label: string; exam: string; score: number; priority: number }>;
  };
  preview: {
    tomorrow: { competence: string; auteur: string; auteurIdee: string };
  };
  stats: { streak: number; xp: number; level: number; flashcardsDue: number };
}

// Step icons mapping
const STEP_ICONS = [RotateCcw, Target, FileEdit, BarChart3];

function LoadingSkeleton() {
  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-6 w-40 bg-bg-card rounded-lg" />
        <div className="flex gap-3">
          <div className="h-8 w-20 bg-bg-card rounded-lg" />
          <div className="h-8 w-20 bg-bg-card rounded-lg" />
        </div>
      </div>
      <div className="h-48 bg-bg-card rounded-2xl" />
      <div className="space-y-3">
        <div className="h-16 bg-bg-card rounded-2xl" />
        <div className="h-16 bg-bg-card rounded-2xl" />
        <div className="h-16 bg-bg-card rounded-2xl" />
        <div className="h-16 bg-bg-card rounded-2xl" />
      </div>
    </div>
  );
}

export default function AujourdhuiPage() {
  const { progress, loading: progressLoading } = useProgress();
  const { dueToday, rateCard } = useFlashcards();
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [planLoading, setPlanLoading] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  // Fetch daily plan
  const fetchPlan = useCallback(async () => {
    try {
      const userId = localStorage.getItem('bts-user-id') || '';
      const res = await fetch('/api/daily-plan', {
        headers: { 'x-user-id': userId },
      });
      if (res.ok) {
        const data = await res.json();
        setPlan(data);
        if (data.completed) {
          setSessionComplete(true);
        }
      }
    } catch (e) {
      console.error('Failed to fetch daily plan:', e);
    } finally {
      setPlanLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  // Calculate days until exam
  const examDate = new Date(progress.examDate);
  const today = new Date();
  const daysUntilExam = Math.ceil(
    (examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleStepComplete = useCallback(
    (stepIndex: number) => {
      setCompletedSteps((prev) => [...prev, stepIndex]);
      if (stepIndex < (plan?.steps.length || 4) - 1) {
        setCurrentStep(stepIndex + 1);
      } else {
        setSessionComplete(true);
      }
    },
    [plan]
  );

  const handleFlashcardRate = useCallback(
    async (quality: number) => {
      const cards = dueToday;
      if (flashcardIndex < cards.length) {
        await rateCard(cards[flashcardIndex].id, quality);
        setFlashcardIndex((prev) => prev + 1);
      }
    },
    [dueToday, flashcardIndex, rateCard]
  );

  if (progressLoading || planLoading) return <LoadingSkeleton />;

  const totalDuration = plan?.totalDuration || 42;

  // ============================================================
  // SESSION COMPLETE VIEW
  // ============================================================
  if (sessionComplete) {
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
        {/* Header compact */}
        <CompactHeader
          streak={progress.streak}
          xp={progress.xp}
          daysUntilExam={daysUntilExam}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-gradient-to-br from-success/10 to-primary/10 border border-success/20 p-6 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-xl font-bold mb-1">Seance terminee</h2>
          <p className="text-sm text-text-muted mb-4">
            {totalDuration} minutes d'entrainement aujourd'hui
          </p>

          {/* XP earned */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 mb-6">
            <Star className="w-4 h-4 text-warning" />
            <span className="text-sm font-bold text-warning">+{totalDuration * 2} XP gagnes</span>
          </div>

          {/* Steps summary */}
          <div className="space-y-2 text-left mb-6">
            {plan?.steps.map((step) => {
              const Icon = STEP_ICONS[step.id - 1] || Target;
              return (
                <div
                  key={step.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                >
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-text-muted">{step.duration} min</p>
                  </div>
                  <Check className="w-4 h-4 text-success" />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Preview tomorrow */}
        {plan?.preview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-bg-card border border-white/5 p-5"
          >
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
              Au programme demain
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm">{plan.preview.tomorrow.competence}</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-secondary" />
                <span className="text-sm">
                  Auteur : {plan.preview.tomorrow.auteur}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Free review CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          <Link href="/flashcards" className="block">
            <div className="p-4 rounded-2xl bg-bg-card border border-white/5 hover:border-primary/30 transition-all text-center">
              <RotateCcw className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Flashcards</p>
              <p className="text-xs text-text-muted">{progress.flashcardsDue} a revoir</p>
            </div>
          </Link>
          <Link href="/quiz" className="block">
            <div className="p-4 rounded-2xl bg-bg-card border border-white/5 hover:border-secondary/30 transition-all text-center">
              <Zap className="w-5 h-5 text-secondary mx-auto mb-2" />
              <p className="text-sm font-medium">Quiz libre</p>
              <p className="text-xs text-text-muted">Reviser librement</p>
            </div>
          </Link>
        </motion.div>
      </div>
    );
  }

  // ============================================================
  // SESSION IN PROGRESS
  // ============================================================
  if (sessionStarted && plan) {
    const progressPercent = ((completedSteps.length) / plan.steps.length) * 100;

    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-4">
        {/* Compact header */}
        <CompactHeader
          streak={progress.streak}
          xp={progress.xp}
          daysUntilExam={daysUntilExam}
        />

        {/* Global progress */}
        <div className="rounded-2xl bg-bg-card border border-white/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Progression de la seance</p>
            <p className="text-xs text-text-muted">
              {completedSteps.length}/{plan.steps.length} etapes
            </p>
          </div>
          <div className="h-2 bg-bg-hover rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {plan.steps.map((step, index) => (
            <DailyStep
              key={step.id}
              stepNumber={step.id}
              totalSteps={plan.steps.length}
              title={step.title}
              duration={step.duration}
              active={currentStep === index}
              onComplete={() => handleStepComplete(index)}
            >
              {/* Step-specific content */}
              {step.type === 'reactivation' && currentStep === index && (
                <ReactivationContent
                  auteur={plan.auteurDuJour}
                  flashcards={dueToday}
                  flashcardIndex={flashcardIndex}
                  onRate={handleFlashcardRate}
                />
              )}
              {step.type === 'competence_faible' && currentStep === index && (
                <CompetenceContent
                  competence={plan.competences.weakest}
                />
              )}
              {step.type === 'exercice_examen' && currentStep === index && (
                <ExerciceContent
                  exam={String(step.data.exam || 'e1').toUpperCase()}
                  competenceLabel={plan.competences.weakest.label}
                />
              )}
              {step.type === 'bilan' && currentStep === index && (
                <BilanContent
                  steps={plan.steps}
                  completedSteps={completedSteps}
                  preview={plan.preview.tomorrow}
                />
              )}
            </DailyStep>
          ))}
        </div>
      </div>
    );
  }

  // ============================================================
  // PRE-SESSION (default view)
  // ============================================================
  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      {/* Header compact */}
      <CompactHeader
        streak={progress.streak}
        xp={progress.xp}
        daysUntilExam={daysUntilExam}
      />

      {/* Big CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/20 p-6"
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4"
          >
            <Play className="w-7 h-7 text-white ml-0.5" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-1">Ta seance du jour</h1>
          <p className="text-sm text-text-muted">
            {totalDuration} minutes pour progresser
          </p>
        </div>

        {/* Steps preview */}
        <div className="space-y-2.5 mb-6">
          {(plan?.steps || []).map((step) => {
            const Icon = STEP_ICONS[step.id - 1] || Target;
            return (
              <div
                key={step.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5 text-primary-light" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{step.title}</p>
                  <p className="text-xs text-text-muted truncate">
                    {step.description}
                  </p>
                </div>
                <span className="text-xs text-text-muted shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {step.duration}m
                </span>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setSessionStarted(true)}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
        >
          Commencer ma seance du jour ({totalDuration} min)
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </motion.div>

      {/* Auteur du jour preview */}
      {plan?.auteurDuJour && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AuteurCard auteur={plan.auteurDuJour} compact />
        </motion.div>
      )}

      {/* Competence faible preview */}
      {plan?.competences?.weakest && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-bg-card border border-white/5 p-4"
        >
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
            Competence a travailler
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-danger" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">
                {plan.competences.weakest.label}
              </p>
              <p className="text-xs text-text-muted">
                {plan.competences.weakest.exam.toUpperCase()} — Score actuel : {plan.competences.weakest.score}%
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick stats row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-3 gap-3"
      >
        <div className="rounded-xl bg-bg-card border border-white/5 p-3 text-center">
          <p className="text-lg font-bold text-primary">{progress.flashcardsDue}</p>
          <p className="text-[10px] text-text-muted">Flashcards dues</p>
        </div>
        <div className="rounded-xl bg-bg-card border border-white/5 p-3 text-center">
          <p className="text-lg font-bold text-secondary">{progress.totalQuestions}</p>
          <p className="text-[10px] text-text-muted">Questions</p>
        </div>
        <div className="rounded-xl bg-bg-card border border-white/5 p-3 text-center">
          <p className="text-lg font-bold text-success">
            {progress.totalQuestions > 0
              ? Math.round((progress.correctAnswers / progress.totalQuestions) * 100)
              : 0}%
          </p>
          <p className="text-[10px] text-text-muted">Precision</p>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

function CompactHeader({
  streak,
  xp,
  daysUntilExam,
}: {
  streak: number;
  xp: number;
  daysUntilExam: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-warning/10 border border-warning/20">
          <Flame className="w-3.5 h-3.5 text-warning" />
          <span className="text-xs font-bold text-warning">{streak}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-bold text-primary">{xp} XP</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-danger/10 border border-danger/20">
        <Calendar className="w-3.5 h-3.5 text-danger" />
        <span className="text-xs font-bold text-danger">J-{daysUntilExam}</span>
      </div>
    </motion.div>
  );
}

function ReactivationContent({
  auteur,
  flashcards,
  flashcardIndex,
  onRate,
}: {
  auteur: Auteur;
  flashcards: Array<{ id: string; question: string; answer: string; exam?: string }>;
  flashcardIndex: number;
  onRate: (quality: number) => void;
}) {
  const cardsToShow = flashcards.slice(0, 7);
  const showAuteur = flashcardIndex >= cardsToShow.length;

  if (showAuteur || cardsToShow.length === 0) {
    return <AuteurCard auteur={auteur} />;
  }

  const card = cardsToShow[flashcardIndex];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-text-muted">
          Carte {flashcardIndex + 1}/{cardsToShow.length}
        </p>
        <p className="text-xs text-text-muted">
          Puis : auteur du jour
        </p>
      </div>
      {card && (
        <FlashCard
          question={card.question}
          answer={card.answer}
          exam={card.exam}
          onRate={onRate}
        />
      )}
    </div>
  );
}

function CompetenceContent({
  competence,
}: {
  competence: { id: string; label: string; exam: string; score: number };
}) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-danger" />
          </div>
          <div>
            <p className="text-sm font-semibold">{competence.label}</p>
            <p className="text-xs text-text-muted">
              {competence.exam.toUpperCase()} — Score : {competence.score}%
            </p>
          </div>
        </div>

        {/* Score bar */}
        <div className="h-2 bg-bg-hover rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              competence.score >= 70
                ? 'bg-success'
                : competence.score >= 40
                  ? 'bg-warning'
                  : 'bg-danger'
            }`}
            style={{ width: `${competence.score}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-text-muted leading-relaxed">
        Concentre-toi sur cette competence pendant 12 minutes. Relis tes cours,
        revois les notions cles et essaie de reformuler les concepts avec tes propres mots.
      </p>

      <div className="grid grid-cols-2 gap-2">
        <Link href="/cours" className="block">
          <div className="p-3 rounded-xl bg-primary/10 hover:bg-primary/15 transition-colors text-center">
            <BookOpen className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs font-medium text-primary">Revoir le cours</p>
          </div>
        </Link>
        <Link href="/quiz" className="block">
          <div className="p-3 rounded-xl bg-secondary/10 hover:bg-secondary/15 transition-colors text-center">
            <Zap className="w-4 h-4 text-secondary mx-auto mb-1" />
            <p className="text-xs font-medium text-secondary">Quiz cible</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

function ExerciceContent({
  exam,
  competenceLabel,
}: {
  exam: string;
  competenceLabel: string;
}) {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
        <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center mx-auto mb-3">
          <FileEdit className="w-6 h-6 text-secondary" />
        </div>
        <p className="text-sm font-semibold mb-1">
          Exercice type {exam}
        </p>
        <p className="text-xs text-text-muted">
          {competenceLabel}
        </p>
      </div>

      <p className="text-sm text-text-muted leading-relaxed">
        Exercice chronometre de 15 minutes. Mets-toi en conditions d'examen :
        pas de cours, pas d'aide. Redige ta reponse comme si tu etais le jour J.
      </p>

      <Link href="/examens" className="block">
        <div className="p-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 transition-all text-center">
          <p className="text-sm font-medium text-primary flex items-center justify-center gap-2">
            Lancer l'exercice
            <ChevronRight className="w-4 h-4" />
          </p>
        </div>
      </Link>
    </div>
  );
}

function BilanContent({
  steps,
  completedSteps,
  preview,
}: {
  steps: DailyPlanStep[];
  completedSteps: number[];
  preview: { competence: string; auteur: string; auteurIdee: string };
}) {
  return (
    <div className="space-y-4">
      {/* Session summary */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
          Resume de la seance
        </p>
        <div className="space-y-2">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-2">
              {completedSteps.includes(step.id - 1) ? (
                <Check className="w-3.5 h-3.5 text-success" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-text-muted/30" />
              )}
              <span className="text-sm">{step.title}</span>
              <span className="text-xs text-text-muted ml-auto">
                {step.duration} min
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tomorrow preview */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
          Demain au programme
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm">{preview.competence}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-secondary" />
            <span className="text-sm">{preview.auteur}</span>
          </div>
          <p className="text-xs text-text-muted mt-1 italic">
            {preview.auteurIdee}
          </p>
        </div>
      </div>
    </div>
  );
}
