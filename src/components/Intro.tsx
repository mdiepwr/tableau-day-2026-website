import bitTeamLogo from '../assets/bit-team-logo.webp';
import { site } from '../data/site';

const { intro } = site;

/**
 * Lead-in above the keynote roster, in two columns from `md`: the BIT team logo
 * on the left, the intro copy on the right. Stacks to one column on mobile,
 * logo first.
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
 * The logo column carries the mark alone. It once had a hand-annotated note and
 * a sketched arrow pointing across at it; both were dropped with the Avalanche
 * mark, so the column is a single centred image and the arrow SVG and
 * `--size-blurb` token went with them. The mark takes the larger
 * `--size-team-logo-lg` cap once the columns sit side by side, and the smaller
 * one while they are stacked, where its height is height the reader scrolls
 * through to reach the copy.
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
        {/* Logo column. Centred on both layouts: the mark is portrait, so
            left-aligning it against the copy column reads as adrift rather
            than as a pair. */}
        <div className="flex justify-center">
          <img
            src={bitTeamLogo}
            width={728}
            height={1103}
            alt="BIT team: harnessing data, unlocking insights"
            className="w-full max-w-(--size-team-logo) object-contain md:max-w-(--size-team-logo-lg)"
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
