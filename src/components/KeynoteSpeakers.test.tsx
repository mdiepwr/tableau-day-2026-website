import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import KeynoteSpeakers from './KeynoteSpeakers';
import { initialsOf } from './Avatar';
import { keynotes } from '../data/speakers';

describe('KeynoteSpeakers', () => {
  it('renders one list item per keynote in the data file', () => {
    render(<KeynoteSpeakers />);

    expect(screen.getAllByRole('listitem')).toHaveLength(keynotes.length);
  });

  it('renders every keynote name and role', () => {
    render(<KeynoteSpeakers />);

    for (const person of keynotes) {
      expect(screen.getByText(person.name)).toBeInTheDocument();
      expect(screen.getByText(person.role)).toBeInTheDocument();
    }
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
});

describe('initialsOf', () => {
  it('takes the first letter of the first two words', () => {
    expect(initialsOf('Melanie Tummino')).toBe('MT');
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
