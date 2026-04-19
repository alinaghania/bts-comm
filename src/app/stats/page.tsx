'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Target, Clock, Brain, Award, BookOpen } from 'lucide-react';
import Badge from '@/components/Badge';
import Link from 'next/link';
import { useProgress } from '@/lib/hooks';
import PageGuide from '@/components/PageGuide';

type SkillScore = { label: string; value: number };
type WeeklyStudyTime = { day: string; minutes: number };
type QuizHistoryEntry = { date: string; score: number; total: number; exam: string };

function RadarChart({ data }: { data: SkillScore[] }) {
  if (data.length === 0) return null;

  const size = 200;
  const center = size / 2;
  const maxRadius = 80;
  const levels = 4;

  const points = data.map((d, i) => {
    const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
    const r = (d.value / 100) * maxRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (maxRadius + 20) * Math.cos(angle),
      labelY: center + (maxRadius + 20) * Math.sin(angle),
      label: d.label,
    };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[250px] mx-auto">
      {/* Grid polygons */}
      {Array.from({ length: levels }, (_, i) => {
        const r = ((i + 1) / levels) * maxRadius;
        const gridPoints = data.map((_, j) => {
          const angle = (Math.PI * 2 * j) / data.length - Math.PI / 2;
          return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
        });
        return (
          <polygon
            key={i}
            points={gridPoints.join(' ')}
            fill="none"
            stroke="var(--color-bg-hover)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Axis lines */}
      {data.map((_, i) => {
        const angle = (Math.PI * 2 * i) / data.length - Math.PI / 2;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + maxRadius * Math.cos(angle)}
            y2={center + maxRadius * Math.sin(angle)}
            stroke="var(--color-bg-hover)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Data polygon */}
      <motion.path
        d={pathD}
        fill="rgba(139, 92, 246, 0.15)"
        stroke="var(--color-primary)"
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill="var(--color-primary)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        />
      ))}

      {/* Labels */}
      {points.map((p, i) => (
        <text
          key={`label-${i}`}
          x={p.labelX}
          y={p.labelY}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-text-muted)"
          fontSize="8"
        >
          {p.label}
        </text>
      ))}
    </svg>
  );
}

function BarChart({ data }: { data: WeeklyStudyTime[] }) {
  if (data.length === 0) return null;

  const maxMinutes = Math.max(...data.map((d) => d.minutes), 1);

  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs text-text-muted">{d.minutes}m</span>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.minutes / maxMinutes) * 100}%` }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="w-full rounded-t-lg bg-gradient-to-t from-primary/40 to-primary"
          />
          <span className="text-xs text-text-muted">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ data }: { data: QuizHistoryEntry[] }) {
  if (data.length < 2) return null;

  const maxScore = 100;
  const width = 300;
  const height = 120;
  const padding = 10;

  const points = data.map((d, i) => {
    const pct = d.total > 0 ? (d.score / d.total) * 100 : 0;
    return {
      x: padding + (i / (data.length - 1)) * (width - 2 * padding),
      y: height - padding - (pct / maxScore) * (height - 2 * padding),
    };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = pathD + ` L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {/* Area fill */}
      <motion.path
        d={areaD}
        fill="url(#lineGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      {/* Line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
      {/* Points */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill="var(--color-primary)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 + i * 0.1 }}
        />
      ))}
      {/* Labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={points[i].x}
          y={height - 1}
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize="7"
        >
          {d.date.slice(5)}
        </text>
      ))}
      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LoadingSkeleton() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-pulse">
      <div>
        <div className="h-8 w-48 bg-bg-card rounded-lg" />
        <div className="h-4 w-64 bg-bg-card rounded-lg mt-2" />
      </div>
      <div className="h-28 bg-bg-card rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="h-64 bg-bg-card rounded-2xl" />
        <div className="h-64 bg-bg-card rounded-2xl" />
        <div className="h-64 bg-bg-card rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-40 bg-bg-card rounded-2xl" />
        <div className="h-40 bg-bg-card rounded-2xl" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold">Statistiques</h1>
        <p className="text-text-muted mt-1">Ton evolution et tes performances</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-16 flex flex-col items-center text-center"
      >
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Aucune donnee pour le moment</h2>
        <p className="text-text-muted max-w-md mb-8">
          Commence a reviser pour voir tes stats ici ! Reponds a des quiz, revise tes flashcards et tes progres apparaitront automatiquement.
        </p>
        <Link
          href="/quiz"
          className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
        >
          Commencer un quiz
        </Link>
      </motion.div>
    </div>
  );
}

export default function StatsPage() {
  const { progress, loading } = useProgress();

  // Compute strengths (top 3) and weaknesses (bottom 3) from skillScores
  const { strengths, weaknesses } = useMemo(() => {
    const withValues = progress.skillScores.filter((s) => s.value > 0);
    if (withValues.length === 0) {
      return { strengths: [], weaknesses: [] };
    }
    const sorted = [...withValues].sort((a, b) => b.value - a.value);
    return {
      strengths: sorted.slice(0, 3).map((s) => ({ topic: s.label, score: s.value })),
      weaknesses: sorted.slice(-3).reverse().map((s) => ({ topic: s.label, score: s.value })),
    };
  }, [progress.skillScores]);

  // Score prediction based on REAL progress with correct BTS coefficients
  // E1 coeff 3, E4 coeff 5, E5 coeff 4 => total coeff 12
  const predictedScore = useMemo(() => {
    const total = progress.e1Progress + progress.e4Progress + progress.e5Progress;
    if (total === 0) return 0;
    const weighted =
      progress.e1Progress * 3 + progress.e4Progress * 5 + progress.e5Progress * 4;
    // Progress is 0-100, convert to /20
    return Math.round((weighted / 12) * 20 / 100);
  }, [progress.e1Progress, progress.e4Progress, progress.e5Progress]);

  const hasData =
    progress.totalQuestions > 0 ||
    progress.xp > 0 ||
    progress.skillScores.some((s) => s.value > 0) ||
    progress.quizHistory.length > 0;

  if (loading) return <LoadingSkeleton />;
  if (!hasData) return <EmptyState />;

  const earnedBadges = progress.badges.filter((b) => b.earned).length;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold">Statistiques</h1>
        <p className="text-text-muted mt-1">Ton evolution et tes performances</p>
      </motion.div>

      {/* Score prediction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-sm text-text-muted">Score predit au BTS</p>
            <p className="text-3xl font-bold">{predictedScore}/20</p>
            <p className="text-xs text-text-muted mt-1">
              Base sur ta progression (E1 coeff 3, E4 coeff 5, E5 coeff 4)
            </p>
          </div>
        </div>
      </motion.div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Radar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-bg-card border border-white/5 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-text-muted" />
            <h2 className="text-sm font-semibold">Competences par sujet</h2>
          </div>
          {progress.skillScores.some((s) => s.value > 0) ? (
            <RadarChart data={progress.skillScores} />
          ) : (
            <p className="text-sm text-text-muted text-center py-8">Aucune donnee</p>
          )}
        </motion.div>

        {/* Line chart - quiz history */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-bg-card border border-white/5 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-text-muted" />
            <h2 className="text-sm font-semibold">Progression</h2>
          </div>
          {progress.quizHistory.length >= 2 ? (
            <LineChart data={progress.quizHistory} />
          ) : (
            <p className="text-sm text-text-muted text-center py-8">
              Fais au moins 2 quiz pour voir ta progression
            </p>
          )}
        </motion.div>

        {/* Bar chart - weekly study time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-bg-card border border-white/5 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-text-muted" />
            <h2 className="text-sm font-semibold">Temps d&apos;etude (semaine)</h2>
          </div>
          {progress.weeklyStudyTime.some((d) => d.minutes > 0) ? (
            <BarChart data={progress.weeklyStudyTime} />
          ) : (
            <p className="text-sm text-text-muted text-center py-8">Aucune donnee</p>
          )}
        </motion.div>
      </div>

      {/* Strengths / Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-bg-card border border-white/5 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-success" />
            <h2 className="text-sm font-semibold">Points forts</h2>
          </div>
          {strengths.length > 0 ? (
            <div className="space-y-3">
              {strengths.map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm">{s.topic}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-bg-hover rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${s.score}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        className="h-full bg-success rounded-full"
                      />
                    </div>
                    <span className="text-xs font-medium text-success">{s.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted text-center py-4">Aucune donnee</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-bg-card border border-white/5 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-4 h-4 text-danger" />
            <h2 className="text-sm font-semibold">Points faibles</h2>
          </div>
          {weaknesses.length > 0 ? (
            <div className="space-y-3">
              {weaknesses.map((w, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm">{w.topic}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-bg-hover rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${w.score}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        className="h-full bg-danger rounded-full"
                      />
                    </div>
                    <span className="text-xs font-medium text-danger">{w.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted text-center py-4">Aucune donnee</p>
          )}
        </motion.div>
      </div>

      {/* Badges */}
      {progress.badges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-warning" />
            <h2 className="text-lg font-semibold">Badges</h2>
            <span className="text-xs text-text-muted ml-auto">
              {earnedBadges}/{progress.badges.length} obtenus
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {progress.badges.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                <Badge {...badge} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Reset button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pt-4 border-t border-white/5"
      >
        <button
          onClick={async () => {
            if (!confirm('Reinitialiser ton profil ? Toutes tes donnees seront supprimees.')) return;
            const uid = localStorage.getItem('bts-user-id');
            if (!uid) return;
            await fetch('/api/progress/reset', {
              method: 'POST',
              headers: { 'x-user-id': uid },
            });
            localStorage.removeItem('bts-onboarding-completed');
            window.location.reload();
          }}
          className="text-xs text-text-muted hover:text-danger transition-colors"
        >
          Reinitialiser mon profil
        </button>
      </motion.div>

      <PageGuide page="stats" />
    </div>
  );
}
