import type { ReactNode } from 'react';

export type BandTone = 'page' | 'surface';

const TONES: Record<BandTone, string> = {
  page: 'bg-page',
  surface: 'bg-surface',
};

interface BandProps {
  /**
   * Fill of this band. Consecutive bands must alternate — the curve is only
   * visible where the tone behind it differs.
   */
  tone: BandTone;
  children: ReactNode;
}

/**
 * A full-bleed content band that curves over the band above it.
 *
 * The band above stays square and runs to its full height; this one is pulled
 * up by one spacing step (48px) and given a large top radius, so its own fill
 * sweeps across the seam. That replaces the hairline rule between the landing,
 * the people block and the agenda: the transition is carried by a curve and a
 * tonal step instead of a line.
 *
 * Two details make the overlap hold:
 *
 * * `relative` — a positioned element paints after all in-flow content, so
 *   the band covers the previous band's text as well as its background. A
 *   plain block would only cover the background, and the text of the band
 *   above could bleed through the 48px overlap.
 * * the overlap (48px) exceeds the radius (40px), so the full arc of the
 *   curve lands on the band behind rather than being clipped at the seam.
 *
 * The band is full-bleed by design: the corners meet the viewport edges. The
 * page container lives inside, in `Section`.
 */
export default function Band({ tone, children }: BandProps) {
  return (
    <div className={`relative -mt-12 rounded-t-band ${TONES[tone]}`}>
      {children}
    </div>
  );
}
