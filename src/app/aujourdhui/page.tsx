'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  Bot,
  Pause,
  Info,
  Sparkles,
  Layers,
  PenLine,
  Send,
} from 'lucide-react';
import { useProgress, useFlashcards, useTutor } from '@/lib/hooks';
import DailyStep from '@/components/DailyStep';
import AuteurCard from '@/components/AuteurCard';
import FlashCard from '@/components/FlashCard';
import TimeSelector from '@/components/TimeSelector';
import WhyThisToday from '@/components/WhyThisToday';
import type { Auteur } from '@/lib/auteurs-data';
import Link from 'next/link';

// ============================================================
// TYPES
// ============================================================

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
    all: Array<{ id: string; label: string; exam: string; score: number; priority: number; lastPracticed?: string }>;
  };
  preview: {
    tomorrow: { competence: string; auteur: string; auteurIdee: string };
  };
  stats: { streak: number; xp: number; level: number; flashcardsDue: number };
  colineSummary?: string;
}

const STEP_ICONS: Record<string, typeof Target> = {
  author_of_day: BookOpen,
  flashcards: RotateCcw,
  targeted_exercise: Target,
  mini_case: FileEdit,
  reflection: BarChart3,
  reactivation: RotateCcw,
  competence_faible: Target,
  exercice_examen: FileEdit,
  bilan: BarChart3,
};

