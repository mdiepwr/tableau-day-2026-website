import type { PersonPhoto } from '../types';

export type AvatarVariant = 'keynote' | 'team';

interface AvatarProps {
  name: string;
  variant: AvatarVariant;
  /** Portrait, where we have one. Without it the circle carries initials. */
  photo?: PersonPhoto;
}

/**
 * Every fixed dimension resolves through a named token in index.css rather
 * than an inline magic size.
 */
const VARIANTS: Record<AvatarVariant, { box: string; text: string }> = {
  keynote: {
    box: 'size-(--size-avatar-keynote) md:size-(--size-avatar-keynote-lg) xl:size-(--size-avatar-keynote-xl)',
    text: 'text-h3',
  },
  team: {
    box: 'size-(--size-avatar-team) md:size-(--size-avatar-team-lg) xl:size-(--size-avatar-team-xl)',
    text: 'text-small',
  },
};

/** "Melanie Tummino" -> "MT". Falls back gracefully on single-word names. */
export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join('');
}

/**
 * A circular portrait, or a neutral circle carrying the person's initials where
 * we have no photo. Either way it is hidden from assistive technology, because
 * the name is rendered directly beneath it and announcing it twice adds nothing.
 *
 * The circle is the crop: portraits are square sources clipped by
 * `overflow-hidden rounded-full`, which also trims whatever sits in the corners
 * of a candid shot. `bg-tint` stays behind the image as the fill while it loads,
 * so the roster never shows a hole. Portraits sit below the fold, hence `lazy`.
 */
export default function Avatar({ name, variant, photo }: AvatarProps) {
  const { box, text } = VARIANTS[variant];
  const shell = `${box} flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-tint ring-1 ring-divider`;

  return (
    <div aria-hidden="true" className={shell}>
      {photo ? (
        <img
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      ) : (
        <span className={`${text} font-medium tracking-wide text-on-tint`}>
          {initialsOf(name)}
        </span>
      )}
    </div>
  );
}
