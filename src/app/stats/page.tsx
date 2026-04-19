'use client';

import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Target, Clock, Brain, Award } from 'lucide-react';
import Badge from '@/components/Badge';
import { useProgress } from '@/lib/hooks';

// Radar chart data (skills)
const radarData = [
  { label: 'Theories', value: 80 },
  { label: 'Semiotique', value: 65 },
  { label: 'Strategie', value: 55 },
  { label: 'Digital', value: 70 },
  { label: 'Production', value: 45 },
  { label: 'Droit', value: 35 },
];

// Weekly study time
const weeklyData = [
  { day: 'Lun', minutes: 45 },
  { day: 'Mar', minutes: 60 },
  { day: 'Mer', minutes: 30 },
  { day: 'Jeu', minutes: 75 },
  { day: 'Ven', minutes: 50 },
  { day: 'Sam', minutes: 90 },
  { day: 'Dim', minutes: 20 },
];

// Progress over time
const progressData = [
  { week: 'S1', score: 42 },
  { week: 'S2', score: 48 },
  { week: 'S3', score: 52 },
  { week: 'S4', score: 55 },
  { week: 'S5', score: 61 },
  { week: 'S6', score: 58 },
  { week: 'S7', score: 65 },
  { week: 'S8', score: 72 },
];

const badges = [
  { icon: '\uD83D\uDD25', name: 'Streak 7j', description: '7 jours consecutifs', earned: true },
  { icon: '\uD83C\uDFAF', name: 'Precision', description: '80% au quiz', earned: true },
  { icon: '\uD83D\uDCDA', name: 'Erudit', description: '100 flashcards', earned: true },
  { icon: '\u26A1', name: 'Rapide', description: 'Quiz en < 2min', earned: true },
  { icon: '\uD83C\uDFC6', name: 'Champion E1', description: '16/20 a E1', earned: false },
  { icon: '\uD83E\uDDE0', name: 'Maitre', description: '500 questions', earned: false },
  { icon: '\uD83D\uDCAA', name: 'Marathonien', description: 'Streak 30j', earned: false },
  { icon: '\uD83C\uDF1F', name: 'Parfait', description: 'Quiz 100%', earned: false },
];

const strengths = [
  { topic: 'Theories de la communication', score: 80, trend: 'up' as const },
  { topic: 'Communication digitale', score: 70, trend: 'up' as const },
  { topic: 'Semiotique', score: 65, trend: 'up' as const },
];

const weaknesses = [
  { topic: 'Droit de la communication', score: 35, trend: 'down' as const },
  { topic: 'Production audiovisuelle', score: 45, trend: 'stable' as const },
  { topic: 'Budget de communication', score: 40, trend: 'up' as const },
];

function RadarChart() {
  const size = 200;
  const center = size / 2;
  const maxRadius = 80;
  const levels = 4;

  const points = radarData.map((d, i) => {
    const angle = (Math.PI * 2 * i) / radarData.length - Math.PI / 2;
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
      {/* Grid circles */}
      {Array.from({ length: levels }, (_, i) => {
        const r = ((i + 1) / levels) * maxRadius;
        const gridPoints = radarData.map((_, j) => {
          const angle = (Math.PI * 2 * j) / radarData.length - Math.PI / 2;
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
      {radarData.map((_, i) => {
        const angle = (Math.PI * 2 * i) / radarData.length - Math.PI / 2;
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

function BarChart() {
  const maxMinutes = Math.max(...weeklyData.map((d) => d.minutes));

  return (
    <div className="flex items-end gap-2 h-32">
      {weeklyData.map((d, i) => (
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

function LineChart() {
  const maxScore = 100;
  const width = 300;
  const height = 120;
  const padding = 10;

  const points = progressData.map((d, i) => ({
    x: padding + (i / (progressData.length - 1)) * (width - 2 * padding),
    y: height - padding - (d.score / maxScore) * (height - 2 * padding),
  }));

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
      {progressData.map((d, i) => (
        <text
          key={i}
          x={points[i].x}
          y={height - 1}
          textAnchor="middle"
          fill="var(--color-text-muted)"
          fontSize="7"
        >
          {d.week}
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

export default function StatsPage() {
  const { progress } = useProgress();

  const predictedScore = Math.round(
    (progress.e1Progress * 0.35 + progress.e4Progress * 0.35 + progress.e5Progress * 0.3) / 5
  );

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
            <p className="text-xs text-text-muted mt-1">Base sur ta progression actuelle</p>
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
          <RadarChart />
        </motion.div>

        {/* Line chart */}
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
          <LineChart />
        </motion.div>

        {/* Bar chart */}
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
          <BarChart />
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
        </motion.div>
      </div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-warning" />
          <h2 className="text-lg font-semibold">Badges</h2>
          <span className="text-xs text-text-muted ml-auto">
            {badges.filter((b) => b.earned).length}/{badges.length} obtenus
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {badges.map((badge, i) => (
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
    </div>
  );
}
