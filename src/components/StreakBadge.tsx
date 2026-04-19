'use client';

import { motion } from 'motion/react';
import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  days: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StreakBadge({ days, size = 'md' }: StreakBadgeProps) {
  const sizes = {
    sm: { container: 'px-2 py-1 gap-1', icon: 'w-3.5 h-3.5', text: 'text-xs' },
    md: { container: 'px-3 py-1.5 gap-1.5', icon: 'w-4 h-4', text: 'text-sm' },
    lg: { container: 'px-4 py-2 gap-2', icon: 'w-5 h-5', text: 'text-base' },
  };

  const s = sizes[size];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center ${s.container} bg-warning/15 rounded-full`}
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
      >
        <Flame className={`${s.icon} text-warning`} />
      </motion.div>
      <span className={`${s.text} font-bold text-warning`}>{days}j</span>
    </motion.div>
  );
}
