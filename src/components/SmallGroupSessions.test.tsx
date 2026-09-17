import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SmallGroupSessions from './SmallGroupSessions';
import {
  smallGroupSessions,
  smallGroupSessionsNote,
} from '../data/sessions';

describe('SmallGroupSessions', () => {
  it('names the section with an accessible heading', () => {
    render(<SmallGroupSessions />);

    expect(
      screen.getByRole('region', { name: /small-group sessions/i }),
    ).toBeInTheDocument();
  });

  it('says the line-up is not final', () => {
    render(<SmallGroupSessions />);

    expect(screen.getByText(smallGroupSessionsNote)).toBeInTheDocument();
  });

  it('renders one card per session, titled as an h3', () => {
    const { container } = render(<SmallGroupSessions />);

    expect(container.querySelectorAll('li')).toHaveLength(
      smallGroupSessions.length,
    );

    for (const session of smallGroupSessions) {
      expect(
        screen.getByRole('heading', { level: 3, name: session.title }),
      ).toBeInTheDocument();
    }
  });

  it('renders the focus line only for the sessions that have one', () => {
    render(<SmallGroupSessions />);

    const withFocus = smallGroupSessions.filter((s) => s.focus);
    // Guards the optional fields: a session with nothing but a title must not
    // render an empty paragraph in place of its missing parts.
    expect(withFocus.length).toBeGreaterThan(0);
    expect(withFocus.length).toBeLessThan(smallGroupSessions.length);

    for (const session of withFocus) {
      expect(screen.getByText(session.focus!)).toBeInTheDocument();
    }
  });

  it('credits the audience and the host where both are known', () => {
    const { container } = render(<SmallGroupSessions />);

    for (const session of smallGroupSessions) {
      const card = screen.getByRole('heading', {
        level: 3,
        name: session.title,
      }).parentElement!;

      if (session.audience) {
        expect(card.textContent).toContain(`For ${session.audience}`);
      }
      if (session.host) {
        expect(card.textContent).toContain(session.host);
      }
    }

    // The separator between the two is punctuation, so it is hidden rather than
    // read out as a word.
    const separator = container.querySelector('[aria-hidden="true"]');
    expect(separator?.textContent).toContain('\u00B7');
  });
});
