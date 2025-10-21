/**
 * useAutoPlay - Simple auto-play hook for carousels
 * Automatically advances carousel at specified interval
 */

import { useEffect, useState } from "react";

type UseAutoPlayProps = {
  onNext: () => void;
  interval?: number;
  enabled?: boolean;
};

export function useAutoPlay({ 
  onNext, 
  interval = 5000,
  enabled = true 
}: UseAutoPlayProps) {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!enabled || isPaused) return;

    const timer = setInterval(() => {
      onNext();
    }, interval);

    return () => clearInterval(timer);
  }, [onNext, interval, enabled, isPaused]);

  return {
    isPaused,
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
    toggle: () => setIsPaused(prev => !prev)
  };
}

