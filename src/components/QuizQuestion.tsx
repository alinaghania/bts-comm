'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, Bot } from 'lucide-react';

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  onAnswer: (correct: boolean) => void;
  onAskAI?: () => void;
}

export default function QuizQuestion({
  question,
  options,
  correctIndex,
  explanation,
  onAnswer,
  onAskAI,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    onAnswer(selected === correctIndex);
  };

  const getOptionStyle = (index: number) => {
    if (!confirmed) {
      return selected === index
        ? 'border-primary bg-primary/10 ring-2 ring-primary/30'
        : 'border-white/10 hover:border-white/20 hover:bg-bg-hover';
    }
    if (index === correctIndex) return 'border-success bg-success/10';
    if (index === selected && index !== correctIndex) return 'border-danger bg-danger/10';
    return 'border-white/5 opacity-50';
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold leading-relaxed">{question}</h3>

      <div className="space-y-3">
        {options.map((option, i) => (
          <motion.button
            key={i}
            whileHover={!confirmed ? { scale: 1.01 } : {}}
            whileTap={!confirmed ? { scale: 0.99 } : {}}
            onClick={() => !confirmed && setSelected(i)}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${getOptionStyle(i)}`}
            disabled={confirmed}
          >
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-bg-hover flex items-center justify-center text-sm font-medium">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm md:text-base">{option}</span>
              {confirmed && i === correctIndex && (
                <Check className="w-5 h-5 text-success ml-auto flex-shrink-0" />
              )}
              {confirmed && i === selected && i !== correctIndex && (
                <X className="w-5 h-5 text-danger ml-auto flex-shrink-0" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {!confirmed && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConfirm}
          disabled={selected === null}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium transition-opacity disabled:opacity-30"
        >
          Confirmer
        </motion.button>
      )}

      {confirmed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className={`p-4 rounded-xl ${selected === correctIndex ? 'bg-success/10 border border-success/20' : 'bg-danger/10 border border-danger/20'}`}>
            <p className={`text-sm font-medium mb-1 ${selected === correctIndex ? 'text-success' : 'text-danger'}`}>
              {selected === correctIndex ? 'Bonne reponse !' : 'Mauvaise reponse'}
            </p>
            <p className="text-sm text-text-muted">{explanation}</p>
          </div>

          {onAskAI && (
            <button
              onClick={onAskAI}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              <Bot className="w-4 h-4" />
              Demander a l&apos;IA
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
