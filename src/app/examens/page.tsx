'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Clock, Award, ChevronRight, ArrowLeft, AlertTriangle, Bot, Lightbulb, CheckCircle, Timer, ClipboardList, Loader2, Camera } from 'lucide-react';
import Link from 'next/link';
import CountdownTimer from '@/components/CountdownTimer';
import ColineHelper from '@/components/ColineHelper';
import PageGuide from '@/components/PageGuide';

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
    format: 'Dissertation + Synthese de documents',
  },
  {
    id: 'E4',
    name: 'Strategie de communication',
    subtitle: 'Epreuve E4',
    duration: 4 * 60 * 60,
    coefficient: 5,
    format: 'Etude de cas + Recommandation strategique',
  },
  {
    id: 'E5',
    name: 'Portfolio oral',
    subtitle: 'Epreuve E5',
    duration: 40 * 60,
    coefficient: 4,
    format: 'Presentation du portfolio + Entretien',
  },
];

interface ExamHistory {
  exam: string;
  date: string;
  score: number;
  duration: string;
}

const colineTipsE1 = [
  "Pense a structurer ta dissertation en 2 ou 3 parties equilibrees.",
  "N'oublie pas de citer au moins 2 auteurs/theories dans ta copie (Jakobson, Barthes, Watzlawick...).",
  "Pour la synthese, confronte les documents entre eux plutot que de les resumer un par un.",
  "Gere ton temps : 2h pour la synthese, 2h pour l'ecriture personnelle.",
  "Relis ta copie 15 minutes avant la fin pour corriger les fautes d'orthographe.",
];

const colineTipsE4 = [
  "Structure ta recommandation : diagnostic, objectifs, cible, strategie, moyens, budget.",
  "N'oublie pas de citer des exemples concrets de campagnes existantes pour appuyer ton propos.",
  "Pense a chiffrer ton budget : les correcteurs verifient la coherence financiere.",
  "Commence toujours par une analyse SWOT solide avant de proposer des solutions.",
  "Montre que tu maitrises le vocabulaire technique : GRP, CPM, taux de couverture...",
];

const colineTipsE5 = [
  "Prepare 3 fiches descriptives d'actions de communication que tu as menees.",
  "Ton tableau synoptique doit montrer la coherence entre tes actions et la strategie globale.",
  "Lors de l'oral, regarde le jury, parle fort et structure ta presentation avec une intro/conclusion.",
  "Prevois 20 min de presentation + 20 min de questions. Gere bien ton temps.",
  "Anticipe les questions du jury : pourquoi ce choix de support ? Quel etait le budget ? Quels resultats ?",
];

const e5Checklist = [
  { label: '3 fiches descriptives d\'actions de communication', key: 'fiches' },
  { label: 'Tableau synoptique des actions', key: 'tableau' },
  { label: 'Supports visuels (PowerPoint / Keynote)', key: 'supports' },
  { label: 'Annexes (visuels, maquettes, resultats)', key: 'annexes' },
  { label: 'Lettre de mission / attestation de stage', key: 'lettre' },
  { label: 'Relecture et correction orthographique', key: 'relecture' },
];

const e5GrilleEvaluation = [
  { critere: 'Analyse de la situation de communication', points: 8 },
  { critere: 'Pertinence des choix strategiques', points: 6 },
  { critere: 'Qualite des productions realisees', points: 6 },
  { critere: 'Maitrise des outils et techniques', points: 4 },
  { critere: 'Qualite de la presentation orale', points: 4 },
  { critere: 'Capacite a argumenter et repondre aux questions', points: 4 },
];

type Phase = 'select' | 'exam' | 'e5prep';

