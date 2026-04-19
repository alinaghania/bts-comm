'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  LayoutDashboard,
  BookOpen,
  Layers,
  CircleHelp,
  FileText,
  Brain,
  ClipboardCheck,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Calendar,
  GraduationCap,
} from 'lucide-react';
import { useUser } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

interface OnboardingProps {
  onComplete: () => void;
}

const pageCards = [
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    description: 'Ton QG ! Streak, XP, progression, raccourcis vers tout.',
    color: 'from-primary to-purple-700',
  },
  {
    icon: BookOpen,
    title: 'Cours',
    description: 'Tous les cours du programme BTS Comm. Lis, comprends, retiens.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: Layers,
    title: 'Flashcards',
    description: 'Revision espacee. Les cartes reviennent quand tu commences a les oublier.',
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    icon: CircleHelp,
    title: 'Quiz',
    description: 'Teste tes connaissances. Mode entrelacement pour mieux retenir.',
    color: 'from-amber-500 to-amber-700',
  },
  {
    icon: FileText,
    title: 'Examens',
    description: 'Simule les conditions reelles. Timer 4h. Prends ta copie en photo, Coline la corrige.',
    color: 'from-rose-500 to-rose-700',
  },
  {
    icon: Brain,
    title: 'Analyse',
    description: 'Coline analyse tes forces, faiblesses, pieges. Plan d\'action personnalise.',
    color: 'from-cyan-500 to-cyan-700',
  },
  {
    icon: ClipboardCheck,
    title: 'Bilan',
    description: 'Apres chaque session, Coline te fait un CR avec conseils pour demain.',
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    icon: Bot,
    title: 'Tuteur IA',
    description: 'Pose n\'importe quelle question a Coline. Elle connait TOUT le programme.',
    color: 'from-violet-500 to-violet-700',
  },
  {
    icon: BarChart3,
    title: 'Stats',
    description: 'Tes performances en graphiques. Prediction de note.',
    color: 'from-pink-500 to-pink-700',
  },
];

const examOptions = [
  { id: 'E1', label: 'E1 - Cultures de la communication' },
  { id: 'E4', label: 'E4 - Strategie de communication' },
  { id: 'E5', label: 'E5 - Portfolio oral' },
];