// ============================================================
// LOADING SKELETON
// ============================================================

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
      <div className="h-24 bg-bg-card rounded-2xl" />
      <div className="space-y-3">
        <div className="h-20 bg-bg-card rounded-2xl" />
        <div className="h-20 bg-bg-card rounded-2xl" />
        <div className="h-20 bg-bg-card rounded-2xl" />
        <div className="h-20 bg-bg-card rounded-2xl" />
        <div className="h-20 bg-bg-card rounded-2xl" />
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function AujourdhuiPage() {
  const { progress, loading: progressLoading } = useProgress();
  const { dueToday, rateCard } = useFlashcards();
  const { sendMessage: sendTutor } = useTutor();

  // Phase: 'select_time' | 'show_plan' | 'session' | 'complete'
  const [phase, setPhase] = useState<'select_time' | 'show_plan' | 'session' | 'complete'>('select_time');
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [colineReport, setColineReport] = useState('');
  const [reportLoading, setReportLoading] = useState(false);

  // Check if session already done today
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    const checkExisting = async () => {
      try {
        const userId = localStorage.getItem('bts-user-id') || '';
        const res = await fetch('/api/daily-plan', {
          headers: { 'x-user-id': userId },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.completed) {
            setPlan(data);
            setPhase('complete');
          }
        }
      } catch (e) {
        console.error('Failed to check existing plan:', e);
      } finally {
        setInitialCheckDone(true);
      }
    };
    checkExisting();
  }, []);

  // Exam countdown
  const examDate = new Date(progress.examDate);
  const today = new Date();
  const daysUntilExam = Math.ceil(
    (examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Global session timer
  useEffect(() => {
    if (phase !== 'session' || !sessionStartTime) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, sessionStartTime]);

  // Fetch plan after time selection
  const fetchPlan = useCallback(async (minutes: number) => {
    setPlanLoading(true);
    try {
      const userId = localStorage.getItem('bts-user-id') || '';
      const res = await fetch(`/api/daily-plan?minutes=${minutes}`, {
        headers: { 'x-user-id': userId },
      });
      if (res.ok) {
        const data = await res.json();
        setPlan(data);
        if (data.completed) {
          setPhase('complete');
        } else {
          setPhase('show_plan');
        }
      }
    } catch (e) {
      console.error('Failed to fetch daily plan:', e);
    } finally {
      setPlanLoading(false);
    }
  }, []);

  const handleTimeSelect = (minutes: number) => {
    setSelectedMinutes(minutes);
    fetchPlan(minutes);
  };

  const handleStartSession = () => {
    setPhase('session');
    setSessionStartTime(Date.now());
  };

  const handleStepComplete = useCallback(
    (stepIndex: number) => {
      setCompletedSteps((prev) => [...prev, stepIndex]);
      if (stepIndex < (plan?.steps.length || 0) - 1) {
        setCurrentStep(stepIndex + 1);
      } else {
        setPhase('complete');
        // Fetch Coline report
        fetchColineReport();
      }
    },
    [plan]
  );

  const fetchColineReport = async () => {
    setReportLoading(true);
    try {
      const report = await sendTutor(
        [
          {
            role: 'user',
            content: `Fais un bilan de ma seance d'aujourd'hui. J'ai fait ${completedSteps.length + 1} exercices en ${Math.floor(elapsed / 60)} minutes. Plan: ${plan?.steps.map((s) => s.title).join(', ')}`,
          },
        ],
        'daily_report'
      );
      setColineReport(report);
    } catch {
      setColineReport('Bravo pour cette seance ! Continue comme ca demain.');
    } finally {
      setReportLoading(false);
    }
  };

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

  // Loading states
  if (progressLoading || !initialCheckDone) return <LoadingSkeleton />;

  const totalDuration = plan?.totalDuration || selectedMinutes || 30;

  // ============================================================
  // PHASE: COMPLETE
  // ============================================================
  if (phase === 'complete' && plan) {
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
        <CompactHeader
          streak={progress.streak}
          xp={progress.xp}
          daysUntilExam={daysUntilExam}
        />

        {/* Celebration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="rounded-2xl bg-gradient-to-br from-success/10 to-primary/10 border border-success/20 p-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-4"
          >
            <Check className="w-8 h-8 text-success" />
          </motion.div>
          <h2 className="text-xl font-bold mb-1">Seance terminee</h2>
          <p className="text-sm text-text-muted mb-4">
            {elapsed > 0 ? `${Math.floor(elapsed / 60)} minutes` : `${totalDuration} minutes`} d'entrainement aujourd'hui
          </p>

          {/* XP earned */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 mb-6"
          >
            <Star className="w-4 h-4 text-warning" />
            <span className="text-sm font-bold text-warning">+{totalDuration * 2} XP gagnes</span>
          </motion.div>

          {/* Steps summary */}
          <div className="space-y-2 text-left mb-6">
            {plan.steps.map((step, index) => {
              const Icon = STEP_ICONS[step.type] || Target;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
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
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Coline report */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl bg-bg-card border border-white/5 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Bot className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold">Bilan de Coline</p>
              <p className="text-xs text-text-muted">Analyse de ta seance</p>
            </div>
          </div>
          {reportLoading ? (
            <div className="flex items-center gap-2 text-text-muted py-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Coline analyse ta seance...</span>
            </div>
          ) : (
            <p className="text-sm text-text/80 leading-relaxed whitespace-pre-wrap">
              {colineReport || 'Bravo pour cette seance ! Ta regularite est la cle de la reussite.'}
            </p>
          )}
        </motion.div>

        {/* Preview tomorrow */}
        {plan.preview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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

        {/* Free review CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <Link href="/analyse" className="block">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 transition-all text-center">
              <p className="text-sm font-medium text-primary flex items-center justify-center gap-2">
                Voir l'analyse complete
                <ChevronRight className="w-4 h-4" />
              </p>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/flashcards" className="block">
              <div className="p-4 rounded-2xl bg-bg-card border border-white/5 hover:border-primary/30 transition-all text-center">
                <Layers className="w-5 h-5 text-primary mx-auto mb-2" />
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
          </div>
        </motion.div>
      </div>
    );
  }

  // ============================================================
  // PHASE: SESSION ACTIVE
  // ============================================================
  if (phase === 'session' && plan) {
    const progressPercent = (completedSteps.length / plan.steps.length) * 100;
    const totalSeconds = totalDuration * 60;
    const globalPercent = Math.min(100, (elapsed / totalSeconds) * 100);
    const elapsedMin = Math.floor(elapsed / 60);
    const elapsedSec = elapsed % 60;

    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-4">
        <CompactHeader
          streak={progress.streak}
          xp={progress.xp}
          daysUntilExam={daysUntilExam}
        />

        {/* Global progress bar */}
        <div className="rounded-2xl bg-bg-card border border-white/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-text-muted" />
              <p className="text-sm font-medium">Seance en cours</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xs text-text-muted">
                {completedSteps.length}/{plan.steps.length} etapes
              </p>
              <span className="text-xs font-mono font-bold text-primary">
                {String(elapsedMin).padStart(2, '0')}:{String(elapsedSec).padStart(2, '0')}
              </span>
            </div>
          </div>
          <div className="h-2 bg-bg-hover rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
              animate={{ width: `${globalPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-text-muted">
              {Math.round(progressPercent)}% complete
            </span>
            <span className="text-[10px] text-text-muted">
              {totalDuration} min prevues
            </span>
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
              {step.type === 'author_of_day' && currentStep === index && (
                <div className="space-y-4">
                  <AuteurCard auteur={plan.auteurDuJour} />
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                      Questions de rappel
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm text-text/80">- Quelle est l'idee centrale de cet auteur ?</p>
                      <p className="text-sm text-text/80">- Dans quel type de sujet l'utiliser ?</p>
                      <p className="text-sm text-text/80">- Cite une phrase modele avec cet auteur.</p>
                    </div>
                  </div>
                </div>
              )}

              {step.type === 'flashcards' && currentStep === index && (
                <FlashcardDeck
                  flashcards={dueToday}
                  flashcardIndex={flashcardIndex}
                  onRate={handleFlashcardRate}
                />
              )}

              {step.type === 'targeted_exercise' && currentStep === index && (
                <TargetedExerciseContent
                  competence={plan.competences.weakest}
                />
              )}

              {step.type === 'mini_case' && currentStep === index && (
                <MiniCaseContent
                  exam={String(step.data.exam || 'e5').toUpperCase()}
                  competenceLabel={plan.competences.weakest.label}
                />
              )}

              {step.type === 'reflection' && currentStep === index && (
                <ReflectionContent
                  steps={plan.steps}
                  completedSteps={completedSteps}
                  preview={plan.preview.tomorrow}
                />
              )}

              {/* Legacy step types support */}
              {step.type === 'reactivation' && currentStep === index && (
                <ReactivationContent
                  auteur={plan.auteurDuJour}
                  flashcards={dueToday}
                  flashcardIndex={flashcardIndex}
                  onRate={handleFlashcardRate}
                />
              )}
              {step.type === 'competence_faible' && currentStep === index && (
                <CompetenceContent competence={plan.competences.weakest} />
              )}
              {step.type === 'exercice_examen' && currentStep === index && (
                <ExerciceContent
                  exam={String(step.data.exam || 'e1').toUpperCase()}
                  competenceLabel={plan.competences.weakest.label}
                />
              )}
              {step.type === 'bilan' && currentStep === index && (
                <ReflectionContent
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
  // PHASE: SHOW PLAN
  // ============================================================
  if (phase === 'show_plan' && plan) {
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
        <CompactHeader
          streak={progress.streak}
          xp={progress.xp}
          daysUntilExam={daysUntilExam}
        />

        {/* Coline summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-5"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
              <Bot className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold mb-1">Coline</p>
              <p className="text-sm text-text/80 leading-relaxed">
                {plan.colineSummary ||
                  `Aujourd'hui on travaille ${selectedMinutes} minutes. ${
                    plan.competences?.weakest
                      ? `On consolide ${plan.competences.weakest.exam.toUpperCase()} (${plan.competences.weakest.label}) et `
                      : ''
                  }on decouvre l'auteur du jour.`}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Plan steps */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2.5"
        >
          {plan.steps.map((step, index) => {
            const Icon = STEP_ICONS[step.type] || Target;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.06 }}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-bg-card border border-white/5"
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5 text-primary-light" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{step.title}</p>
                  <p className="text-xs text-text-muted truncate">{step.description}</p>
                </div>
                <span className="text-xs text-text-muted shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {step.duration}m
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Auteur du jour */}
        {plan.auteurDuJour && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AuteurCard auteur={plan.auteurDuJour} compact />
          </motion.div>
        )}

        {/* Why this plan */}
        {plan.competences?.all && plan.competences.all.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <WhyThisToday
              focusSkills={plan.competences.all.slice(0, 3)}
              auteurName={plan.auteurDuJour?.auteur}
            />
          </motion.div>
        )}

        {/* Start session button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleStartSession}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2.5 group shadow-lg shadow-primary/20"
          >
            <Play className="w-5 h-5 ml-0.5" />
            Commencer la seance ({totalDuration} min)
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  // ============================================================
  // PHASE: SELECT TIME (default)
  // ============================================================
  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <CompactHeader
        streak={progress.streak}
        xp={progress.xp}
        daysUntilExam={daysUntilExam}
      />

      {/* Coline greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-3"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold mb-1">Coline</p>
          <div className="rounded-2xl rounded-tl-sm bg-bg-card border border-white/5 p-4">
            <p className="text-sm text-text/90 leading-relaxed">
              Salut ! Combien de temps as-tu aujourd'hui ?
            </p>
            {progress.streak > 0 && (
              <p className="text-xs text-text-muted mt-2">
                {progress.streak} jours de suite, continue comme ca !
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Time selector */}
      {planLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Coline prepare ton plan...</p>
            <p className="text-xs text-text-muted mt-1">
              Adaptation a tes competences en cours
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TimeSelector onSelect={handleTimeSelect} />
        </motion.div>
      )}

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
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

function FlashcardDeck({
  flashcards,
  flashcardIndex,
  onRate,
}: {
  flashcards: Array<{ id: string; question: string; answer: string; exam?: string }>;
  flashcardIndex: number;
  onRate: (quality: number) => void;
}) {
  const cardsToShow = flashcards.slice(0, 7);

  if (cardsToShow.length === 0) {
    return (
      <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
        <Layers className="w-8 h-8 text-primary mx-auto mb-3 opacity-50" />
        <p className="text-sm text-text-muted">Aucune flashcard a revoir aujourd'hui</p>
        <p className="text-xs text-text-muted/60 mt-1">Bravo, tout est a jour !</p>
      </div>
    );
  }

  if (flashcardIndex >= cardsToShow.length) {
    return (
      <div className="p-6 rounded-xl bg-success/5 border border-success/20 text-center">
        <Check className="w-8 h-8 text-success mx-auto mb-3" />
        <p className="text-sm font-medium text-success">7 cartes revisees</p>
        <p className="text-xs text-text-muted mt-1">Tu peux passer a l'etape suivante</p>
      </div>
    );
  }

  const card = cardsToShow[flashcardIndex];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-text-muted">
          Carte {flashcardIndex + 1}/{cardsToShow.length}
        </p>
        <div className="flex gap-1">
          {cardsToShow.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < flashcardIndex ? 'bg-success' : i === flashcardIndex ? 'bg-primary' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
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

function TargetedExerciseContent({
  competence,
}: {
  competence: { id: string; label: string; exam: string; score: number };
}) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
              {competence.exam.toUpperCase()} - Score : {competence.score}%
            </p>
          </div>
        </div>
        <div className="h-2 bg-bg-hover rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              competence.score >= 70 ? 'bg-success' : competence.score >= 40 ? 'bg-warning' : 'bg-danger'
            }`}
            style={{ width: `${competence.score}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-text-muted leading-relaxed">
        Reponds a l'exercice ci-dessous. Coline analysera ta reponse et te donnera un retour personnalise.
      </p>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Ecris ta reponse ici..."
        className="w-full h-32 p-4 rounded-xl bg-bg-hover/50 border border-white/10 text-sm text-text placeholder:text-text-muted/40 resize-none outline-none focus:border-primary/40 transition-colors"
      />

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={!answer.trim()}
          className="w-full py-3 rounded-xl bg-primary/15 hover:bg-primary/25 disabled:opacity-30 text-primary font-medium text-sm transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Envoyer a Coline
        </button>
      ) : (
        <div className="p-4 rounded-xl bg-success/5 border border-success/20">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-4 h-4 text-success" />
            <p className="text-sm font-medium text-success">Reponse envoyee</p>
          </div>
          <p className="text-xs text-text-muted">
            Coline analysera ta reponse dans ton bilan.
          </p>
        </div>
      )}
    </div>
  );
}

function MiniCaseContent({
  exam,
  competenceLabel,
}: {
  exam: string;
  competenceLabel: string;
}) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
        <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center mx-auto mb-3">
          <FileEdit className="w-6 h-6 text-secondary" />
        </div>
        <p className="text-sm font-semibold mb-1">Mini-cas type {exam}</p>
        <p className="text-xs text-text-muted">{competenceLabel}</p>
      </div>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
          Brief
        </p>
        <p className="text-sm text-text/80 leading-relaxed">
          Mets-toi en conditions d'examen. Analyse le sujet et redige une reponse
          structuree en utilisant les auteurs et concepts vus en cours.
        </p>
      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Ta reponse..."
        className="w-full h-40 p-4 rounded-xl bg-bg-hover/50 border border-white/10 text-sm text-text placeholder:text-text-muted/40 resize-none outline-none focus:border-secondary/40 transition-colors"
      />

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={!answer.trim()}
          className="w-full py-3 rounded-xl bg-secondary/15 hover:bg-secondary/25 disabled:opacity-30 text-secondary font-medium text-sm transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Soumettre le mini-cas
        </button>
      ) : (
        <div className="p-4 rounded-xl bg-success/5 border border-success/20">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-4 h-4 text-success" />
            <p className="text-sm font-medium text-success">Mini-cas soumis</p>
          </div>
          <p className="text-xs text-text-muted">
            Tu retrouveras le retour de Coline dans ton bilan de seance.
          </p>
        </div>
      )}

      <Link href="/examens" className="block">
        <div className="p-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 transition-all text-center">
          <p className="text-sm font-medium text-primary flex items-center justify-center gap-2">
            Voir les sujets complets
            <ChevronRight className="w-4 h-4" />
          </p>
        </div>
      </Link>
    </div>
  );
}

function ReflectionContent({
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
              <span className="text-xs text-text-muted ml-auto">{step.duration} min</span>
            </div>
          ))}
        </div>
      </div>

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
          <p className="text-xs text-text-muted mt-1 italic">{preview.auteurIdee}</p>
        </div>
      </div>
    </div>
  );
}

// Legacy support components

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
        <p className="text-xs text-text-muted">Puis : auteur du jour</p>
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
              {competence.exam.toUpperCase()} - Score : {competence.score}%
            </p>
          </div>
        </div>
        <div className="h-2 bg-bg-hover rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              competence.score >= 70 ? 'bg-success' : competence.score >= 40 ? 'bg-warning' : 'bg-danger'
            }`}
            style={{ width: `${competence.score}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-text-muted leading-relaxed">
        Concentre-toi sur cette competence. Relis tes cours,
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
        <p className="text-sm font-semibold mb-1">Exercice type {exam}</p>
        <p className="text-xs text-text-muted">{competenceLabel}</p>
      </div>

      <p className="text-sm text-text-muted leading-relaxed">
        Exercice chronometre. Mets-toi en conditions d'examen :
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
