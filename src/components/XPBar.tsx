'use client';

import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

interface XPBarProps {
  level: number;
  xp: number;
  xpToNext: number;
  compact?: boolean;
}

export default function XPBar({ level, xp, xpToNext, compact = false }: XPBarProps) {
  const percentage = (xp / xpToNext) * 100;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-primary">Nv.{level}</span>
        <div className="flex-1 h-1.5 bg-bg-hover rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          />
        </div>
        <span className="text-xs text-text-muted">{xp}/{xpToNext}</span>
      </div>
    );
  }

  return (
    <div className="bg-bg-hover/50 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-text-muted">Niveau</p>
            <p className="text-sm font-bold">{level}</p>
          </div>
        </div>
        <span className="text-xs text-text-muted">{xp} / {xpToNext} XP</span>
      </div>
      <div className="h-2 bg-bg rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </div>
    </div>
  );
}
