'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Clock, Award, ChevronRight, ArrowLeft, AlertTriangle, Bot, Lightbulb, CheckCircle, Timer, ClipboardList, Loader2, Camera } from 'lucide-react';
import Link from 'next/link';
import CountdownTimer from '@/components/CountdownTimer';
import ColineHelper from '@/components/ColineHelper';
import PageGuide from '@/components/PageGuide';
import { getAnnalesByExam, type Annale } from '@/lib/annales-data';

interface ExamConfig {
  id: string;
  name: string;
  subtitle: string;
  duration: number; // in seconds
  coefficient: number;
  format: string;
}

const exams: ExamConfig[] = [
  {
    id: 'E1',
    name: 'Cultures de la communication',
    subtitle: 'Epreuve E1',
    duration: 4 * 60 * 60,
    coefficient: 3,
    format: 'Analyse de texte + Analyse de campagne + Production creative',
  },
  {
    id: 'E5',
    name: 'Contribution a l\'elaboration et au pilotage de la strategie de communication',
    subtitle: 'Epreuve E5',
    duration: 4 * 60 * 60,
    coefficient: 5,
    format: 'Etude de cas - Diagnostic, preconisations, plan de communication, droit',
  },
  {
    id: 'E6',
    name: 'Conception et mise en oeuvre de solutions de communication',
    subtitle: 'Epreuve E6',
    duration: 40 * 60,
    coefficient: 4,
    format: 'Oral 40 min - Situation A (portfolio) + Situation B (parcours + fiches)',
  },
];

interface ExamHistory {
  exam: string;
  date: string;
  score: number;
  duration: string;
}

const colineTipsE1 = [
  "Partie 1 (8 pts) : repere bien les positions des auteurs dans le corpus (~30 lignes).",
  "N'oublie pas de citer au moins 2 auteurs/theories dans ta copie (Jakobson, Barthes, Watzlawick...).",
  "Partie 2 (12 pts) : analyse les procedes de la campagne de communication avant de rediger ton message.",
  "Pour la production creative, justifie chaque choix (cible, ton, support, registre de langue).",
  "Relis ta copie 15 minutes avant la fin pour corriger les fautes d'orthographe.",
];

const colineTipsE5 = [
  "Structure ta recommandation : diagnostic (SWOT, veille), preconisations strategiques, plan de communication.",
  "N'oublie pas la composante droit de la communication dans ton analyse.",
  "Pense a chiffrer ton budget : les correcteurs verifient la coherence financiere.",
  "Commence toujours par une analyse SWOT solide integrant les enjeux societaux, reglementaires et technologiques.",
  "Montre que tu maitrises le vocabulaire technique : GRP, CPM, taux de couverture, pilotage...",
];

const colineTipsE6 = [
  "Prepare 3 fiches descriptives d'actions de communication que tu as menees.",
  "Ton tableau synoptique doit montrer la coherence entre tes actions et la strategie globale.",
  "Situation A (10 pts) : evaluation continue via ton portfolio + tableau synoptique.",
  "Situation B (10 pts) : pitch parcours 5 min + echange jury 15 min + approfondissement fiches 20 min.",
  "Anticipe les questions du jury : pourquoi ce choix de support ? Quel etait le budget ? Quels resultats ?",
];

const e6Checklist = [
  { label: '3 fiches descriptives d\'actions de communication', key: 'fiches' },
  { label: 'Tableau synoptique des actions', key: 'tableau' },
  { label: 'Supports visuels (PowerPoint / Keynote)', key: 'supports' },
  { label: 'Annexes (visuels, maquettes, resultats)', key: 'annexes' },
  { label: 'Lettre de mission / attestation de stage', key: 'lettre' },
  { label: 'Relecture et correction orthographique', key: 'relecture' },
];

const e6GrilleEvaluation = [
  { critere: 'Situation A - Evaluation continue (portfolio + tableau synoptique)', points: 10 },
  { critere: 'Situation B - Presentation du parcours (5 min)', points: 5 },
  { critere: 'Situation B - Echange avec le jury (15 min)', points: 5 },
  { critere: 'Situation B - Approfondissement fiches descriptives (20 min)', points: 5 },
  { critere: 'Qualite de la presentation orale et argumentation', points: 5 },
];

