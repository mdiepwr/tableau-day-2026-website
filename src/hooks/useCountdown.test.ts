import { describe, expect, it } from 'vitest';
import { computeTimeLeft } from './useCountdown';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe('computeTimeLeft', () => {
  const now = Date.UTC(2026, 8, 3, 12, 0, 0);

  it('breaks a future remainder into days, hours, minutes and seconds', () => {
    const target = now + 3 * DAY + 4 * HOUR + 5 * MINUTE + 6 * SECOND;

    expect(computeTimeLeft(target, now)).toEqual({
      days: 3,
      hours: 4,
      minutes: 5,
      seconds: 6,
      isPast: false,
    });
  });

  it('does not roll sub-day remainders into the day count', () => {
    const target = now + 23 * HOUR + 59 * MINUTE + 59 * SECOND;

    expect(computeTimeLeft(target, now)).toMatchObject({
      days: 0,
      hours: 23,
      minutes: 59,
      seconds: 59,
    });
  });

  it('clamps to zero and flags isPast once the target has passed', () => {
    const target = now - 5 * DAY;

    expect(computeTimeLeft(target, now)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
    });
  });

  it('treats the exact target moment as past', () => {
    expect(computeTimeLeft(now, now).isPast).toBe(true);
  });

  it('counts the final second down rather than up', () => {
    expect(computeTimeLeft(now + SECOND, now)).toMatchObject({
      seconds: 1,
      isPast: false,
    });
  });

  it('returns zeros for an unparseable target', () => {
    expect(computeTimeLeft(Number.NaN, now).isPast).toBe(true);
  });
});