const levelOptions = [
  { id: 'debutant', label: 'Debutant', description: 'Je debute les revisions' },
  { id: 'intermediaire', label: 'Intermediaire', description: 'J\'ai deja quelques bases' },
  { id: 'avance', label: 'Avance', description: 'Je veux perfectionner' },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const { userId } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Step 2 state
  const [examDate, setExamDate] = useState('2026-06-15');
  const [selectedExams, setSelectedExams] = useState<string[]>(['E1', 'E4', 'E5']);
  const [level, setLevel] = useState('debutant');

  const toggleExam = (examId: string) => {
    setSelectedExams((prev) =>
      prev.includes(examId)
        ? prev.filter((e) => e !== examId)
        : [...prev, examId]
    );
  };

  const saveConfig = useCallback(async () => {
    if (!userId) return;
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'x-user-id': userId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          examDate,
          onboarding_completed: true,
        }),
      });
    } catch (e) {
      console.error('Failed to save onboarding config:', e);
    }
  }, [userId, examDate]);

  const completeOnboarding = useCallback(async () => {
    await saveConfig();
    localStorage.setItem('bts-onboarding-completed', 'true');
    onComplete();
  }, [saveConfig, onComplete]);

  const goToQuiz = useCallback(async () => {
    await saveConfig();
    localStorage.setItem('bts-onboarding-completed', 'true');
    onComplete();
    router.push('/quiz?diagnostic=true');
  }, [saveConfig, onComplete, router]);

  const totalSteps = 4;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-2xl"
      >
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: totalSteps }, (_, i) => (
            <motion.div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step
                  ? 'w-8 bg-primary'
                  : i < step
                  ? 'w-4 bg-primary/50'
                  : 'w-4 bg-bg-hover'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 0: Welcome */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-bg-card border border-white/5 rounded-2xl p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2, damping: 15 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-violet-600 to-secondary mx-auto mb-6 flex items-center justify-center"
              >
                <Bot className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold mb-3"
              >
                Bienvenue sur Projet BTS !
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-text-muted max-w-md mx-auto mb-8"
              >
                Je suis Coline, je suis la pour t&apos;accompagner dans tes revisions du BTS Communication.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(1)}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg flex items-center gap-2 mx-auto"
              >
                C&apos;est parti !
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* STEP 1: Configuration */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-bg-card border border-white/5 rounded-2xl p-8 space-y-6"
            >
              <div className="text-center mb-2">
                <h2 className="text-xl font-bold">Configuration</h2>
                <p className="text-sm text-text-muted mt-1">Personnalisons ton experience</p>
              </div>

              {/* Exam date */}
              <div>
                <label className="text-sm font-medium text-text-muted flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4" />
                  Quelle est ta date d&apos;examen ?
                </label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bg border border-white/10 text-sm text-text focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              {/* Exams */}
              <div>
                <label className="text-sm font-medium text-text-muted flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4" />
                  Quelles epreuves passes-tu ?
                </label>
                <div className="space-y-2">
                  {examOptions.map((exam) => (
                    <button
                      key={exam.id}
                      onClick={() => toggleExam(exam.id)}
                      className={`w-full px-4 py-3 rounded-xl text-sm font-medium text-left transition-all border ${
                        selectedExams.includes(exam.id)
                          ? 'bg-primary/10 border-primary/30 text-primary-light'
                          : 'bg-bg border-white/10 text-text-muted hover:border-white/20'
                      }`}
                    >
                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded mr-3 text-xs ${
                        selectedExams.includes(exam.id)
                          ? 'bg-primary text-white'
                          : 'bg-bg-hover text-text-muted'
                      }`}>
                        {selectedExams.includes(exam.id) ? '\u2713' : ''}
                      </span>
                      {exam.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div>
                <label className="text-sm font-medium text-text-muted flex items-center gap-2 mb-3">
                  <GraduationCap className="w-4 h-4" />
                  Quel est ton niveau actuel ?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {levelOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setLevel(opt.id)}
                      className={`px-3 py-3 rounded-xl text-center transition-all border ${
                        level === opt.id
                          ? 'bg-primary/10 border-primary/30'
                          : 'bg-bg border-white/10 hover:border-white/20'
                      }`}
                    >
                      <p className={`text-sm font-medium ${level === opt.id ? 'text-primary-light' : 'text-text'}`}>
                        {opt.label}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">{opt.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(0)}
                  className="px-4 py-3 rounded-xl bg-bg-hover text-text-muted text-sm font-medium hover:text-text transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Retour
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold flex items-center justify-center gap-2"
                >
                  Continuer <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Tour des pages */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-bg-card border border-white/5 rounded-2xl p-8 space-y-6"
            >
              <div className="text-center mb-2">
                <h2 className="text-xl font-bold">Tour de l&apos;app</h2>
                <p className="text-sm text-text-muted mt-1">Voici tout ce que tu peux faire</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto pr-1">
                {pageCards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-4 rounded-xl bg-bg border border-white/5 hover:border-primary/20 transition-all group cursor-default"
                    >
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-4.5 h-4.5 text-white" />
                      </div>
                      <p className="text-sm font-semibold mb-1">{card.title}</p>
                      <p className="text-xs text-text-muted leading-relaxed">{card.description}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl bg-bg-hover text-text-muted text-sm font-medium hover:text-text transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Retour
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold flex items-center justify-center gap-2"
                >
                  Continuer <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Premier defi */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-bg-card border border-white/5 rounded-2xl p-8 text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2, damping: 15 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 mx-auto flex items-center justify-center"
              >
                <GraduationCap className="w-10 h-10 text-white" />
              </motion.div>

              <div>
                <h2 className="text-xl font-bold mb-2">Pret(e) ?</h2>
                <p className="text-text-muted max-w-md mx-auto">
                  Commence par un quiz de 5 questions pour que je puisse evaluer ton niveau !
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-3 rounded-xl bg-bg-hover text-text-muted text-sm font-medium hover:text-text transition-colors flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Retour
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={goToQuiz}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold flex items-center justify-center gap-2"
                >
                  Commencer le quiz diagnostic
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              <button
                onClick={completeOnboarding}
                className="text-xs text-text-muted hover:text-text transition-colors underline underline-offset-2"
              >
                Passer et aller au dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
