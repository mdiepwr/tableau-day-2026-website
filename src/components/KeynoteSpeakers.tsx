import { keynotes } from '../data/speakers';
import PersonCard from './PersonCard';
import Section from './Section';

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
