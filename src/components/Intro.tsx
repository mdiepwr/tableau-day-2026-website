import avalancheLogo from '../assets/avalanche-logo.png';
import { site } from '../data/site';

const { intro } = site;

/**
 * A hand-drawn, Excalidraw-style arrow pointing right, from the blurb across to
 * the logo. Built as an inline SVG rather than a glyph or image so it inherits
 * `currentColor` and scales cleanly; the shaft is a shallow S and the stroke is
 * round-capped so it reads as sketched rather than geometric. Decorative, so
 * `aria-hidden`.
 */
function SketchArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Shaft: mostly horizontal, dipping then rising so it does not look
          drawn with a ruler. Ends near the right edge, pointing at the logo. */}
      <path d="M6 22 C 38 40, 66 44, 96 30 C 102 27, 108 24, 114 20" />
      {/* Arrowhead at the shaft's end (~114,20). */}
      <path d="M114 20 L 100 22" />
      <path d="M114 20 L 106 33" />
    </svg>
  );
}

/**
 * Lead-in above the keynote roster, in two columns from `md`: the Avalanche
 * logo on the left with a hand-annotated note pointing at it, the intro copy
 * on the right. Stacks to one column on mobile, logo first.
 *
 * The copy column, top to bottom:
 *  - A visible heading, the same `text-h2` accent as "Keynote Speakers" below,
 *    so the section reads as a peer. No `capitalize` — the copy sets its own
 *    case ("Tableau Day is Back!").
 *  - The lead paragraph, `text-h3` at normal weight (the documented "big prose,
 *    not a heading" step, as in Testimonials). The key facts (date, city) come
 *    through as `<strong>`: emphasis lives in the data as segments.
 *  - The transition sentence, one step smaller and muted, set apart and pulled
 *    to the bottom so it hands off to the speakers.
 *
 * The logo column pairs the mark with the `intro.blurb` note and a sketched
 * arrow that points across to it. The note sits to the LEFT of the logo with
 * the arrow between them, pointing right. It is set in the site's one family
 * (Outfit) as a small italic aside — the design system ships no script face, so
 * italic-muted is how an annotation is signalled here, the same
 * synthesized-oblique treatment the agenda uses.
 *
 * Vertical rhythm is asymmetric on purpose: full `pt` above, tightened `pb`
 * below. The keynote roster it leads into carries a matching tightened `pt`
 * (Section's `compactTop`), so the gap between the transition line and
 * "Keynote Speakers" is one small step rather than two full section paddings
 * stacked.
 */
export default function Intro() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="mx-auto max-w-page px-6 pt-12 pb-6 md:pt-24 md:pb-8"
    >
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Logo column: the note sits to the left of the mark with the arrow
            between them pointing right. A horizontal flex, so the note reads as
            annotating the logo beside it. */}
        <div className="flex items-center justify-center gap-4 md:justify-start">
          <div className="flex max-w-(--size-blurb) shrink-0 flex-col">
            <p className="text-body-lg text-body italic">{intro.blurb}</p>
            <SketchArrow className="mt-2 w-24 self-end text-muted" />
          </div>

          <img
            src={avalancheLogo}
            width={645}
            height={720}
            alt="Wind River Avalanche team"
            className="w-full max-w-(--size-avalanche-logo) object-contain"
          />
        </div>

        {/* Copy column. */}
        <div>
          <h2
            id="intro-heading"
            className="text-h2 tracking-tight text-accent"
          >
            {intro.heading}
          </h2>

          <p className="mt-6 text-h3 font-normal">
            {intro.lead.map((segment, index) =>
              segment.emphasis ? (
                <strong key={index} className="font-semibold text-heading">
                  {segment.text}
                </strong>
              ) : (
                <span key={index}>{segment.text}</span>
              ),
            )}
          </p>

          <p className="mt-12 text-body-lg text-muted">{intro.transition}</p>
        </div>
      </div>
    </section>
  );
}
