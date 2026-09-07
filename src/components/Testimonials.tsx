import { testimonials } from '../data/testimonials';
import Section from './Section';

/**
 * Two centred pull-quotes. `text-h3 font-normal` is the one place a step's
 * weight is overridden: the h3 size reads as a quote, but its 600 weight would
 * read as a heading.
 *
 * figure + blockquote + figcaption is what ties each quote to its attribution.
 * The em dash is punctuation, so it is hidden from assistive tech, which hears
 * "Jane Doe, FP&A Analyst".
 */
export default function Testimonials() {
  return (
    <Section id="testimonials" title="Testimonials">
      <ul className="grid gap-12 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <li key={testimonial.id}>
            <figure className="text-center">
              <blockquote className="text-h3 font-normal">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>

              <figcaption className="mt-4 text-small">
                <span aria-hidden="true">&mdash; </span>
                <span className="font-semibold text-accent-strong">
                  {testimonial.name}
                </span>
                <span className="text-muted">, {testimonial.role}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
