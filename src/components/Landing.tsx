import backdrop from '../assets/landing-backdrop.png';
import { site } from '../data/site';
import Button from './Button';
import Countdown from './Countdown';
import LogoLockup from './LogoLockup';

/**
 * The landing fills the viewport: the partner lockup, the event title, the
 * countdown and a registration button, over the illustrated backdrop.
 *
 * It closes square and runs to full height — the band below is what shapes the
 * transition, curving up over the last 48px of this section. The content hangs
 * from the top on `pt-24 md:pt-32` (96/128px) rather than centring, which lifts
 * the whole group into the clean page above the artwork.
 *
 * Hanging from the top does more than sit the hero higher: it keeps the
 * countdown and the button clear of the backdrop. Centred, the countdown's
 * baseline fell to ~76% of a 900px viewport, onto the grass where its
 * `muted-light` digits drop to 2.31:1; anchored to the top, the whole block —
 * countdown and the button beneath it — stays in the upper two-thirds, above
 * the ~78% horizon. The button itself is a `primary` fill (teal-700, white
 * ink) that clears AA on either the page or the sky, so it is safe even if a
 * short viewport pushes it lower than the countdown.
 *
 * The backdrop is decoration, not content: empty alt and aria-hidden, so it is
 * skipped entirely by assistive technology. `bg-page` stays underneath as the
 * fill while the image loads and as the colour of the strip above the artwork.
 *
 * Two things place the illustration. `object-cover object-bottom` keeps its own
 * bottom edge on the layer's bottom edge and crops sky, which is empty; the
 * centred horizontal crop keeps the trees out of frame on narrow viewports,
 * where the crop is tightest and dark ink over their foliage would only reach
 * 3.62:1. Then the whole layer is translated down by `--size-backdrop-drop`, so
 * the horizon sits around 78% of the viewport rather than 66% and the hero has
 * clean page above it. The section is `overflow-hidden` because that translation
 * pushes the foot of the artwork past the bottom of the section.
 *
 * `layer-fade-top` is what keeps that translation from showing: it masks the top
 * of the image away, so the artwork emerges from the page instead of starting on
 * a hard line. Matching the two colours instead would not work — the sky's top
 * rows are pure white and the page is a warm off-white, so the edge reads as a
 * cut even though the luminance step is only 1.02:1.
 */
export default function Landing() {
  return (
    <section
      aria-labelledby="landing-title"
      className="relative flex min-h-screen flex-col overflow-hidden bg-page text-heading"
    >
      <img
        src={backdrop}
        width={2732}
        height={1536}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="layer-fill layer-fade-top pointer-events-none translate-y-(--size-backdrop-drop) object-cover object-bottom select-none"
      />

      {/* `relative` lifts the content above the absolutely-positioned backdrop
          without a z-index: both are positioned, so source order decides.

          `justify-start` with top padding hangs the group from the top of the
          view. This both sits the hero higher and keeps the countdown clear of
          the backdrop grass, where its `muted-light` digits fail contrast. */}
      <div className="relative flex flex-1 flex-col items-center justify-start gap-12 px-6 pt-24 pb-16 text-center sm:gap-16 md:pt-32">
        <LogoLockup partners={site.partners} />

        <h1
          id="landing-title"
          className="max-w-page text-display tracking-tight text-balance"
        >
          {site.title}
        </h1>

        <Countdown
          targetIso={site.eventStartIso}
          dateLabel={site.eventDateLabel}
          eventName={site.title}
        />

        {/* Reuses the registration URL from site.cta so the landing and the
            footer CTA cannot drift to different links. `primary`, not the CTA's
            `inverse`: here the fill sits on the light page/sky, not the dark
            band, so teal-700 with white ink is the accessible pairing. */}
        <Button href={site.cta.buttonHref} size="large">
          Register Here!
        </Button>
      </div>
    </section>
  );
}
