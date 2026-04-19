'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Clock, Pause, Play, RotateCcw } from 'lucide-react';

interface CountdownTimerProps {
  /** Duration in seconds */
  duration: number;
  onComplete?: () => void;
  autoStart?: boolean;
  showControls?: boolean;
}

export default function CountdownTimer({
  duration,
  onComplete,
  autoStart = false,
  showControls = true,
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(duration);
  const [running, setRunning] = useState(autoStart);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, remaining, onComplete]);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');
  const percentage = (remaining / duration) * 100;

  const reset = useCallback(() => {
    setRemaining(duration);
    setRunning(false);
  }, [duration]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-1 font-mono">
        <Clock className="w-4 h-4 text-text-muted mr-2" />
        <span className="text-2xl font-bold">
          {hours > 0 && <>{pad(hours)}:</>}
          {pad(minutes)}:{pad(seconds)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-bg-hover rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full transition-colors ${
            percentage > 25 ? 'bg-primary' : percentage > 10 ? 'bg-warning' : 'bg-danger'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {showControls && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setRunning(!running)}
            className="p-2 rounded-lg bg-bg-hover hover:bg-white/10 transition-colors"
          >
            {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={reset}
            className="p-2 rounded-lg bg-bg-hover hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
