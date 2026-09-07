import { site } from '../data/site';
import Button from './Button';

const { cta } = site;

if (import.meta.env.DEV && cta.isPlaceholder) {
  console.warn(
    '[Tableau Day] cta.buttonHref is still the placeholder "%s". Set the real registration URL in src/data/site.ts before launch.',
    cta.buttonHref,
  );
}

/**
 * The closing registration footer: a full-bleed teal band spanning the viewport
 * edge to edge, white ink over it.
 *
 * Full-bleed rather than a boxed panel, so the `<section>` itself carries the
 * fill and reaches both edges; only the text inside is held to the page
 * container and centred, so lines do not run the full width of a wide monitor.
 * The fill is a flat teal-700 (`band-to`), and every ink is validated against
 * it: white `band-ink` is 5.15:1, `band-ink-muted` (teal-100) is 4.65:1, both
 * clearing AA.
 *
 * The button is `inverse` (light fill, dark ink), not `primary`: a teal button
 * would disappear into the teal band behind it.
 */
export default function RegisterCta() {
  return (
    <section
      aria-labelledby="register-cta"
      className="bg-band-to text-band-ink"
    >
      <div className="mx-auto flex max-w-page flex-col items-center px-6 py-12 text-center md:py-24">
        {/* Remains an h2 for the document outline while taking the H4 visual
            step — the wireframe gives this headline modest size. */}
        <h2 id="register-cta" className="text-h4">
          {cta.headline}
        </h2>

        <p className="mt-3 max-w-(--container-prose) text-small text-band-ink-muted">
          {cta.virtualNote}
        </p>

        <div className="mt-8">
          {/* One large button carries the deadline and the call to action
              together — the register-by date is the label, not a separate line
              above it. `inverse` (light fill, dark ink), not `primary`: a teal
              button would disappear into the teal band behind it. */}
          <Button href={cta.buttonHref} size="large" variant="inverse">
            {cta.buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
