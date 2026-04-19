'use client';

import { motion } from 'motion/react';
import { Info, Target, BookOpen, AlertTriangle, TrendingDown } from 'lucide-react';

interface FocusSkill {
  id: string;
  label: string;
  exam: string;
  score: number;
  priority: number;
  lastPracticed?: string;
}

interface WhyThisTodayProps {
  focusSkills: FocusSkill[];
  auteurName?: string;
  auteurLastSeen?: string;
}

function getDaysSince(dateStr?: string): number | null {
  if (!dateStr) return null;
  const then = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}

function getReasonIcon(score: number, daysSince: number | null) {
  if (score < 40) return TrendingDown;
  if (daysSince && daysSince > 4) return AlertTriangle;
  return Target;
}

function getReasonText(skill: FocusSkill): string {
  const daysSince = getDaysSince(skill.lastPracticed);

  if (skill.score < 30) {
    return `Score a ${skill.score}%, c'est ta competence la plus faible. On la travaille en priorite.`;
  }
  if (skill.score < 50) {
    return `Score a ${skill.score}%, en dessous de la moyenne. Il faut consolider.`;
  }
  if (daysSince && daysSince > 5) {
    return `Tu n'as pas pratique depuis ${daysSince} jours. Il faut reactiver.`;
  }
  if (daysSince && daysSince > 3) {
    return `Derniere pratique il y a ${daysSince} jours. Bon moment pour reviser.`;
  }
  return `Priorite ${skill.priority} dans ton plan de revision.`;
}

function getReasonColor(score: number): string {
  if (score < 30) return 'text-danger';
  if (score < 50) return 'text-warning';
  return 'text-primary';
}

export default function WhyThisToday({
  focusSkills,
  auteurName,
  auteurLastSeen,
}: WhyThisTodayProps) {
  const auteurDays = getDaysSince(auteurLastSeen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-bg-card border border-white/5 overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
        <Info className="w-4 h-4 text-primary" />
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Pourquoi ce plan
        </p>
      </div>

      <div className="p-4 space-y-3">
        {focusSkills.map((skill, index) => {
          const daysSince = getDaysSince(skill.lastPracticed);
          const ReasonIcon = getReasonIcon(skill.score, daysSince);
          const color = getReasonColor(skill.score);

          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5`}>
                <ReasonIcon className={`w-3.5 h-3.5 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">
                  {skill.exam.toUpperCase()} {skill.label}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  {getReasonText(skill)}
                </p>
              </div>
              <div className="shrink-0">
                <span className={`text-xs font-bold ${color}`}>
                  {skill.score}%
                </span>
              </div>
            </motion.div>
          );
        })}

        {auteurName && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: focusSkills.length * 0.1 }}
            className="flex items-start gap-3"
          >
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpen className="w-3.5 h-3.5 text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">Auteur : {auteurName}</p>
              <p className="text-xs text-text-muted mt-0.5">
                {auteurDays
                  ? `Vu il y a ${auteurDays} jours, il faut le reactiver dans ta memoire.`
                  : `Nouvel auteur a decouvrir et memoriser.`}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
