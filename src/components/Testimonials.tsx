import { useEffect, useState } from 'react';
import { testimonials } from '../data/testimonials';
import Section from './Section';

/**
 * How long a quote holds before the next one replaces it. Long: these are three
 * or four lines at the largest body step on the page, and the reader has to be
 * able to finish one at an unhurried pace and still have a moment with it.
 */
const HOLD_MS = 9000;

/** Shared by both arrows. The chevron itself is drawn per direction. */
const ARROW_BUTTON =
  'shrink-0 rounded-control p-2 text-accent transition-colors duration-150 hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-active';

/**
 * A chevron, pointing whichever way it is given. Decoration: the button around
 * it carries the accessible name, so this is hidden rather than described twice.
 *
 * Drawn rather than imported — the project has no icon dependency, and two
 * chevrons are not a reason to add one. `currentColor` is what lets the button's
 * hover state reach the glyph.
 */
function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-(--size-quote-arrow)"
    >
      <path d={direction === 'left' ? 'M15 5 8 12l7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  );
}

/**
 * One quote at a time, cross-faded and slid into place from the left.
 *
 * The section is the emotional beat before the agenda, so it is given the room
 * to be one: a single quote at `text-h1` (40px desktop) in heading ink, centred
 * on a 48rem measure. Two quotes side by side at `text-h3` read as a feature
 * list; one large one reads as somebody speaking. Both quotes are still in the
 * DOM — see `quote-slide` in index.css for why they stack in a single grid cell
 * rather than being positioned — and only the current one is legible.
 *
 * The type step changes at `md` rather than riding the token: `text-h2` is 24px
 * on a phone, where 40px would give a 17-character line and turn four lines into
 * eleven. This is one of the few places a step is chosen per breakpoint, and it
 * is because the element is a block of prose sized like a headline.
 *
 * Rotation is automatic, which brings three obligations with it:
 *
 *  - It must be stoppable. Auto-updating content that runs longer than five
 *    seconds needs a mechanism to pause or stop it (WCAG 2.2.2). There is no
 *    Pause button, so the job falls to the four behaviours below, and removing
 *    any of them takes a brake off the rotation:
 *      * the prev/next arrows stop it for good — the sturdiest of the four,
 *        being a labelled, keyboard-reachable control whose whole purpose is
 *        taking the sequence over from the timer;
 *      * choosing a quote by its dot stops rotation for good as well — a
 *        deliberate choice takes over rather than being overwritten by it;
 *      * hovering the block holds it, so a quote does not swap out from under
 *        the sentence being read;
 *      * focus anywhere in the block holds it too, which is the same courtesy
 *        for a keyboard, where there is no hover to speak of.
 *  - It must not move for a reader who has asked for less motion. The slide
 *    distance is a token that `prefers-reduced-motion` zeroes, leaving the fade.
 *  - It must not shout at assistive tech. This is not a live region: the
 *    inactive quotes are `aria-hidden`, so a screen reader reads the current one
 *    as ordinary page content and reaches the others through the controls,
 *    rather than having a paragraph interrupt whatever is being read every nine
 *    seconds.
 *
 * figure + blockquote + figcaption is what ties each quote to its attribution.
 * The em dash is punctuation, so it is hidden from assistive tech, which hears
 * "Jane Doe, FP&A Analyst".
 */
