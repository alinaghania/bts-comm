'use client';

import { motion } from 'motion/react';
import { Lock, ChevronRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import ProgressRing from './ProgressRing';

interface ModuleCardProps {
  id: string;
  title: string;
  exam: string;
  progress: number;
  chapters: number;
  locked?: boolean;
}

export default function ModuleCard({ id, title, exam, progress, chapters, locked = false }: ModuleCardProps) {
  const examColors: Record<string, { bg: string; text: string; border: string }> = {
    E1: { bg: 'bg-primary/10', text: 'text-primary-light', border: 'border-primary/20' },
    E4: { bg: 'bg-secondary/10', text: 'text-secondary', border: 'border-secondary/20' },
    E5: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20' },
  };

  const colors = examColors[exam] || examColors.E1;

  const content = (
    <motion.div
      whileHover={locked ? {} : { scale: 1.02, y: -2 }}
      whileTap={locked ? {} : { scale: 0.98 }}
      className={`relative p-5 rounded-2xl bg-bg-card border ${colors.border} transition-all duration-200 ${
        locked ? 'opacity-50 cursor-not-allowed' : 'hover:border-white/20 cursor-pointer'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${colors.bg} ${colors.text}`}>
          {exam}
        </span>
        {locked ? (
          <Lock className="w-4 h-4 text-text-muted" />
        ) : (
          <ProgressRing percentage={progress} size={44} strokeWidth={4} />
        )}
      </div>

      <h3 className="font-semibold text-sm mb-2">{title}</h3>

      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted flex items-center gap-1">
          <BookOpen className="w-3 h-3" />
          {chapters} chapitres
        </span>
        {!locked && (
          <ChevronRight className="w-4 h-4 text-text-muted" />
        )}
      </div>

      {/* Progress bar */}
      {!locked && (
        <div className="mt-3 h-1 bg-bg-hover rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          />
        </div>
      )}
    </motion.div>
  );

  if (locked) return content;

  return <Link href={`/cours/${id}`}>{content}</Link>;
}
