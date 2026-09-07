import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Teams from './Teams';
import { initialsOf } from './Avatar';
import { avalancheTeam, tableauTeam } from '../data/speakers';

describe('Teams', () => {
  it('renders both team headings', () => {
    render(<Teams />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Avalanche Team' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Tableau Team' }),
    ).toBeInTheDocument();
  });

  it('renders one card per Avalanche member', () => {
    render(<Teams />);

    const avalanche = screen.getByRole('region', { name: 'Avalanche Team' });

    expect(
      avalanche.querySelectorAll('li'),
    ).toHaveLength(avalancheTeam.length);
  });

  it('renders one card per Tableau member', () => {
    render(<Teams />);

    const tableau = screen.getByRole('region', { name: 'Tableau Team' });

    expect(tableau.querySelectorAll('li')).toHaveLength(tableauTeam.length);
  });

  it('renders every Avalanche member by name', () => {
    render(<Teams />);

    for (const person of avalancheTeam) {
      expect(screen.getByText(person.name)).toBeInTheDocument();
    }
  });

  it('mixes portraits and initials in the Avalanche roster', () => {
    render(<Teams />);

    const avalanche = screen.getByRole('region', { name: 'Avalanche Team' });
    const withPhoto = avalancheTeam.filter((person) => person.photo);
    const withoutPhoto = avalancheTeam.filter((person) => !person.photo);

    // Both paths must be exercised, or this test stops meaning anything.
    expect(withPhoto.length).toBeGreaterThan(0);
    expect(withoutPhoto.length).toBeGreaterThan(0);

    expect(avalanche.querySelectorAll('img[alt=""]')).toHaveLength(
      withPhoto.length,
    );

    for (const person of withoutPhoto) {
      expect(
        screen.getAllByText(initialsOf(person.name)).length,
      ).toBeGreaterThan(0);
    }
  });
});
