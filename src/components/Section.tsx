import type { ReactNode } from 'react';
import SectionHeading from './SectionHeading';

/**
 * Shared container width and vertical rhythm for every band below the landing.
 * Exported so multi-heading sections (the team columns) can match without
 * duplicating the values.
 *
 * Section padding follows the spacing guidance: 48px mobile, 96px desktop.
 */
export const SECTION_CONTAINER = 'mx-auto max-w-page px-6 py-12 md:py-24';

/**
 * Same rhythm with a tightened top, for a section that follows a lead-in and
 * should sit close to it rather than opening the full section gap. The bottom
 * keeps the standard padding so what comes after is unaffected.
 */
export const SECTION_CONTAINER_COMPACT_TOP =
  'mx-auto max-w-page px-6 pt-6 pb-12 md:pt-8 md:pb-24';

/** Gap between a section heading and its content. */
export const SECTION_CONTENT_GAP = 'mt-8 md:mt-12';

interface SectionProps {
  /** Heading id, wired to aria-labelledby so the section is named. */
  id: string;
  title: string;
  children: ReactNode;
  /**
   * Tighten the top padding, for a section led into by the block above it —
   * the keynote roster under the intro. Off by default so every other section
   * keeps the standard rhythm.
   */
  compactTop?: boolean;
}

/**
 * A section carries no box or border of its own: structure comes from the
 * `Band` it sits in, whose tone and curved top edge separate it from the band
 * above. This component only owns the container width and vertical rhythm.
 */
export default function Section({
  id,
  title,
  children,
  compactTop = false,
}: SectionProps) {
  const container = compactTop
    ? SECTION_CONTAINER_COMPACT_TOP
    : SECTION_CONTAINER;

  return (
    <section aria-labelledby={id} className={container}>
      <SectionHeading id={id}>{title}</SectionHeading>
      <div className={SECTION_CONTENT_GAP}>{children}</div>
    </section>
  );
}
