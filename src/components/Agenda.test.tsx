import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Agenda from './Agenda';
import { agenda } from '../data/agenda';

describe('Agenda', () => {
  it('renders the three column headers', () => {
    render(<Agenda />);

    for (const column of ['Time', 'Session/Activity', 'Speakers']) {
      expect(
        screen.getByRole('columnheader', { name: column }),
      ).toBeInTheDocument();
    }
  });

  it('renders one body row per agenda entry', () => {
    render(<Agenda />);

    // getAllByRole('row') includes the header row.
    expect(screen.getAllByRole('row')).toHaveLength(agenda.length + 1);
  });

  it('renders every session name and time', () => {
    render(<Agenda />);

    for (const row of agenda) {
      expect(screen.getByText(row.time)).toBeInTheDocument();
      expect(screen.getByText(row.session)).toBeInTheDocument();
    }
  });

  it('leaves the speaker cell blank for slots without a speaker', () => {
    const { container } = render(<Agenda />);

    const emptySlots = agenda.filter((row) => row.speakers.length === 0);
    expect(emptySlots.length).toBeGreaterThan(0);

    // Each body row's third cell is the Speakers column; for an empty slot it
    // carries no text rather than a placeholder dash.
    const bodyRows = container.querySelectorAll('tbody tr');
    for (const row of agenda) {
      if (row.speakers.length > 0) continue;
      const index = agenda.indexOf(row);
      const speakerCell = bodyRows[index]!.querySelectorAll('td')[1]!;
      expect(speakerCell.textContent).toBe('');
    }
  });

  it('sets break and meal rows apart with a tint, and no others', () => {
    const { container } = render(<Agenda />);

    const bodyRows = container.querySelectorAll('tbody tr');
    agenda.forEach((row, index) => {
      const tr = bodyRows[index]!;
      if (row.isBreak) {
        expect(tr.className).toContain('bg-tint');
      } else {
        expect(tr.className).not.toContain('bg-tint');
      }
      // No italics anywhere in the table body.
      expect(tr.className).not.toContain('italic');
    });
  });

  it('gives the table an accessible caption', () => {
    render(<Agenda />);

    expect(screen.getByRole('table')).toHaveAccessibleName(/agenda/i);
  });
});
