import { keynotes } from '../data/speakers';
import PersonCard from './PersonCard';
import Section from './Section';

/**
 * The keynote roster: three circular portraits from `lg`, two from `sm`, one
 * below that.
 *
 * Spacing here comes from the columns as much as from the gap, and deliberately
 * so. The grid fills the 90rem page container, so three `1fr` columns are
 * ~379px wide around a 240px portrait and the faces end up roughly 139px apart
 * — further than any gap on the scale would put them, and further than the 24px
 * a content-width grid gave when that was tried. `justify-items-center` centres
 * each portrait in its column, so the spread stays even as the container
 * narrows.
 *
 * `gap-8 sm:gap-12` is what binds on the way down: on one column it is the
 * vertical space between a role line and the next portrait, and on two it also
 * sets a floor under the column spread.
 */
export default function KeynoteSpeakers() {
  return (
    <Section id="keynote-speakers" title="Keynote Speakers" compactTop>
      <ul className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3">
        {keynotes.map((person) => (
          <PersonCard key={person.id} person={person} variant="keynote" />
        ))}
      </ul>
    </Section>
  );
}
