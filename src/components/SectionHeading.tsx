import type { ReactNode } from 'react';

interface SectionHeadingProps {
  /** Referenced by the parent section's aria-labelledby. */
  id: string;
  children: ReactNode;
}

/**
 * Every section heading is an h2, which keeps the document outline flat:
 * one h1 on the landing, then a peer h2 per section.
 *
 * `accent` is teal-700, which reaches 4.93:1 on the page background and so
 * clears AA for body text, let alone headings. The brand base teal-500 is
 * never used for text: it only manages 2.13:1.
 *
 * Heading copy is title-cased at the source (in the `title` prop each section
 * passes) rather than with a CSS `text-transform`: the accessible name is
 * computed from the text node, so a CSS-only transform would leave assistive
 * tech reading the untransformed string while sighted users saw title case.
 */
export default function SectionHeading({ id, children }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="text-h2 tracking-tight text-accent"
    >
      {children}
    </h2>
  );
}
