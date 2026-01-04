import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const WORK_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const totalTime = isBreak ? BREAK_TIME : WORK_TIME;
  const progress = (totalTime - timeLeft) / totalTime;

  const circumference = 2 * Math.PI * 88;
  const strokeDashoffset = circumference * (1 - progress);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setIsBreak((prev) => !prev);
      setTimeLeft(isBreak ? WORK_TIME : BREAK_TIME);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME);
  }, [isBreak]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center p-8 rounded-2xl bg-timer-bg">
      <div className="mb-4">
        <span
          className={cn(
            'px-3 py-1 rounded-full text-sm font-medium transition-colors',
            isBreak
              ? 'bg-tag-life-bg text-tag-life'
              : 'bg-tag-coding-bg text-tag-coding'
          )}
        >
          {isBreak ? 'Break Time' : 'Deep Work'}
        </span>
      </div>

      <div className="relative w-48 h-48 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          {/* Track */}
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="hsl(var(--timer-track))"
            strokeWidth="8"
          />
          {/* Progress */}
          <motion.circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="hsl(var(--timer-fill))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-semibold tracking-tight">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={resetTimer}
          className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-muted transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={toggleTimer}
          className={cn(
            'p-4 rounded-full transition-all duration-200',
            'bg-primary text-primary-foreground hover:opacity-90',
            'shadow-md hover:shadow-lg'
          )}
        >
          {isRunning ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </button>
        <div className="w-11" /> {/* Spacer for symmetry */}
      </div>
    </div>
  );
}
