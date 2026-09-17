import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Agenda from './Agenda';
import { agenda } from '../data/agenda';
import { SPEAKER_TBD } from '../types';

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

  it('renders every session name and time, in order', () => {
    const { container } = render(<Agenda />);

    // Asserted row by row rather than by searching the document, because the
    // schedule repeats a session name — "Success Story" runs twice — and a
    // global text lookup cannot tell the two apart.
    const bodyRows = container.querySelectorAll('tbody tr');

    agenda.forEach((row, index) => {
      const cells = bodyRows[index]!.querySelectorAll('th, td');

      expect(cells[0]!.textContent).toBe(row.time);
      expect(cells[1]!.textContent).toBe(row.session);
      expect(cells[2]!.textContent).toBe(row.speakers.join(''));
    });
  });

  it('shows a start time only, in one format', () => {
    // The column is capped at --width-agenda-time on the strength of "12:00 PM"
    // being the longest string it holds. A range, or a lowercase "am", would
    // either overflow the cap or read as a second format.
    for (const row of agenda) {
      expect(row.time).toMatch(/^\d{1,2}:\d{2} (?:AM|PM)$/);
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

  it('gives an unassigned content session a placeholder speaker, and a break none', () => {
    const { container } = render(<Agenda />);
    const bodyRows = container.querySelectorAll('tbody tr');

    const unassigned = agenda.filter((row) =>
      row.speakers.includes(SPEAKER_TBD),
    );
    expect(unassigned.length).toBeGreaterThan(0);

    for (const row of unassigned) {
      const cells = bodyRows[agenda.indexOf(row)]!.querySelectorAll('td');
      expect(cells[1]!.textContent).toBe(SPEAKER_TBD);
    }

    // A break or meal keeps its cell empty. The two states have to stay
    // distinguishable: blank means the slot has no speaker at all, the
    // placeholder means one has not been chosen.
    for (const row of agenda.filter((r) => r.isBreak)) {
      expect(row.speakers).toEqual([]);
    }
  });

  it('gives the table an accessible caption', () => {
    render(<Agenda />);

    expect(screen.getByRole('table')).toHaveAccessibleName(/agenda/i);
  });
});
