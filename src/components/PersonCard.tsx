import type { Person } from '../types';
import Avatar, { type AvatarVariant } from './Avatar';

interface PersonCardProps {
  person: Person;
  variant: AvatarVariant;
}

/**
 * Names take a heading step for presence even though they are not headings;
 * the team variant sits at body size and borrows a heavier weight instead,
 * since a 20px step would crowd a two-per-row grid.
 */
const TYPE_SCALE: Record<AvatarVariant, { name: string; role: string }> = {
  keynote: { name: 'text-h4', role: 'text-body' },
  team: { name: 'text-body font-semibold', role: 'text-small' },
};

/**
 * A person is a list item, not a card: no border, no shadow. The avatar plus
 * two lines of text is the whole unit.
 */
export default function PersonCard({ person, variant }: PersonCardProps) {
  const scale = TYPE_SCALE[variant];

  return (
    <li className="flex flex-col items-center gap-3 text-center">
      <Avatar name={person.name} variant={variant} photo={person.photo} />
      <div>
        <p className={`${scale.name} text-accent-strong`}>{person.name}</p>
        <p className={`${scale.role} mt-1 text-muted`}>{person.role}</p>
      </div>
    </li>
  );
}
