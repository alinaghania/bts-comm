'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Clock, Award, ChevronRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';

interface ExamConfig {
  id: string;
  name: string;
  subtitle: string;
  duration: number; // in seconds
  coefficient: number;
  format: string;
  lastScore: number | null;
}

const exams: ExamConfig[] = [
  {
    id: 'E1',
    name: 'Cultures de la communication',
    subtitle: 'Epreuve E1',
    duration: 4 * 60 * 60,
    coefficient: 3,
    format: 'Dissertation + Synthese de documents',
    lastScore: 14,
  },
  {
    id: 'E4',
    name: 'Relations commerciales',
    subtitle: 'Epreuve E4',
    duration: 4 * 60 * 60,
    coefficient: 4,
    format: 'Etude de cas + Recommandation strategique',
    lastScore: null,
  },
];

interface PastExam {
  id: string;
  exam: string;
  date: string;
  score: number;
  duration: string;
}

const pastExams: PastExam[] = [
  { id: '1', exam: 'E1', date: '12 avril 2026', score: 14, duration: '3h42' },
  { id: '2', exam: 'E1', date: '28 mars 2026', score: 12, duration: '3h55' },
  { id: '3', exam: 'E4', date: '5 avril 2026', score: 11, duration: '3h30' },
];

type Phase = 'select' | 'exam';