export default function Testimonials() {
  /**
   * `leaving` is the quote that was current a moment ago. It is what lets the
   * outgoing quote exit one way while everything unseen waits on the other:
   * without it, a quote that had just been read would slide back the way it
   * came.
   *
   * `back` is which way the reader is going. It is state rather than a
   * derivation, because the direction of a move is only knowable at the moment
   * it is made — from the last quote to the first is forward when the timer
   * wraps around and backward when the Previous arrow does it, and the pair of
   * indices looks identical either way.
   */
  const [{ current, leaving, back }, setSlide] = useState<{
    current: number;
    leaving: number | null;
    back: boolean;
  }>({ current: 0, leaving: null, back: false });
  /** Set once a quote is chosen by hand, and never cleared. */
  const [stopped, setStopped] = useState(false);
  const [held, setHeld] = useState(false);

  const rotates = testimonials.length > 1;
  const running = rotates && !stopped && !held;

  /**
   * Every deliberate move goes through here, so every one of them stops the
   * rotation — an arrow and a dot are the same decision as far as the timer is
   * concerned. `back` is passed in rather than compared out of the indices, so
   * that the two wrap-around cases can differ.
   */
  const show = (next: number, back = false) => {
    setStopped(true);
    setSlide((slide) =>
      next === slide.current
        ? slide
        : { current: next, leaving: slide.current, back },
    );
  };

  const step = (delta: -1 | 1) => {
    const count = testimonials.length;
    // + count before the modulo: JS gives -1 % 2 as -1, not the last index.
    show((current + delta + count) % count, delta < 0);
  };

  useEffect(() => {
    if (!running) return;

    // A timeout rather than an interval, keyed on the quote showing: selecting a
    // quote by hand restarts the full hold instead of inheriting whatever was
    // left of the previous one.
    const id = window.setTimeout(() => {
      setSlide((slide) => ({
        current: (slide.current + 1) % testimonials.length,
        leaving: slide.current,
        back: false,
      }));
    }, HOLD_MS);

    return () => window.clearTimeout(id);
  }, [running, current]);

  const stateClass = (index: number) => {
    if (index === current) return 'quote-slide-current';
    if (index === leaving) return 'quote-slide-leaving';
    return 'quote-slide-waiting';
  };

  return (
    <Section id="testimonials" title="Testimonials" bandFoot>
      <div
        // Hover and focus both hold the rotation. React's onFocus/onBlur are
        // focusin/focusout, so they fire for the controls inside as well.
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
      >
        {/*
          The arrows flank the quote rather than joining the dots below it, which
          is one layout at every width — no breakpoint moves them and nothing is
          absolutely positioned. The measure cap moves off this wrapper and onto
          the quote column, so the arrows take their width from the page
          container's spare room rather than out of the 48rem line; `justify-
          center` is what keeps them against the quote instead of the container
          edges. On a phone there is no spare room, and the two buttons do take
          ~80px off the line — accepted, because a reader reaching for "next"
          looks beside the quote, not under it.
        */}
        <div className="flex items-center justify-center gap-2 lg:gap-6">
          {rotates && (
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous quote"
              className={ARROW_BUTTON}
            >
              <Chevron direction="left" />
            </button>
          )}

          <div
            className={`grid flex-1 max-w-(--size-quote) quote-track ${back ? 'quote-track-reverse' : ''}`}
          >
            {testimonials.map((testimonial, index) => (
              <figure
                key={testimonial.id}
                aria-hidden={index !== current}
                className={`col-start-1 row-start-1 text-center quote-slide ${stateClass(index)}`}
              >
                <blockquote className="text-h2 font-normal text-heading md:text-h1">
                  <p>&ldquo;{testimonial.quote}&rdquo;</p>
                </blockquote>

                <figcaption className="mt-6 text-small">
                  <span aria-hidden="true">&mdash; </span>
                  <span className="font-semibold text-accent-strong">
                    {testimonial.name}
                  </span>
                  <span className="text-muted">, {testimonial.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {rotates && (
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next quote"
              className={ARROW_BUTTON}
            >
              <Chevron direction="right" />
            </button>
          )}
        </div>

        {rotates && (
          <div className="mt-12 flex items-center justify-center gap-1">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => show(index, index < current)}
                aria-current={index === current}
                // The dot has no text, so the name comes from here. Naming the
                // speaker beats "quote 2 of 2": it says where the control goes.
                aria-label={`Show the quote from ${testimonial.name}`}
                className="group rounded-control p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-active"
              >
                {/* muted-light, not divider: an inactive dot is a UI boundary
                    and needs 3:1, which offwhite-300 misses by a long way. */}
                <span
                  className={`block size-(--size-quote-dot) rounded-full transition-colors duration-150 ${
                    index === current
                      ? 'bg-primary'
                      : 'bg-muted-light group-hover:bg-accent'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
