import { Fragment } from 'react';
import { useCountdown, type TimeLeft } from '../hooks/useCountdown';

interface CountdownProps {
  /** ISO 8601 timestamp to count toward. */
  targetIso: string;
  /** Human-readable date announced to screen readers. */
  dateLabel: string;
  /** Event name used in the assistive sentence. */
  eventName: string;
}

const UNITS: { key: keyof Omit<TimeLeft, 'isPast'>; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

const DIGIT_CLASSES =
  'text-countdown leading-none tracking-tight tabular-nums text-muted-light';

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/**
 * The ticking digits are hidden from assistive technology on purpose: a value
 * that changes every second is announced as noise. The date is conveyed once,
 * in prose, by the visually hidden sentence instead.
 *
 * Each unit sits in a fixed-width column, which is what holds the digits steady
 * as the seconds change: `tabular-nums` is applied, but Outfit's tabular
 * coverage is unverified, so the column rather than the font is what the layout
 * leans on. The column also keeps the four units evenly spaced regardless of
 * label length, since the widest label ("Minutes") would otherwise set one
 * column wider than its neighbours.
 *
 * Two inks, both grey, and the split is a contrast rule rather than a
 * hierarchy. The digits are `muted-light` (gray-400) — 3.78:1 on the page,
 * 3.49:1 on the backdrop's sky — which is only permissible because at 32px
 * mobile / 40px desktop they are large text, held to 3:1. The labels are
 * body-sized, so they take `muted` (gray-500, 5.10:1) and clear the full
 * 4.5:1. Dropping the labels to `muted-light` too would fail AA at 18px.
 *
 * Both inks also depend on where the row lands. `muted-light` falls to 2.31:1
 * on the backdrop's light grass, so the landing's top padding is sized to keep
 * the countdown above the horizon — see Landing.
 *
 * The labels step from 12px to 18px at `sm` rather than at `md` like the
 * heading ladder, because they scale with the hero and the countdown column
 * widens on the same breakpoint. Below `sm` they stay at 12px: four enlarged
 * columns do not fit a 390px viewport.
 *
 * `text-body` used to sit on the separator and the label as if it were that
 * ink. It is not: `body` is declared twice in the token layer, as a type step
 * and as a colour alias, and `text-*` resolves font-size first — so the class
 * silently reset both to 16px and never touched the colour. Reach for
 * `text-heading`/`text-muted` when ink is what is wanted, and treat any
 * `text-body` as a size.
 */
export default function Countdown({
  targetIso,
  dateLabel,
  eventName,
}: CountdownProps) {
  const timeLeft = useCountdown(targetIso);

  const spokenSummary = timeLeft.isPast
    ? `${eventName} took place on ${dateLabel}.`
    : `${eventName} starts on ${dateLabel}. ${timeLeft.days} days remaining.`;

  return (
    <div>
      <p className="sr-only">{spokenSummary}</p>

      <div
        aria-hidden="true"
        className="flex items-start justify-center gap-1 sm:gap-3"
      >
        {UNITS.map((unit, index) => (
          <Fragment key={unit.key}>
            {index > 0 && <span className={DIGIT_CLASSES}>:</span>}
            <div className="flex w-(--size-countdown-unit) flex-col items-center">
              <span className={DIGIT_CLASSES}>{pad(timeLeft[unit.key])}</span>
              <span className="mt-2 text-micro tracking-wide text-muted uppercase sm:text-body-lg">
                {unit.label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
