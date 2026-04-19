'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Send,
  FileText,
  Award,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  Loader2,
  ChevronDown,
  ChevronUp,
  Target,
  Pen,
  LayoutList,
  Dumbbell,
  Star,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import PhotoUpload from '@/components/PhotoUpload';

interface GrilleItem {
  critere: string;
  maxPoints: number;
  note: number;
  commentaire: string;
}

interface PointFaible {
  probleme: string;
  exemple: string;
  conseil: string;
}

interface Exercise {
  type: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface CorrectionResult {
  note: number;
  grille: GrilleItem[];
  pointsForts: string[];
  pointsFaibles: PointFaible[];
  structureAnalysis: string;
  suggestedExercises: Exercise[];
  overallFeedback: string;
  parseError?: boolean;
}

type ExamType = 'E1' | 'E1_PARTIE1' | 'E1_PARTIE2' | 'E4';

const examOptions: { value: ExamType; label: string; description: string }[] = [
  { value: 'E1', label: 'E1 - Cultures de la communication', description: '4h, coef 3 - Copie complete' },
  { value: 'E1_PARTIE1', label: 'E1 - Partie 1 : Analyse de texte', description: '4h, coef 3 - Analyse uniquement' },
  { value: 'E1_PARTIE2', label: 'E1 - Partie 2 : Production', description: '4h, coef 3 - Production uniquement' },
  { value: 'E4', label: 'E4 - Strategie de communication', description: '4h, coef 5' },
];

const grillesOfficielle: Record<string, { critere: string; maxPoints: number }[]> = {
  E1: [
    { critere: 'Comprehension du texte', maxPoints: 4 },
    { critere: "Qualite de l'argumentation", maxPoints: 4 },
    { critere: 'Analyse des procedes de la campagne', maxPoints: 6 },
    { critere: 'Production creative', maxPoints: 6 },
  ],
  E1_PARTIE1: [
    { critere: 'Comprehension du texte', maxPoints: 4 },
    { critere: "Qualite de l'argumentation", maxPoints: 4 },
    { critere: 'Analyse des procedes de la campagne', maxPoints: 6 },
    { critere: 'Production creative', maxPoints: 6 },
  ],
  E1_PARTIE2: [
    { critere: 'Comprehension du texte', maxPoints: 4 },
    { critere: "Qualite de l'argumentation", maxPoints: 4 },
    { critere: 'Analyse des procedes de la campagne', maxPoints: 6 },
    { critere: 'Production creative', maxPoints: 6 },
  ],
  E4: [
    { critere: 'Diagnostic de communication', maxPoints: 5 },
    { critere: 'Definition objectifs et cibles', maxPoints: 4 },
    { critere: 'Recommandation strategique', maxPoints: 6 },
    { critere: 'Plan de communication et budget', maxPoints: 5 },
  ],
};

function getNoteColor(note: number, max: number): string {
  const ratio = note / max;
  if (ratio >= 0.7) return 'text-success';
  if (ratio >= 0.5) return 'text-warning';
  return 'text-danger';
}

function getDifficultyLabel(d: string): { label: string; color: string } {
  if (d === 'easy') return { label: 'Facile', color: 'bg-success/10 text-success' };
  if (d === 'medium') return { label: 'Moyen', color: 'bg-warning/10 text-warning' };
  return { label: 'Difficile', color: 'bg-danger/10 text-danger' };
}

export default function CorrectionPage() {
  const [images, setImages] = useState<string[]>([]);
  const [examType, setExamType] = useState<ExamType>('E1');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CorrectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    grille: true,
    forts: true,
    faibles: true,
    structure: true,
    exercices: true,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async () => {
    if (images.length === 0) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const userId = localStorage.getItem('bts-user-id') || '';
      const res = await fetch('/api/correction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({ images, examType }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Erreur lors de la correction');
      }

      const data: CorrectionResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const resetCorrection = () => {
    setResult(null);
    setImages([]);
    setError(null);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          href="/examens"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Retour aux examens
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">Correction de copie par Coline</h1>
        <p className="text-text-muted mt-1">
          Prends ta copie en photo et Coline la corrige comme un vrai jury BTS
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Exam type selection */}
            <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Type d&apos;epreuve
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {examOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setExamType(opt.value)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      examType === opt.value
                        ? 'border-primary bg-primary/10'
                        : 'border-white/5 bg-bg-hover/30 hover:border-white/10'
                    }`}
                  >
                    <p className={`text-sm font-medium ${examType === opt.value ? 'text-primary' : ''}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">{opt.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Grille officielle preview */}
            <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-warning" /> Grille d&apos;evaluation officielle
              </h2>
              <div className="space-y-2">
                {grillesOfficielle[examType]?.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-bg-hover/50">
                    <span className="text-sm">{item.critere}</span>
                    <span className="text-sm font-bold text-primary">/{item.maxPoints}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <span className="text-sm font-bold">Total</span>
                  <span className="text-sm font-bold text-primary">
                    /{grillesOfficielle[examType]?.reduce((s, c) => s + c.maxPoints, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Photo upload */}
            <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Pen className="w-4 h-4 text-secondary" /> Photo de ta copie
              </h2>
              <PhotoUpload onImagesChange={setImages} maxImages={5} disabled={loading} />
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-danger/10 border border-danger/20 text-sm text-danger flex items-start gap-2"
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit button */}
            <motion.button
              whileHover={images.length > 0 && !loading ? { scale: 1.02 } : undefined}
              whileTap={images.length > 0 && !loading ? { scale: 0.98 } : undefined}
              onClick={handleSubmit}
              disabled={images.length === 0 || loading}
              className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                images.length > 0 && !loading
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-bg-hover text-text-muted cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Coline analyse ta copie...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Envoyer a Coline pour correction
                </>
              )}
            </motion.button>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-2"
              >
                <p className="text-xs text-text-muted">
                  Coline lit attentivement chaque page de ta copie...
                </p>
                <p className="text-xs text-text-muted">
                  Cela peut prendre 30 a 60 secondes.
                </p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Note globale */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-bg-card border border-white/5 rounded-2xl p-8 text-center"
            >
              <p className="text-sm text-text-muted mb-2">Note estimee</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-6xl font-bold ${getNoteColor(result.note, 20)}`}>
                  {result.note}
                </span>
                <span className="text-2xl text-text-muted">/20</span>
              </div>
              <div className="mt-4 w-full bg-bg-hover rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(result.note / 20) * 100}%` }}
                  transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    result.note >= 14
                      ? 'bg-success'
                      : result.note >= 10
                      ? 'bg-warning'
                      : 'bg-danger'
                  }`}
                />
              </div>
              <p className="text-sm text-text-muted mt-4">
                {result.note >= 16
                  ? 'Excellent travail ! Tu es bien au-dessus de la moyenne.'
                  : result.note >= 14
                  ? 'Tres bien ! Quelques ajustements et tu atteins l\'excellence.'
                  : result.note >= 12
                  ? 'Bien ! Tu as les bases, il faut approfondir certains points.'
                  : result.note >= 10
                  ? 'Passable. Avec du travail cible, tu peux progresser rapidement.'
                  : 'En dessous de la moyenne. Concentre-toi sur les exercices proposes.'}
              </p>
            </motion.div>

            {/* Grille detaillee */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection('grille')}
                className="w-full p-6 flex items-center justify-between hover:bg-bg-hover/30 transition-colors"
              >
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <Award className="w-4 h-4 text-warning" /> Grille d&apos;evaluation detaillee
                </h2>
                {expandedSections.grille ? (
                  <ChevronUp className="w-4 h-4 text-text-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-text-muted" />
                )}
              </button>
              <AnimatePresence>
                {expandedSections.grille && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-3">
                      {result.grille.map((item, i) => (
                        <div key={i} className="p-4 rounded-xl bg-bg-hover/30 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.critere}</span>
                            <span className={`text-sm font-bold ${getNoteColor(item.note, item.maxPoints)}`}>
                              {item.note}/{item.maxPoints}
                            </span>
                          </div>
                          <div className="w-full bg-bg-hover rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.note / item.maxPoints) * 100}%` }}
                              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                              className={`h-full rounded-full ${
                                item.note / item.maxPoints >= 0.7
                                  ? 'bg-success'
                                  : item.note / item.maxPoints >= 0.5
                                  ? 'bg-warning'
                                  : 'bg-danger'
                              }`}
                            />
                          </div>
                          {item.commentaire && (
                            <p className="text-xs text-text-muted leading-relaxed">{item.commentaire}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Points forts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection('forts')}
                className="w-full p-6 flex items-center justify-between hover:bg-bg-hover/30 transition-colors"
              >
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" /> Points forts
                </h2>
                {expandedSections.forts ? (
                  <ChevronUp className="w-4 h-4 text-text-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-text-muted" />
                )}
              </button>
              <AnimatePresence>
                {expandedSections.forts && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-2">
                      {result.pointsForts.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/10">
                          <Star className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                          <p className="text-sm leading-relaxed">{point}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Points faibles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection('faibles')}
                className="w-full p-6 flex items-center justify-between hover:bg-bg-hover/30 transition-colors"
              >
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-danger" /> Points a ameliorer
                </h2>
                {expandedSections.faibles ? (
                  <ChevronUp className="w-4 h-4 text-text-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-text-muted" />
                )}
              </button>
              <AnimatePresence>
                {expandedSections.faibles && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-3">
                      {result.pointsFaibles.map((pf, i) => (
                        <div key={i} className="p-4 rounded-xl bg-danger/5 border border-danger/10 space-y-2">
                          <p className="text-sm font-medium flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
                            {pf.probleme}
                          </p>
                          {pf.exemple && (
                            <div className="ml-6 p-3 rounded-lg bg-bg-hover/50 border-l-2 border-danger/30">
                              <p className="text-xs text-text-muted italic">&quot;{pf.exemple}&quot;</p>
                            </div>
                          )}
                          {pf.conseil && (
                            <div className="ml-6 flex items-start gap-2">
                              <Target className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-primary leading-relaxed">{pf.conseil}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Analyse de la structure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection('structure')}
                className="w-full p-6 flex items-center justify-between hover:bg-bg-hover/30 transition-colors"
              >
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <LayoutList className="w-4 h-4 text-secondary" /> Analyse de la structure
                </h2>
                {expandedSections.structure ? (
                  <ChevronUp className="w-4 h-4 text-text-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-text-muted" />
                )}
              </button>
              <AnimatePresence>
                {expandedSections.structure && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-sm leading-relaxed text-text/80">{result.structureAnalysis}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Feedback general */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="bg-bg-card border border-white/5 rounded-2xl p-6"
            >
              <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" /> Commentaire general de Coline
              </h2>
              <p className="text-sm leading-relaxed text-text/80">{result.overallFeedback}</p>
            </motion.div>

            {/* Exercices sur mesure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection('exercices')}
                className="w-full p-6 flex items-center justify-between hover:bg-bg-hover/30 transition-colors"
              >
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-primary" /> Exercices sur mesure
                </h2>
                {expandedSections.exercices ? (
                  <ChevronUp className="w-4 h-4 text-text-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-text-muted" />
                )}
              </button>
              <AnimatePresence>
                {expandedSections.exercices && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-3">
                      <p className="text-xs text-text-muted mb-2">
                        Coline a identifie ces exercices pour travailler tes lacunes :
                      </p>
                      {result.suggestedExercises.map((ex, i) => {
                        const diff = getDifficultyLabel(ex.difficulty);
                        return (
                          <div
                            key={i}
                            className="p-4 rounded-xl bg-bg-hover/30 border border-white/5 space-y-2"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <BookOpen className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{ex.title}</p>
                                  <p className="text-xs text-text-muted mt-0.5">{ex.type}</p>
                                </div>
                              </div>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${diff.color}`}>
                                {diff.label}
                              </span>
                            </div>
                            <p className="text-sm text-text/70 leading-relaxed ml-11">
                              {ex.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetCorrection}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm flex items-center justify-center gap-2"
              >
                <Pen className="w-4 h-4" /> Corriger une autre copie
              </motion.button>
              <Link
                href="/examens"
                className="flex-1 py-3 rounded-xl bg-bg-hover text-text font-medium text-sm flex items-center justify-center gap-2 hover:bg-bg-hover/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Retour aux examens
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