export default function ExamensPage() {
  const [phase, setPhase] = useState<Phase>('select');
  const [activeExam, setActiveExam] = useState<ExamConfig | null>(null);
  const [examStarted, setExamStarted] = useState(false);

  const startExam = (exam: ExamConfig) => {
    setActiveExam(exam);
    setPhase('exam');
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        {phase === 'exam' && (
          <button
            onClick={() => { setPhase('select'); setExamStarted(false); }}
            className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
        )}
        <h1 className="text-2xl md:text-3xl font-bold">Mode Examen</h1>
        <p className="text-text-muted mt-1">Simule les conditions reelles d&apos;examen</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {phase === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Exam cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exams.map((exam, i) => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-bg-card border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    {exam.lastScore !== null && (
                      <div className="text-right">
                        <p className="text-xs text-text-muted">Derniere note</p>
                        <p className="text-lg font-bold text-primary">{exam.lastScore}/20</p>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-primary font-medium">{exam.subtitle}</p>
                  <h3 className="text-lg font-semibold mt-1">{exam.name}</h3>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Duree : {exam.duration / 3600}h</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Award className="w-3.5 h-3.5" />
                      <span>Coefficient {exam.coefficient}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{exam.format}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => startExam(exam)}
                    className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm flex items-center justify-center gap-2"
                  >
                    Commencer l&apos;epreuve <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </div>

            {/* Past exams */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Historique</h2>
              <div className="space-y-3">
                {pastExams.map((pe, i) => (
                  <motion.div
                    key={pe.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-white/5"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      pe.score >= 14 ? 'bg-success/15' : pe.score >= 10 ? 'bg-warning/15' : 'bg-danger/15'
                    }`}>
                      <span className={`text-sm font-bold ${
                        pe.score >= 14 ? 'text-success' : pe.score >= 10 ? 'text-warning' : 'text-danger'
                      }`}>
                        {pe.score}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{pe.exam} - {pe.date}</p>
                      <p className="text-xs text-text-muted">Duree : {pe.duration}</p>
                    </div>
                    <span className="text-sm font-bold">{pe.score}/20</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {phase === 'exam' && activeExam && (
          <motion.div
            key="exam"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {!examStarted ? (
              <div className="bg-bg-card border border-white/5 rounded-2xl p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-warning/15 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-8 h-8 text-warning" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{activeExam.subtitle} - {activeExam.name}</h2>
                  <p className="text-text-muted mt-2">Tu es sur le point de commencer une simulation d&apos;examen.</p>
                </div>
                <div className="bg-bg-hover/50 rounded-xl p-4 text-left space-y-2 max-w-md mx-auto">
                  <p className="text-sm"><span className="text-text-muted">Duree :</span> <span className="font-medium">{activeExam.duration / 3600} heures</span></p>
                  <p className="text-sm"><span className="text-text-muted">Format :</span> <span className="font-medium">{activeExam.format}</span></p>
                  <p className="text-sm"><span className="text-text-muted">Coefficient :</span> <span className="font-medium">{activeExam.coefficient}</span></p>
                </div>
                <p className="text-xs text-text-muted">Le chronometre commencera des que tu cliqueras sur le bouton.</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExamStarted(true)}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold"
                >
                  Lancer l&apos;epreuve
                </motion.button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Timer */}
                <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
                  <CountdownTimer
                    duration={activeExam.duration}
                    autoStart={true}
                    onComplete={() => alert('Temps ecoule !')}
                  />
                </div>

                {/* Exam content area */}
                <div className="bg-bg-card border border-white/5 rounded-2xl p-8 min-h-[400px]">
                  <h2 className="text-lg font-semibold mb-4">{activeExam.subtitle} - {activeExam.name}</h2>
                  <div className="bg-bg-hover/50 rounded-xl p-6">
                    {activeExam.id === 'E1' ? (
                      <div className="space-y-4">
                        <h3 className="font-semibold">Sujet : La communication a l&apos;ere du numerique</h3>
                        <p className="text-sm text-text-muted leading-relaxed">
                          A partir du corpus de documents suivant, vous realiserez une synthese (40 points) puis une ecriture personnelle (20 points).
                        </p>
                        <div className="border-t border-white/5 pt-4 space-y-3">
                          <p className="text-sm"><span className="font-medium">Document 1 :</span> <span className="text-text-muted">Dominique Wolton, &quot;Internet et apres ?&quot;, 1999 (extrait)</span></p>
                          <p className="text-sm"><span className="font-medium">Document 2 :</span> <span className="text-text-muted">Sherry Turkle, &quot;Alone Together&quot;, 2011 (extrait traduit)</span></p>
                          <p className="text-sm"><span className="font-medium">Document 3 :</span> <span className="text-text-muted">Infographie INSEE, &quot;Usage des reseaux sociaux en France&quot;, 2024</span></p>
                          <p className="text-sm"><span className="font-medium">Document 4 :</span> <span className="text-text-muted">Article Le Monde, &quot;L\'IA generative transforme la creation de contenu&quot;, 2025</span></p>
                        </div>
                        <div className="mt-6">
                          <p className="text-sm font-medium mb-2">Ecriture personnelle :</p>
                          <p className="text-sm text-text-muted italic">&quot;La communication numerique rapproche-t-elle ou eloigne-t-elle les individus ?&quot;</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="font-semibold">Cas : Lancement de la marque &quot;NaturComm&quot;</h3>
                        <p className="text-sm text-text-muted leading-relaxed">
                          NaturComm est une nouvelle marque de cosmetiques bio qui souhaite se lancer sur le marche francais.
                          Vous etes charge(e) de concevoir sa strategie de communication.
                        </p>
                        <div className="border-t border-white/5 pt-4 space-y-2">
                          <p className="text-sm font-medium">Travail demande :</p>
                          <p className="text-sm text-text-muted">1. Realisez le diagnostic de communication (SWOT)</p>
                          <p className="text-sm text-text-muted">2. Definissez les objectifs et les cibles</p>
                          <p className="text-sm text-text-muted">3. Proposez une strategie creative et un plan media</p>
                          <p className="text-sm text-text-muted">4. Elaborez un budget previsionnel</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setPhase('select'); setExamStarted(false); }}
                  className="w-full py-3 rounded-xl bg-danger/10 text-danger font-medium text-sm hover:bg-danger/20 transition-colors"
                >
                  Terminer l&apos;epreuve
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
