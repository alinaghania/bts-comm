'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import PageGuide from '@/components/PageGuide';
import {
  Brain,
  Target,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  ArrowRight,
  Loader2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Zap,
  BookOpen,
  RotateCcw,
} from 'lucide-react';
import { useUser, useTutor } from '@/lib/hooks';

interface Strength {
  topic: string;
  score: number;
  trend: string;
}

interface Weakness {
  topic: string;
  score: number;
  trend: string;
  commonErrors: string[];
}

interface Trap {
  question: string;
  timesWrong: number;
  timesRight: number;
  lastSeen: string;
}

interface WeeklyEntry {
  week: string;
  scores: Record<string, number>;
}

interface PlanItem {
  module: string;
  priority: 'high' | 'medium' | 'low';
  estimatedMinutes: number;
  reason: string;
}

interface AnalyseData {
  strengths: Strength[];
  weaknesses: Weakness[];
  traps: Trap[];
  weeklyProgress: WeeklyEntry[];
  suggestedPlan: PlanItem[];
  dailySummary: {
    questionsToday: number;
    correctToday: number;
    flashcardsToday: number;
    studyMinutes: number;
    xpEarned: number;
  };
  profile: {
    xp: number;
    level: number;
    streak: number;
  };
  averageByModule: Record<string, number>;
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-success" />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-danger" />;
  return <Minus className="w-4 h-4 text-text-muted" />;
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    high: 'bg-danger/15 text-danger border-danger/20',
    medium: 'bg-warning/15 text-warning border-warning/20',
    low: 'bg-success/15 text-success border-success/20',
  };
  const labels: Record<string, string> = {
    high: 'Urgent',
    medium: 'Moyen',
    low: 'OK',
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${colors[priority] || colors.low}`}>
      {labels[priority] || priority}
    </span>
  );
}

function ProgressionChart({ data }: { data: WeeklyEntry[] }) {
  if (data.length < 2) return null;

  // Collecter tous les modules
  const allModules = new Set<string>();
  for (const entry of data) {
    for (const mod of Object.keys(entry.scores)) {
      allModules.add(mod);
    }
  }

  const modules = Array.from(allModules);
  const colors = ['#8b5cf6', '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#ec4899'];

  const width = 400;
  const height = 180;
  const padding = 40;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height + 30}`} className="w-full min-w-[350px]">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((val) => {
          const y = height - padding - ((val / 100) * (height - 2 * padding));
          return (
            <g key={val}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="rgba(255,255,255,0.05)" />
              <text x={padding - 5} y={y + 4} textAnchor="end" fill="var(--color-text-muted)" fontSize="9">
                {val}%
              </text>
            </g>
          );
        })}

        {/* Lines per module */}
        {modules.map((mod, mi) => {
          const points = data.map((entry, i) => {
            const val = entry.scores[mod] ?? 0;
            const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((val / 100) * (height - 2 * padding));
            return { x, y, val };
          });

          const pathD = points
            .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
            .join(' ');

          return (
            <g key={mod}>
              <motion.path
                d={pathD}
                fill="none"
                stroke={colors[mi % colors.length]}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: mi * 0.2 }}
              />
              {points.map((p, i) => (
                <motion.circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="3"
                  fill={colors[mi % colors.length]}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                />
              ))}
            </g>
          );
        })}

        {/* Week labels */}
        {data.map((entry, i) => {
          const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
          return (
            <text
              key={i}
              x={x}
              y={height - 5}
              textAnchor="middle"
              fill="var(--color-text-muted)"
              fontSize="8"
            >
              {entry.week.slice(5)}
            </text>
          );
        })}

        {/* Legend */}
        {modules.map((mod, mi) => (
          <g key={`legend-${mod}`}>
            <rect
              x={padding + mi * 80}
              y={height + 10}
              width={10}
              height={10}
              rx={2}
              fill={colors[mi % colors.length]}
            />
            <text
              x={padding + mi * 80 + 14}
              y={height + 19}
              fill="var(--color-text-muted)"
              fontSize="8"
            >
              {mod.length > 10 ? mod.slice(0, 10) + '...' : mod}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 animate-pulse">
      <div>
        <div className="h-8 w-64 bg-bg-card rounded-lg" />
        <div className="h-4 w-96 bg-bg-card rounded-lg mt-2" />
      </div>
      <div className="h-48 bg-bg-card rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-64 bg-bg-card rounded-2xl" />
        <div className="h-64 bg-bg-card rounded-2xl" />
      </div>
      <div className="h-64 bg-bg-card rounded-2xl" />
      <div className="h-48 bg-bg-card rounded-2xl" />
    </div>
  );
}

export default function AnalysePage() {
  const { userId } = useUser();
  const { sendMessage, loading: tutorLoading } = useTutor();
  const [data, setData] = useState<AnalyseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [diagnostic, setDiagnostic] = useState<string>('');
  const [diagnosticLoading, setDiagnosticLoading] = useState(false);
  const [trapsExpanded, setTrapsExpanded] = useState(false);

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
      console.error('Failed to fetch analyse:', e);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const generateDiagnostic = useCallback(async () => {
    if (!data || !userId) return;
    setDiagnosticLoading(true);

    const statsContext = `
Voici les statistiques completes de l'etudiant en BTS Communication:

POINTS FORTS:
${data.strengths.length > 0 ? data.strengths.map(s => `- ${s.topic}: ${s.score}% (tendance: ${s.trend})`).join('\n') : 'Aucun point fort identifie encore'}

POINTS FAIBLES:
${data.weaknesses.length > 0 ? data.weaknesses.map(w => `- ${w.topic}: ${w.score}% (tendance: ${w.trend})${w.commonErrors.length > 0 ? '\n  Erreurs courantes: ' + w.commonErrors.join(', ') : ''}`).join('\n') : 'Aucun point faible identifie'}

SCORES PAR MODULE:
${Object.entries(data.averageByModule).map(([m, s]) => `- ${m}: ${s}%`).join('\n') || 'Aucun quiz fait'}

QUESTIONS PIEGES (les plus ratees):
${data.traps.slice(0, 5).map(t => `- "${t.question}" (rate ${t.timesWrong} fois, reussi ${t.timesRight} fois)`).join('\n') || 'Aucune donnee'}

PROGRESSION HEBDOMADAIRE:
${data.weeklyProgress.length > 0 ? data.weeklyProgress.map(w => `Semaine ${w.week}: ${Object.entries(w.scores).map(([m, s]) => `${m}=${s}%`).join(', ')}`).join('\n') : 'Pas assez de donnees'}

RESUME DU JOUR:
- Questions: ${data.dailySummary.questionsToday} (correctes: ${data.dailySummary.correctToday})
- Flashcards: ${data.dailySummary.flashcardsToday}
- XP gagnes: ${data.dailySummary.xpEarned}
- Streak: ${data.profile.streak} jours

Genere une analyse COMPLETE et personnalisee. Commence par "Salut ! Voici mon analyse de ta progression...". Structure avec:
1. Points forts identifies avec exemples
2. Points faibles avec les PIEGES ou l'etudiant tombe regulierement
3. Sujets ou il faut etre VIGILANT
4. Ce qui s'est AMELIORE depuis la derniere analyse (compare les semaines)
5. Ce qui ne va PAS ENCORE
Sois direct, bienveillant mais honnete. Utilise des exemples concrets.`;

    const result = await sendMessage(
      [{ role: 'user', content: statsContext }],
      'weakness_analysis'
    );
    setDiagnostic(result);
    setDiagnosticLoading(false);
  }, [data, userId, sendMessage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data && !diagnostic && !diagnosticLoading) {
      generateDiagnostic();
    }
  }, [data, diagnostic, diagnosticLoading, generateDiagnostic]);

  if (loading) return <LoadingSkeleton />;

  if (!data) {
    return (
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold">Analyse Coline</h1>
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Brain className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Aucune donnee disponible</h2>
          <p className="text-text-muted max-w-md mb-8">
            Commence a reviser pour obtenir ton analyse personnalisee par Coline.
          </p>
          <Link
            href="/quiz"
            className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            Commencer un quiz
          </Link>
        </div>
      </div>
    );
  }

  const visibleTraps = trapsExpanded ? data.traps : data.traps.slice(0, 5);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Analyse Coline</h1>
            <p className="text-text-muted mt-0.5">Diagnostic complet de ta progression par Coline</p>
          </div>
        </div>
      </motion.div>

      {/* Section 1: Diagnostic Coline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/15 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Diagnostic Coline</h2>
          </div>
          <button
            onClick={generateDiagnostic}
            disabled={diagnosticLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-card/50 border border-white/10 text-xs font-medium text-text-muted hover:text-text transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${diagnosticLoading ? 'animate-spin' : ''}`} />
            Regenerer
          </button>
        </div>

        {diagnosticLoading ? (
          <div className="flex items-center gap-3 py-8 justify-center">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <span className="text-sm text-text-muted">Coline analyse tes donnees...</span>
          </div>
        ) : diagnostic ? (
          <div className="prose prose-invert prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-text/90">
              {diagnostic}
            </div>
          </div>
        ) : (
          <p className="text-sm text-text-muted text-center py-4">
            Aucun diagnostic disponible. Clique sur Regenerer.
          </p>
        )}
      </motion.div>

      {/* Section 2: Plan d'action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-bg-card border border-white/5 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <Target className="w-5 h-5 text-secondary" />
          <h2 className="text-lg font-semibold">Plan d&apos;action</h2>
        </div>

        {data.suggestedPlan.length > 0 ? (
          <div className="space-y-3">
            {data.suggestedPlan
              .sort((a, b) => {
                const order = { high: 0, medium: 1, low: 2 };
                return order[a.priority] - order[b.priority];
              })
              .map((item, i) => (
                <motion.div
                  key={item.module}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-bg/50 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium truncate">{item.module}</span>
                      <PriorityBadge priority={item.priority} />
                    </div>
                    <p className="text-xs text-text-muted">{item.reason}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      {item.estimatedMinutes}min
                    </div>
                    <Link
                      href={`/quiz`}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                    >
                      Commencer
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-text-muted">
                Temps total estime : {data.suggestedPlan.reduce((s, p) => s + p.estimatedMinutes, 0)} minutes
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-text-muted text-center py-6">
            Fais quelques quiz pour obtenir ton plan d&apos;action personnalise.
          </p>
        )}
      </motion.div>

      {/* Section 3: Historique des pieges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-bg-card border border-white/5 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <h2 className="text-lg font-semibold">Historique des pieges</h2>
        </div>

        {data.traps.length > 0 ? (
          <div className="space-y-3">
            {visibleTraps.map((trap, i) => {
              const total = trap.timesWrong + trap.timesRight;
              const failRate = total > 0 ? Math.round((trap.timesWrong / total) * 100) : 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.03 }}
                  className="p-4 rounded-xl bg-bg/50 border border-white/5"
                >
                  <p className="text-sm font-medium mb-2">{trap.question}</p>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span className="text-danger font-medium">
                      Rate {trap.timesWrong}x
                    </span>
                    <span className="text-success font-medium">
                      Reussi {trap.timesRight}x
                    </span>
                    <div className="flex-1 h-1.5 bg-bg-hover rounded-full overflow-hidden">
                      <div
                        className="h-full bg-danger rounded-full"
                        style={{ width: `${failRate}%` }}
                      />
                    </div>
                    <span>{failRate}% echec</span>
                    {trap.lastSeen && (
                      <span>Vu le {new Date(trap.lastSeen).toLocaleDateString('fr-FR')}</span>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {data.traps.length > 5 && (
              <button
                onClick={() => setTrapsExpanded(!trapsExpanded)}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-text-muted hover:text-text transition-colors"
              >
                {trapsExpanded ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    Voir moins
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" />
                    Voir tout ({data.traps.length} pieges)
                  </>
                )}
              </button>
            )}

            {/* Pattern d'erreurs */}
            {data.weaknesses.filter(w => w.commonErrors.length > 0).length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs font-semibold text-text-muted mb-3">Patterns d&apos;erreurs detectes</p>
                <div className="space-y-2">
                  {data.weaknesses
                    .filter(w => w.commonErrors.length > 0)
                    .map((w, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <RotateCcw className="w-3.5 h-3.5 text-warning mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-medium">{w.topic}</p>
                          <p className="text-xs text-text-muted">
                            {w.commonErrors.slice(0, 3).join(' / ')}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-text-muted text-center py-6">
            Aucun piege enregistre. Les questions que tu rates souvent apparaitront ici.
          </p>
        )}
      </motion.div>

      {/* Section 4: Evolution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-bg-card border border-white/5 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-5 h-5 text-success" />
          <h2 className="text-lg font-semibold">Evolution</h2>
        </div>

        {data.weeklyProgress.length >= 2 ? (
          <div className="space-y-6">
            <ProgressionChart data={data.weeklyProgress} />

            {/* Comparaison semaine a semaine */}
            {data.weeklyProgress.length >= 2 && (
              <div className="pt-4 border-t border-white/5">
                <p className="text-xs font-semibold text-text-muted mb-3">
                  Comparaison avec la semaine precedente
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(() => {
                    const current = data.weeklyProgress[data.weeklyProgress.length - 1];
                    const previous = data.weeklyProgress[data.weeklyProgress.length - 2];
                    const allMods = new Set([
                      ...Object.keys(current.scores),
                      ...Object.keys(previous.scores),
                    ]);
                    return Array.from(allMods).map((mod) => {
                      const curr = current.scores[mod] || 0;
                      const prev = previous.scores[mod] || 0;
                      const diff = curr - prev;
                      return (
                        <div
                          key={mod}
                          className="flex items-center justify-between p-3 rounded-lg bg-bg/50 border border-white/5"
                        >
                          <span className="text-xs font-medium truncate">{mod}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-text-muted">{prev}%</span>
                            <ArrowRight className="w-3 h-3 text-text-muted" />
                            <span className="text-xs font-medium">{curr}%</span>
                            <span
                              className={`text-xs font-bold ${
                                diff > 0
                                  ? 'text-success'
                                  : diff < 0
                                  ? 'text-danger'
                                  : 'text-text-muted'
                              }`}
                            >
                              {diff > 0 ? '+' : ''}{diff}%
                            </span>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <BookOpen className="w-10 h-10 text-text-muted/30 mx-auto mb-3" />
            <p className="text-sm text-text-muted">
              Revise pendant au moins 2 semaines pour voir ton evolution.
            </p>
          </div>
        )}
      </motion.div>

      {/* Points forts et faibles cote a cote */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-bg-card border border-white/5 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-success" />
            <h3 className="text-sm font-semibold">Points forts</h3>
          </div>
          {data.strengths.length > 0 ? (
            <div className="space-y-3">
              {data.strengths.map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendIcon trend={s.trend} />
                    <span className="text-sm">{s.topic}</span>
                  </div>
                  <span className="text-xs font-medium text-success">{s.score}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-text-muted text-center py-4">Aucun point fort identifie</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-bg-card border border-white/5 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-4 h-4 text-danger" />
            <h3 className="text-sm font-semibold">Points faibles</h3>
          </div>
          {data.weaknesses.length > 0 ? (
            <div className="space-y-3">
              {data.weaknesses.map((w, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendIcon trend={w.trend} />
                      <span className="text-sm">{w.topic}</span>
                    </div>
                    <span className="text-xs font-medium text-danger">{w.score}%</span>
                  </div>
                  {w.commonErrors.length > 0 && (
                    <p className="text-xs text-text-muted ml-6 mt-1">
                      {w.commonErrors[0]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-text-muted text-center py-4">Aucun point faible identifie</p>
          )}
        </motion.div>
      </div>

      <PageGuide page="analyse" />
    </div>
  );
}
