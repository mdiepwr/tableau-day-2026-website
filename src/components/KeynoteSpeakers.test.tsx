import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import KeynoteSpeakers from './KeynoteSpeakers';
import { initialsOf } from './Avatar';
import { keynotes } from '../data/speakers';
import { TBD } from '../types';

describe('KeynoteSpeakers', () => {
  it('renders one list item per keynote in the data file', () => {
    render(<KeynoteSpeakers />);

    expect(screen.getAllByRole('listitem')).toHaveLength(keynotes.length);
  });

  it('renders every keynote name and role', () => {
    render(<KeynoteSpeakers />);

    for (const person of keynotes) {
      expect(screen.getByText(person.name)).toBeInTheDocument();
      // getAllByText, because two of the three placeholders share the same TBD
      // role string and an exact lookup would find both and throw.
      expect(screen.getAllByText(person.role).length).toBeGreaterThan(0);
    }
  });

  it('carries placeholders whose role is visibly unconfirmed', () => {
    render(<KeynoteSpeakers />);

    // Chris B and the Tableau speaker are both unnamed or untitled on the
    // planning sheet. The roster is allowed to say so — what it must not do is
    // invent a title — so TBD showing here is the intended state, not a gap.
    const placeholders = keynotes.filter((person) => person.role === TBD);

    expect(placeholders.length).toBeGreaterThan(0);
    expect(screen.getAllByText(TBD)).toHaveLength(placeholders.length);
  });

  it('names the section with an accessible heading', () => {
    render(<KeynoteSpeakers />);

    expect(
      screen.getByRole('region', { name: /keynote speakers/i }),
    ).toBeInTheDocument();
  });

  it('shows a portrait where the data file has one, and initials otherwise', () => {
    const { container } = render(<KeynoteSpeakers />);

    // Portraits are decorative — the name sits right beneath them — so they
    // carry no accessible name and have to be found by attribute.
    const portraits = container.querySelectorAll('img[alt=""]');
    const withPhoto = keynotes.filter((person) => person.photo);

    expect(portraits).toHaveLength(withPhoto.length);

    for (const person of withPhoto) {
      const portrait = container.querySelector(
        `img[src="${person.photo!.src}"]`,
      );

      expect(portrait).toBeInTheDocument();
      // Intrinsic size must be present so the roster does not reflow on load.
      expect(portrait).toHaveAttribute('width', String(person.photo!.width));
      expect(portrait).toHaveAttribute('height', String(person.photo!.height));
    }

    for (const person of keynotes.filter((p) => !p.photo)) {
      expect(screen.getByText(initialsOf(person.name))).toBeInTheDocument();
    }
  });

  it('crops keynote portraits to a circle', () => {
    const { container } = render(<KeynoteSpeakers />);

    // The shell is the crop, so the radius lives on the wrapper rather than on
    // the image — which is also what trims the corners of a candid shot.
    const shells = container.querySelectorAll('[aria-hidden="true"]');

    expect(shells).toHaveLength(keynotes.length);
    for (const shell of shells) {
      expect(shell.className).toContain('rounded-full');
      expect(shell.className).toContain('overflow-hidden');
    }
  });
});

describe('initialsOf', () => {
  it('takes the first letter of the first two words', () => {
    expect(initialsOf('Kristen Crocco')).toBe('KC');
  });

  it('ignores words beyond the second', () => {
    expect(initialsOf('Pal Suraj Reddy')).toBe('PS');
  });

  it('handles a single-word name', () => {
    expect(initialsOf('Prince')).toBe('P');
  });

  it('tolerates extra whitespace', () => {
    expect(initialsOf('  Lieu   Ta  ')).toBe('LT');
  });
});
