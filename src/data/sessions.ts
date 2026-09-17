import type { SmallGroupSession } from '../types';

/**
 * The breakout line-up, as planned. Five sessions today; the section lays them
 * out in a grid that reflows, so adding a sixth needs no component change.
 *
 * These are the working titles as given, split into their parts rather than
 * reworded: "How to start on Avalanche: what's possible" becomes a title and a
 * `focus`, and "Why Cloud (for Aptiv) - Tableau" becomes a title plus the
 * audience and the team running it. Nothing here describes what a session
 * covers, because nobody has said yet — the cards are built to read as finished
 * with the title alone rather than inviting invented blurbs.
 */
export const smallGroupSessions: SmallGroupSession[] = [
  {
    id: 'why-cloud',
    title: 'Why Cloud',
    audience: 'Aptiv',
    host: 'Tableau',
  },
  {
    id: 'start-on-avalanche',
    title: 'How to Start on Avalanche',
    focus: 'What\u2019s possible',
  },
  {
    id: 'tips-and-tricks',
    title: 'Tips and Tricks on Tableau',
  },
  {
    id: 'storytelling',
    title: 'Storytelling Know-Hows',
    focus: 'Why Tableau is best for it',
  },
  {
    id: 'worth-learning',
    title: 'Why Tableau Is Worth Learning',
  },
];

/**
 * Sits under the section heading. The agenda places these — two breakout blocks
 * and the after-lunch slot — but names them only as slots ("Breakout 1",
 * "Breakout 2"), so this note is where the reader learns what is in them and
 * what is still open: who runs each one, and the titles.
 */
export const smallGroupSessionsNote =
  'Five sessions are planned, each run in a small group with room to ask questions. Four of them fill the two breakout blocks on the agenda, and tips and tricks runs alongside the Tableau roadmap after lunch. These are working titles until the line-up is confirmed.';
