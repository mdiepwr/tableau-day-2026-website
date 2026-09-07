export type DividerTone = 'quiet' | 'accent';
export type DividerWidth = 'full' | 'short';

interface DividerProps {
  /**
   * `accent` (teal-300) marks a meaningful transition between bands.
   * `quiet` (offwhite-300) is a structural break between similar content.
   */
  tone?: DividerTone;
  /**
   * `full` spans the page container; `short` is a centered pill.
   *
   * Note that `quiet` at `short` is a poor pairing: offwhite-300 is only
   * 1.14:1 against the page, so a 96px sliver of it is effectively invisible.
   * Low-contrast tones need full width to register.
   */
  width?: DividerWidth;
}

const TONES: Record<DividerTone, string> = {
  quiet: 'bg-divider',
  accent: 'bg-divider-accent',
};

const WIDTHS: Record<DividerWidth, string> = {
  full: 'w-full',
  short: 'w-(--size-divider)',
};

/**
 * A 4px pill-shaped rule between major sections.
 *
 * 4px rather than 3px because the spacing scale has no 3px step, and `h-1` is
 * its thinnest rung.
 *
 * Even a full-width divider stays inside the page container rather than
 * bleeding to the viewport edge — rounded caps only read as rounded if there
 * is margin for them to sit against.
 *
 * Rendered as an <hr>, which is the correct element for a thematic break and
 * carries an implicit separator role, so it needs no ARIA.
 */
export default function Divider({
  tone = 'quiet',
  width = 'full',
}: DividerProps) {
  return (
    <div className="mx-auto max-w-page px-6">
      <hr
        className={`mx-auto my-12 h-1 rounded-full border-0 md:my-16 ${TONES[tone]} ${WIDTHS[width]}`}
      />
    </div>
  );
}
