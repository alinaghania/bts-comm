'use client';
import { motion } from 'motion/react';
import { Info } from 'lucide-react';

interface DidYouKnowProps {
  fact: string;
}

export default function DidYouKnow({ fact }: DidYouKnowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-3 p-4 rounded-xl bg-secondary/10 border border-secondary/20"
    >
      <Info className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Le savais-tu ?</p>
        <p className="text-sm text-text/80 leading-relaxed">{fact}</p>
      </div>
    </motion.div>
  );
}