function AnnaleSelector({ examId }: { examId: 'E1' | 'E5' }) {
  const exam = examId.toLowerCase() as 'e1' | 'e5';
  const annales = getAnnalesByExam(exam);
  const [selected, setSelected] = useState<Annale | null>(null);

  if (!selected) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-text-muted">Choisis une annale reelle pour t&apos;entrainer :</p>
        <div className="space-y-2">
          {annales.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected(a)}
              className="w-full text-left p-4 rounded-xl bg-bg-hover/50 border border-white/5 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-text-muted mt-1">{a.theme} — Session {a.year}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{selected.title}</h3>
          <p className="text-xs text-text-muted">{selected.theme} — Session {selected.year}</p>
        </div>
        <button onClick={() => setSelected(null)} className="text-xs text-text-muted hover:text-text">
          Changer d&apos;annale
        </button>
      </div>

      {selected.parts.map((part) => (
        <div key={part.id} className="border-t border-white/5 pt-4 space-y-3">
          <p className="text-sm font-medium text-primary">{part.title} ({part.points} points)</p>
          <p className="text-sm text-text-muted leading-relaxed">{part.description}</p>
          {part.documents && part.documents.length > 0 && (
            <div className="text-xs text-text-muted">
              <p className="font-medium">Documents fournis :</p>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {part.documents.map((doc, i) => <li key={i}>{doc}</li>)}
              </ul>
            </div>
          )}
          <div className="space-y-2 mt-2">
            {part.questions.map((q, i) => (
              <p key={q.id} className="text-sm text-text-muted">
                <span className="font-medium text-text">Q{i + 1}.</span> {q.question} <span className="text-xs text-primary">({q.points} pts)</span>
              </p>
            ))}
          </div>
        </div>
      ))}

      {selected.correction && (
        <details className="border-t border-white/5 pt-4">
          <summary className="text-sm font-medium text-warning cursor-pointer">Voir les elements de correction</summary>
          <div className="mt-3 space-y-2 text-sm text-text-muted">
            {selected.correction.keyPoints?.map((p, i) => (
              <p key={i}>- {p}</p>
            ))}
            {selected.correction.commonMistakes && selected.correction.commonMistakes.length > 0 && (
              <div className="mt-2">
                <p className="font-medium text-danger text-xs">Erreurs frequentes :</p>
                {selected.correction.commonMistakes.map((m, i) => (
                  <p key={i} className="text-xs">- {m}</p>
                ))}
              </div>
            )}
          </div>
        </details>
      )}
    </div>
  );
}

type Phase = 'select' | 'exam' | 'e6prep';

