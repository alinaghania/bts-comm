'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Clock, Target, TrendingUp, Flame } from 'lucide-react';

interface TimeSelectorProps {
  onSelect: (minutes: number) => void;
}

const TIME_OPTIONS = [
  {
    minutes: 20,
    icon: Zap,
    label: 'Express',
    description: 'Flashcards + 1 exercice rapide',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/30',
    hoverBorder: 'hover:border-emerald-500/60',
    textColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    minutes: 30,
    icon: Clock,
    label: 'Standard',
    description: 'Flashcards + exercice + auteur du jour',
    color: 'from-secondary to-blue-600',
    borderColor: 'border-secondary/30',
    hoverBorder: 'hover:border-secondary/60',
    textColor: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    minutes: 45,
    icon: Target,
    label: 'Optimal',
    description: 'Plan complet : revision + exercice + cas pratique',
    color: 'from-primary to-purple-600',
    borderColor: 'border-primary/30',
    hoverBorder: 'hover:border-primary/60',
    textColor: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    minutes: 60,
    icon: TrendingUp,
    label: 'Intensif',
    description: 'Tout le programme + exercice type examen complet',
    color: 'from-warning to-orange-600',
    borderColor: 'border-warning/30',
    hoverBorder: 'hover:border-warning/60',
    textColor: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    minutes: 90,
    icon: Flame,
    label: 'Marathon',
    description: 'Seance complete avec 2 exercices + bilan approfondi',
    color: 'from-danger to-rose-600',
    borderColor: 'border-danger/30',
    hoverBorder: 'hover:border-danger/60',
    textColor: 'text-danger',
    bgColor: 'bg-danger/10',
  },
];

export default function TimeSelector({ onSelect }: TimeSelectorProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (minutes: number) => {
    setSelected(minutes);
    setTimeout(() => onSelect(minutes), 300);
  };

  return (
    <div className="space-y-3">
      {TIME_OPTIONS.map((option, index) => {
        const Icon = option.icon;
        const isSelected = selected === option.minutes;

        return (
          <motion.button
            key={option.minutes}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            onClick={() => handleSelect(option.minutes)}
            className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left flex items-center gap-4 group ${
              isSelected
                ? `${option.borderColor} bg-gradient-to-r ${option.color} bg-opacity-10`
                : `border-white/5 bg-bg-card ${option.hoverBorder} hover:bg-white/[0.02]`
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                isSelected
                  ? `bg-white/20`
                  : `${option.bgColor} group-hover:scale-105`
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isSelected ? 'text-white' : option.textColor
                }`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`text-base font-bold transition-colors ${
                    isSelected ? 'text-white' : 'text-text'
                  }`}
                >
                  {option.minutes} min
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : `${option.bgColor} ${option.textColor}`
                  }`}
                >
                  {option.label}
                </span>
              </div>
              <p
                className={`text-xs mt-1 transition-colors ${
                  isSelected ? 'text-white/80' : 'text-text-muted'
                }`}
              >
                {option.description}
              </p>
            </div>

            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
