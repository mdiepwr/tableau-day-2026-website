import { benefits } from '../data/benefits';
import Section from './Section';

/**
 * Three benefit blocks, artwork beside copy, alternating sides down the page:
 * every second block sends its figure to the right with `md:order-last`. On one
 * column the figure always sits above its copy.
 *
 * No artwork exists yet, so each figure is a tinted panel carrying the brief for
 * the picture it stands in for — the requirement stays visible in the design
 * rather than living in a ticket.
 */
export default function Benefits() {
  return (
    <Section id="benefits" title="Why Learn Tableau Cloud">
      <ul className="grid gap-12 md:gap-16">
        {benefits.map((benefit, index) => (
          <li
            key={benefit.id}
            className="grid items-center gap-6 md:grid-cols-2 md:gap-12"
          >
            <div
              aria-hidden="true"
              className={`flex aspect-video items-center justify-center rounded-card bg-tint p-6 text-center ring-1 ring-divider ${
                index % 2 === 1 ? 'md:order-last' : ''
              }`}
            >
              <span className="text-small text-on-tint">
                {benefit.artworkBrief}
              </span>
            </div>

            <div>
              <h3 className="text-h3 tracking-tight text-heading">
                {benefit.title}
              </h3>
              <p className="mt-3 text-body-lg">{benefit.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
