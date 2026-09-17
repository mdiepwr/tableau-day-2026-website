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
 *
 * `gap` is the space between the portrait and the name. The keynote step is one
 * larger, so the name sits closer to its own portrait than the portraits do to
 * each other and the row does not read as pictures above captions. `width` ties
 * the text block to the portrait, which keeps a long role wrapping under its own
 * circle instead of widening the grid column it sits in.
 */
const TYPE_SCALE: Record<
  AvatarVariant,
  { name: string; role: string; gap: string; width: string }
> = {
  keynote: {
    name: 'text-h4',
    role: 'text-body',
    gap: 'gap-4',
    width:
      'w-(--size-avatar-keynote) md:w-(--size-avatar-keynote-lg) xl:w-(--size-avatar-keynote-xl)',
  },
  team: {
    name: 'text-body font-semibold',
    role: 'text-small',
    gap: 'gap-3',
    width: '',
  },
};

/**
 * A person is a list item, not a card: no border, no shadow. The avatar plus
 * two lines of text is the whole unit.
 */
export default function PersonCard({ person, variant }: PersonCardProps) {
  const scale = TYPE_SCALE[variant];

  return (
    <li className={`flex flex-col items-center text-center ${scale.gap}`}>
      <Avatar name={person.name} variant={variant} photo={person.photo} />
      <div className={scale.width}>
        <p className={`${scale.name} text-accent-strong`}>{person.name}</p>
        <p className={`${scale.role} mt-1 text-muted`}>{person.role}</p>
      </div>
    </li>
  );
}
