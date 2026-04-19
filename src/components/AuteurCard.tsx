'use client';

import { motion } from 'motion/react';
import { BookOpen, MessageSquareQuote, Lightbulb, FileText } from 'lucide-react';
import ColineHelper from '@/components/ColineHelper';
import type { Auteur } from '@/lib/auteurs-data';

interface AuteurCardProps {
  auteur: Auteur;
  compact?: boolean;
}

export default function AuteurCard({ auteur, compact = false }: AuteurCardProps) {
  const examColors: Record<string, string> = {
    e1: 'from-primary/20 to-purple-700/20 border-primary/30',
    e5: 'from-secondary/20 to-blue-700/20 border-secondary/30',
    e6: 'from-emerald-500/20 to-teal-700/20 border-success/30',
  };

  const examLabels: Record<string, string> = {
    e1: 'E1 - Cultures',
    e5: 'E5 - Strategie',
    e6: 'E6 - Oral',
  };

  const gradientClass = examColors[auteur.exam] || examColors.e1;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl bg-gradient-to-br ${gradientClass} border p-4`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Auteur du jour
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-text-muted">
            {examLabels[auteur.exam]}
          </span>
        </div>
        <p className="font-bold text-lg">{auteur.auteur}</p>
        <p className="text-sm text-text-muted mt-1 italic">
          &laquo; {auteur.citation_courte} &raquo;
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl bg-gradient-to-br ${gradientClass} border overflow-hidden`}
    >
      {/* Header */}
      <div className="p-5 pb-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
            Auteur du jour
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-text-muted font-medium">
            {examLabels[auteur.exam]}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-primary-light" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{auteur.auteur}</h3>
            <p className="text-sm text-text-muted leading-snug mt-0.5">
              {auteur.idee_centrale}
            </p>
          </div>
        </div>
      </div>

      {/* Citation */}
      <div className="px-5 pb-4">
        <div className="flex gap-2.5 items-start">
          <MessageSquareQuote className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
          <p className="text-sm italic text-text/80 leading-relaxed">
            &laquo; {auteur.citation_courte} &raquo;
          </p>
        </div>
      </div>

      {/* Quand utiliser */}
      <div className="px-5 pb-4">
        <div className="flex gap-2.5 items-start">
          <Lightbulb className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
              Quand l'utiliser
            </p>
            <p className="text-sm text-text/80 leading-relaxed">
              {auteur.quand_utiliser}
            </p>
          </div>
        </div>
      </div>

      {/* Phrase modele */}
      <div className="mx-5 mb-4 p-3.5 rounded-xl bg-white/5 border border-white/10">
        <div className="flex gap-2.5 items-start">
          <FileText className="w-4 h-4 text-success shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
              Phrase modele a reutiliser
            </p>
            <p className="text-sm text-text/90 leading-relaxed">
              {auteur.phrase_modele}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {auteur.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/8 text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <ColineHelper
          context={`Explique-moi la theorie de ${auteur.auteur} et comment l'utiliser dans une copie de BTS Communication. Son idee centrale : ${auteur.idee_centrale}`}
          type="concept"
        />
      </div>
    </motion.div>
  );
}
