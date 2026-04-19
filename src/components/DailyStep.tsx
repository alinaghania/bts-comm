'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Clock, Check, ChevronRight, Pause, Play } from 'lucide-react';

interface DailyStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  duration: number; // minutes
  children: React.ReactNode;
  onComplete: () => void;
  active: boolean;
}

export default function DailyStep({
  stepNumber,
  totalSteps,
  title,
  duration,
  children,
  onComplete,
  active,
}: DailyStepProps) {
  const [remaining, setRemaining] = useState(duration * 60); // seconds
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Auto-start timer when step becomes active
  useEffect(() => {
    if (active && !completed) {
      setRunning(true);
    }
    if (!active) {
      setRunning(false);
    }
  }, [active, completed]);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, remaining]);

  const handleComplete = useCallback(() => {
    setCompleted(true);
    setRunning(false);
    onComplete();
  }, [onComplete]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  const elapsed = duration * 60 - remaining;
  const progressPercent = Math.min(100, (elapsed / (duration * 60)) * 100);

  const timerColor =
    remaining > duration * 30
      ? 'text-success'
      : remaining > duration * 12
        ? 'text-warning'
        : 'text-danger';

  if (!active && !completed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="rounded-2xl bg-bg-card/50 border border-white/5 p-4 flex items-center gap-4"
      >
        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-sm font-bold text-text-muted">
          {stepNumber}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <p className="text-xs text-text-muted/60">{duration} min</p>
        </div>
        <Clock className="w-4 h-4 text-text-muted/40" />
      </motion.div>
    );
  }

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl bg-success/5 border border-success/20 p-4 flex items-center gap-4"
      >
        <div className="w-9 h-9 rounded-xl bg-success/15 flex items-center justify-center">
          <Check className="w-5 h-5 text-success" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-success">{title}</p>
          <p className="text-xs text-text-muted">Terminee</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="rounded-2xl bg-bg-card border border-primary/20 overflow-hidden"
    >
      {/* Step header */}
      <div className="p-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center text-sm font-bold text-primary">
            {stepNumber}
          </div>
          <div>
            <p className="text-sm font-semibold">
              {title}
            </p>
            <p className="text-xs text-text-muted">
              Etape {stepNumber}/{totalSteps}
            </p>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRunning(!running)}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            {running ? (
              <Pause className="w-3.5 h-3.5 text-text-muted" />
            ) : (
              <Play className="w-3.5 h-3.5 text-text-muted" />
            )}
          </button>
          <div className={`font-mono text-lg font-bold ${timerColor}`}>
            {pad(minutes)}:{pad(seconds)}
          </div>
        </div>
      </div>

      {/* Timer progress bar */}
      <div className="mx-4 h-1 bg-bg-hover rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          style={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Content */}
      <div className="p-4 pt-4">
        {children}
      </div>

      {/* Complete button */}
      <div className="p-4 pt-2">
        <button
          onClick={handleComplete}
          className="w-full py-3 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary font-medium text-sm transition-all flex items-center justify-center gap-2 group"
        >
          Terminer cette etape
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
