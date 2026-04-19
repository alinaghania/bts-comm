'use client';

import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface BadgeProps {
  icon: string;
  name: string;
  description: string;
  earned: boolean;
}

export default function Badge({ icon, name, description, earned }: BadgeProps) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon] || LucideIcons.Award;
  return (
    <motion.div
      whileHover={{ scale: earned ? 1.05 : 1 }}
      className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-colors ${
        earned
          ? 'bg-bg-card border-primary/20 hover:border-primary/40'
          : 'bg-bg-card/50 border-white/5 opacity-50'
      }`}
    >
      <div className={`${earned ? '' : 'grayscale'}`}>
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <p className="text-xs font-medium text-center">{name}</p>
      <p className="text-xs text-text-muted text-center">{description}</p>
      {!earned && (
        <div className="absolute top-2 right-2">
          <Lock className="w-3 h-3 text-text-muted" />
        </div>
      )}
    </motion.div>
  );
}