export default function ExamensPage() {
  const [phase, setPhase] = useState<Phase>('select');
  const [activeExam, setActiveExam] = useState<ExamConfig | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const [examHistory, setExamHistory] = useState<ExamHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [showColineCoach, setShowOpusCoach] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [e5CheckState, setE5CheckState] = useState<Record<string, boolean>>({});
  const [e5OralTimer, setE5OralTimer] = useState(false);

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
    setShowOpusCoach(false);
    setCurrentTip(0);
  };

  const getTips = useCallback(() => {
    if (!activeExam) return colineTipsE1;
    if (activeExam.id === 'E4') return colineTipsE4;
    if (activeExam.id === 'E5') return colineTipsE5;
    return colineTipsE1;
  }, [activeExam]);

  const nextTip = () => {
    const tips = getTips();
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        {(phase === 'exam' || phase === 'e5prep') && (
          <button
            onClick={() => { setPhase('select'); setExamStarted(false); setE5OralTimer(false); }}
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
                    {exam.id === 'E5' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPhase('e5prep')}
                        className="w-full py-2.5 rounded-xl bg-secondary/10 text-secondary font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <ClipboardList className="w-4 h-4" /> Preparer l&apos;oral E5
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
        {phase === 'e5prep' && (
          <motion.div
            key="e5prep"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-2">Preparer l&apos;oral E5 - Portfolio</h2>
              <p className="text-sm text-text-muted mb-6">Tout ce qu&apos;il faut pour reussir ton oral (coeff. 4)</p>

              {/* Grille d'evaluation */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" /> Grille d&apos;evaluation officielle
                </h3>
                <div className="space-y-2">
                  {e5GrilleEvaluation.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-bg-hover/50">
                      <span className="text-sm">{item.critere}</span>
                      <span className="text-sm font-bold text-primary">/{item.points}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-sm font-bold">Total</span>
                    <span className="text-sm font-bold text-primary">/{e5GrilleEvaluation.reduce((s, item) => s + item.points, 0)}</span>
                  </div>
                </div>
              </div>

              {/* Checklist portfolio */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" /> Checklist portfolio
                </h3>
                <div className="space-y-2">
                  {e5Checklist.map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-3 p-3 rounded-lg bg-bg-hover/50 cursor-pointer hover:bg-bg-hover transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={e5CheckState[item.key] || false}
                        onChange={() => setE5CheckState((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className="w-4 h-4 rounded border-white/20 text-primary focus:ring-primary"
                      />
                      <span className={`text-sm ${e5CheckState[item.key] ? 'line-through text-text-muted' : ''}`}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-text-muted mt-2">
                  {Object.values(e5CheckState).filter(Boolean).length}/{e5Checklist.length} elements prepares
                </p>
              </div>

              {/* Conseils d'Opus */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-secondary" /> Conseils de Coline pour l&apos;oral
                </h3>
                <div className="space-y-2">
                  {colineTipsE5.map((tip, i) => (
                    <div key={i} className="flex gap-2 p-3 rounded-lg bg-secondary/5 border border-secondary/10">
                      <Lightbulb className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-text/80">{tip}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <ColineHelper
                    context="Je prepare mon oral E5 du BTS Communication. Donne-moi des conseils detailles pour reussir ma presentation du portfolio : comment structurer ma presentation de 20 minutes, comment presenter mes 3 fiches descriptives de maniere captivante, et comment anticiper les questions du jury."
                    type="exam_tip"
                  />
                </div>
              </div>

              {/* Timer simulation oral */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Timer className="w-4 h-4 text-warning" /> Simulation oral (40 min)
                </h3>
                {!e5OralTimer ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setE5OralTimer(true)}
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
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <p className="text-xs text-text-muted">Presentation</p>
                        <p className="text-sm font-bold text-primary">20 min</p>
                      </div>
                      <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                        <p className="text-xs text-text-muted">Questions jury</p>
                        <p className="text-sm font-bold text-secondary">20 min</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setE5OralTimer(false)}
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
                            <p className="text-sm"><span className="font-medium">Document 4 :</span> <span className="text-text-muted">Article Le Monde, &quot;L&apos;IA generative transforme la creation de contenu&quot;, 2025</span></p>
                          </div>
                          <div className="mt-6">
                            <p className="text-sm font-medium mb-2">Ecriture personnelle :</p>
                            <p className="text-sm text-text-muted italic">&quot;La communication numerique rapproche-t-elle ou eloigne-t-elle les individus ?&quot;</p>
                          </div>
                        </div>
                      ) : activeExam.id === 'E4' ? (
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
                      ) : (
                        <div className="space-y-4">
                          <h3 className="font-semibold">Simulation oral E5 - Portfolio</h3>
                          <p className="text-sm text-text-muted leading-relaxed">
                            Presentez votre portfolio comprenant vos 3 fiches descriptives d&apos;actions de communication.
                          </p>
                          <div className="border-t border-white/5 pt-4 space-y-2">
                            <p className="text-sm font-medium">Deroulement :</p>
                            <p className="text-sm text-text-muted">1. Presentation du candidat et du contexte professionnel (5 min)</p>
                            <p className="text-sm text-text-muted">2. Presentation des 3 actions de communication (15 min)</p>
                            <p className="text-sm text-text-muted">3. Entretien avec le jury (20 min)</p>
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
                  onClick={() => setShowOpusCoach(!showColineCoach)}
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