export default function ExamensPage() {
  const [phase, setPhase] = useState<Phase>('select');
  const [activeExam, setActiveExam] = useState<ExamConfig | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const [examHistory, setExamHistory] = useState<ExamHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [showColineCoach, setShowColineCoach] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [e6CheckState, setE6CheckState] = useState<Record<string, boolean>>({});
  const [e6OralTimer, setE6OralTimer] = useState(false);

  // Fetch exam history from API
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = localStorage.getItem('bts-user-id') || '';
        const res = await fetch('/api/stats', {
          headers: { 'x-user-id': userId },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.recentActivity?.lastExam || data.totals?.exams > 0) {
            const history: ExamHistory[] = [];
            if (data.recentActivity?.lastExam) {
              const last = data.recentActivity.lastExam;
              history.push({
                exam: last.type?.toUpperCase() || 'E1',
                date: new Date(last.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                score: last.noteOn20 || Math.round((last.percentage / 100) * 20),
                duration: last.timeSeconds ? `${Math.floor(last.timeSeconds / 3600)}h${String(Math.floor((last.timeSeconds % 3600) / 60)).padStart(2, '0')}` : 'N/A',
              });
            }
            setExamHistory(history);
          }
        }
      } catch {
        // Silently fail - history is optional
      } finally {
        setHistoryLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const startExam = (exam: ExamConfig) => {
    setActiveExam(exam);
    setPhase('exam');
    setShowColineCoach(false);
    setCurrentTip(0);
  };

  const getTips = useCallback(() => {
    if (!activeExam) return colineTipsE1;
    if (activeExam.id === 'E5') return colineTipsE5;
    if (activeExam.id === 'E6') return colineTipsE6;
    return colineTipsE1;
  }, [activeExam]);

  const nextTip = () => {
    const tips = getTips();
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        {(phase === 'exam' || phase === 'e6prep') && (
          <button
            onClick={() => { setPhase('select'); setExamStarted(false); setE6OralTimer(false); }}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  </div>

                  <p className="text-xs text-primary font-medium">{exam.subtitle}</p>
                  <h3 className="text-lg font-semibold mt-1">{exam.name}</h3>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Duree : {exam.duration >= 3600 ? `${exam.duration / 3600}h` : `${exam.duration / 60} min`}</span>
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

                  <div className="flex flex-col gap-2 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => startExam(exam)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm flex items-center justify-center gap-2"
                    >
                      Commencer l&apos;epreuve <ChevronRight className="w-4 h-4" />
                    </motion.button>
                    {exam.id === 'E6' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPhase('e6prep')}
                        className="w-full py-2.5 rounded-xl bg-secondary/10 text-secondary font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <ClipboardList className="w-4 h-4" /> Preparer l&apos;oral E6
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Correction card */}
            <Link href="/examens/correction">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 flex items-center gap-4 hover:border-primary/40 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <Camera className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Faire corriger ma copie</h3>
                  <p className="text-sm text-text-muted mt-0.5">
                    Prends ta copie en photo et Coline la corrige comme un vrai jury BTS
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted flex-shrink-0" />
              </motion.div>
            </Link>

            {/* Exam history */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Historique</h2>
              {historyLoading ? (
                <div className="flex items-center gap-2 text-text-muted text-sm py-4">
                  <Loader2 className="w-4 h-4 animate-spin" /> Chargement...
                </div>
              ) : examHistory.length > 0 ? (
                <div className="space-y-3">
                  {examHistory.map((pe, i) => (
                    <motion.div
                      key={i}
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
              ) : (
                <div className="p-6 rounded-xl bg-bg-card border border-white/5 text-center">
                  <p className="text-sm text-text-muted">Aucun examen passe pour l&apos;instant. Lance ta premiere epreuve blanche !</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* E5 ORAL PREP PHASE */}
        {phase === 'e6prep' && (
          <motion.div
            key="e6prep"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-2">Preparer l&apos;oral E6 - Conception et mise en oeuvre de solutions</h2>
              <p className="text-sm text-text-muted mb-6">Tout ce qu&apos;il faut pour reussir ton oral (coeff. 4, 40 min)</p>

              {/* Grille d'evaluation */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" /> Grille d&apos;evaluation officielle
                </h3>
                <div className="space-y-2">
                  {e6GrilleEvaluation.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-bg-hover/50">
                      <span className="text-sm">{item.critere}</span>
                      <span className="text-sm font-bold text-primary">/{item.points}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm font-bold">Total</span>
                    <span className="text-sm font-bold text-primary">/{e6GrilleEvaluation.reduce((s, item) => s + item.points, 0)}</span>
                  </div>
                </div>
              </div>

              {/* Checklist portfolio */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" /> Checklist portfolio
                </h3>
                <div className="space-y-2">
                  {e6Checklist.map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-3 p-3 rounded-lg bg-bg-hover/50 cursor-pointer hover:bg-bg-hover transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={e6CheckState[item.key] || false}
                        onChange={() => setE6CheckState((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary"
                      />
                      <span className={`text-sm ${e6CheckState[item.key] ? 'line-through text-text-muted' : ''}`}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-text-muted mt-2">
                  {Object.values(e6CheckState).filter(Boolean).length}/{e6Checklist.length} elements prepares
                </p>
              </div>

              {/* Conseils de Coline */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-secondary" /> Conseils de Coline pour l&apos;oral
                </h3>
                <div className="space-y-2">
                  {colineTipsE6.map((tip, i) => (
                    <div key={i} className="flex gap-2 p-3 rounded-lg bg-secondary/5 border border-secondary/10">
                      <Lightbulb className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-text/80">{tip}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <ColineHelper
                    context="Je prepare mon oral E6 du BTS Communication (Conception et mise en oeuvre de solutions de communication). Situation A : portfolio + tableau synoptique. Situation B : pitch parcours 5 min + echange jury 15 min + approfondissement fiches descriptives 20 min. Donne-moi des conseils detailles pour reussir."
                    type="exam_tip"
                  />
                </div>
              </div>

              {/* Timer simulation oral */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Timer className="w-4 h-4 text-warning" /> Simulation oral (40 min)
                </h3>
                {!e6OralTimer ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setE6OralTimer(true)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-warning to-orange-500 text-white font-medium text-sm"
                  >
                    Lancer le chronometre oral (40 min)
                  </motion.button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-bg-hover/50 rounded-xl p-4">
                      <CountdownTimer
                        duration={40 * 60}
                        autoStart={true}
                        onComplete={() => alert('Temps ecoule ! Ton oral est termine.')}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <p className="text-xs text-text-muted">Pitch parcours</p>
                        <p className="text-sm font-bold text-primary">5 min</p>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                        <p className="text-xs text-text-muted">Echange jury</p>
                        <p className="text-sm font-bold text-secondary">15 min</p>
                      </div>
                      <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                        <p className="text-xs text-text-muted">Fiches descriptives</p>
                        <p className="text-sm font-bold text-success">20 min</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setE6OralTimer(false)}
                      className="w-full py-2 rounded-xl bg-danger/10 text-danger text-sm hover:bg-danger/20 transition-colors"
                    >
                      Arreter la simulation
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* EXAM PHASE */}
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
                  <p className="text-sm"><span className="text-text-muted">Duree :</span> <span className="font-medium">{activeExam.duration >= 3600 ? `${activeExam.duration / 3600} heures` : `${activeExam.duration / 60} minutes`}</span></p>
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
              <div className="flex gap-6">
                {/* Main exam content */}
                <div className="flex-1 space-y-6">
                  {/* Timer */}
                  <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
                    <CountdownTimer
                      duration={activeExam.duration}
                      autoStart={true}
                      onComplete={() => alert('Temps ecoule !')}
                    />
                  </div>

                  {/* Exam content area — real annales */}
                  <div className="bg-bg-card border border-white/5 rounded-2xl p-8 min-h-[400px]">
                    <h2 className="text-lg font-semibold mb-4">{activeExam.subtitle} - {activeExam.name}</h2>
                    {activeExam.id === 'E6' ? (
                      <div className="bg-bg-hover/50 rounded-xl p-6 space-y-4">
                        <h3 className="font-semibold">Simulation oral E6 - Conception et mise en oeuvre de solutions</h3>
                        <p className="text-sm text-text-muted">Epreuve orale de 40 minutes comprenant 2 situations.</p>
                        <div className="border-t border-white/5 pt-4 space-y-2">
                          <p className="text-sm font-medium">Situation A (10 pts) :</p>
                          <p className="text-sm text-text-muted">Evaluation continue - Portfolio + tableau synoptique</p>
                          <p className="text-sm font-medium mt-3">Situation B (10 pts) - Oral 20 min max :</p>
                          <p className="text-sm text-text-muted">Partie 1 : Presentation du parcours (5 min) + Echange avec jury (15 min)</p>
                          <p className="text-sm text-text-muted">Partie 2 : Approfondissement a partir des 3 fiches descriptives (20 min)</p>
                        </div>
                      </div>
                    ) : (
                      <AnnaleSelector examId={activeExam.id as 'E1' | 'E5'} />
                    )}
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

                {/* Coline Exam Coach panel (desktop) */}
                <div className="hidden lg:block w-72 flex-shrink-0">
                  <div className="sticky top-8 space-y-4">
                    <div className="bg-bg-card border border-white/5 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Coline Coach</p>
                          <p className="text-xs text-text-muted">Conseils d&apos;examen</p>
                        </div>
                      </div>

                      <div className="bg-bg-hover/50 rounded-xl p-3 mb-3">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                          <p className="text-xs leading-relaxed text-text/80">{getTips()[currentTip]}</p>
                        </div>
                      </div>

                      <button
                        onClick={nextTip}
                        className="w-full py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                      >
                        Conseil suivant
                      </button>
                    </div>

                    <ColineHelper
                      context={`Je suis en train de passer l'epreuve ${activeExam.id} (${activeExam.name}) du BTS Communication. Donne-moi un conseil strategique precis et actionnable pour cette epreuve specifique. Format de l'epreuve : ${activeExam.format}. Coefficient : ${activeExam.coefficient}.`}
                      type="exam_tip"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Coline Coach button */}
            {examStarted && (
              <div className="lg:hidden fixed bottom-20 right-4 z-40">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowColineCoach(!showColineCoach)}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
                >
                  <Bot className="w-6 h-6 text-white" />
                </motion.button>

                <AnimatePresence>
                  {showColineCoach && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute bottom-16 right-0 w-72 bg-bg-card border border-white/10 rounded-2xl p-4 shadow-2xl"
                    >
                      <p className="text-sm font-bold mb-2">Conseil de Coline</p>
                      <div className="bg-bg-hover/50 rounded-xl p-3 mb-3">
                        <p className="text-xs leading-relaxed text-text/80">{getTips()[currentTip]}</p>
                      </div>
                      <button
                        onClick={nextTip}
                        className="w-full py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium"
                      >
                        Conseil suivant
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <PageGuide page="examens" />
    </div>
  );
}
