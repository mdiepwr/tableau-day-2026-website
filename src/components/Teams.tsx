import { avalancheTeam, tableauTeam } from '../data/speakers';
import type { Person } from '../types';
import PersonCard from './PersonCard';
import { SECTION_CONTAINER, SECTION_CONTENT_GAP } from './Section';
import SectionHeading from './SectionHeading';

interface Team {
  id: string;
  title: string;
  members: Person[];
}

const TEAMS: Team[] = [
  { id: 'avalanche-team', title: 'Avalanche Team', members: avalancheTeam },
  { id: 'tableau-team', title: 'Tableau Team', members: tableauTeam },
];

/**
 * Two peer sections side by side. Both headings are h2 so the document
 * outline stays flat — the wireframe gives them equal weight and there is no
 * parent heading above them to nest under.
 *
 * Each roster is three per row from `sm`, dropping to two on the narrowest
 * viewports where three cells cannot hold a name. The columns only sit side by
 * side from `lg`, not `md`: halving the width at 768px would leave 96px per
 * cell, which is narrower than the portrait itself. So the sequence is one
 * column of three, then two columns of three once there is room for both.
 *
 * Columns are top-aligned so an uneven roster length does not stretch its
 * neighbour.
 */
export default function Teams() {
  return (
    <div className={`${SECTION_CONTAINER} grid items-start gap-16 lg:grid-cols-2 lg:gap-12`}>
      {TEAMS.map((team) => (
        <section key={team.id} aria-labelledby={team.id}>
          <SectionHeading id={team.id}>{team.title}</SectionHeading>

          <ul
            className={`${SECTION_CONTENT_GAP} grid grid-cols-2 justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3`}
          >
            {team.members.map((person) => (
              <PersonCard key={person.id} person={person} variant="team" />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
