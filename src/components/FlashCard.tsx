'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';

interface FlashCardProps {
  question: string;
  answer: string;
  onRate?: (quality: number) => void;
  exam?: string;
}

export default function FlashCard({ question, answer, onRate, exam }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  const examColors: Record<string, string> = {
    E1: 'from-primary to-purple-700',
    E4: 'from-secondary to-blue-700',
    E5: 'from-emerald-500 to-teal-700',
  };

  return (
    <div className="w-full max-w-lg mx-auto perspective-1000">
      <motion.div
        className="relative w-full aspect-[3/2] cursor-pointer"
        onClick={() => setFlipped(!flipped)}
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl bg-bg-card border border-white/10 p-8 flex flex-col items-center justify-center gap-4"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {exam && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${examColors[exam] || 'from-gray-500 to-gray-700'} text-white`}>
              {exam}
            </span>
          )}
          <p className="text-lg md:text-xl font-medium text-center leading-relaxed">{question}</p>
          <p className="text-xs text-text-muted mt-auto flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> Cliquer pour retourner
          </p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-bg-card to-bg-hover border border-white/10 p-8 flex flex-col items-center justify-center gap-4"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-xs text-text-muted uppercase tracking-wider">Reponse</p>
          <p className="text-lg md:text-xl font-medium text-center leading-relaxed">{answer}</p>
        </div>
      </motion.div>

      {/* Rating buttons */}
      {flipped && onRate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-3 mt-6"
        >
          <button
            onClick={(e) => { e.stopPropagation(); onRate(1); setFlipped(false); }}
            className="px-6 py-2.5 rounded-xl bg-danger/15 text-danger font-medium text-sm hover:bg-danger/25 transition-colors"
          >
            Difficile
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onRate(3); setFlipped(false); }}
            className="px-6 py-2.5 rounded-xl bg-warning/15 text-warning font-medium text-sm hover:bg-warning/25 transition-colors"
          >
            Moyen
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onRate(5); setFlipped(false); }}
            className="px-6 py-2.5 rounded-xl bg-success/15 text-success font-medium text-sm hover:bg-success/25 transition-colors"
          >
            Facile
          </button>
        </motion.div>
      )}
    </div>
  );
}
