import { useEffect, useMemo, useState } from 'react';

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** True once the target moment has arrived or passed; all units read zero. */
  isPast: boolean;
}

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

const ZERO: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isPast: true,
};

/**
 * Pure countdown math, kept separate from the component so it can be unit
 * tested without fake timers. Clamps to zero rather than counting negatives.
 */
export function computeTimeLeft(targetMs: number, nowMs: number): TimeLeft {
  const remaining = targetMs - nowMs;

  if (!Number.isFinite(remaining) || remaining <= 0) {
    return ZERO;
  }

  return {
    days: Math.floor(remaining / MS_PER_DAY),
    hours: Math.floor((remaining % MS_PER_DAY) / MS_PER_HOUR),
    minutes: Math.floor((remaining % MS_PER_HOUR) / MS_PER_MINUTE),
    seconds: Math.floor((remaining % MS_PER_MINUTE) / MS_PER_SECOND),
    isPast: false,
  };
}

/**
 * Ticks once per second toward an ISO timestamp. The first value is computed
 * synchronously so the UI never renders a blank frame waiting for the interval.
 */
export function useCountdown(targetIso: string): TimeLeft {
  const targetMs = useMemo(() => new Date(targetIso).getTime(), [targetIso]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    computeTimeLeft(targetMs, Date.now()),
  );

  useEffect(() => {
    setTimeLeft(computeTimeLeft(targetMs, Date.now()));

    const intervalId = setInterval(() => {
      setTimeLeft(computeTimeLeft(targetMs, Date.now()));
    }, MS_PER_SECOND);

    return () => clearInterval(intervalId);
  }, [targetMs]);

  return timeLeft;
}
