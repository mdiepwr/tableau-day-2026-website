import { SPEAKER_TBD, type AgendaRow } from '../types';

/**
 * Day-of schedule, from the current planning sheet (start, duration, end,
 * speaker, description). Only the start time is displayed: each slot runs until
 * the next one begins, so an end time repeats the row below it, and a range
 * doubled the width of the narrowest column for no extra information. The one
 * thing lost with it is the 5:00 PM close of office hours, which nothing else
 * on the page states.
 *
 * An empty `speakers` array leaves the Speakers cell blank — the null value for
 * a slot that has no speaker by nature, which is why only the coffee, break and
 * lunch rows use it. A content session with nobody assigned yet takes
 * `SPEAKER_TBD` instead, so "not decided" is visibly different from "nobody
 * presents this".
 *
 * Break and meal slots carry `isBreak` so the table can set them apart from the
 * content sessions. Times are a start only, with an uppercased meridiem, e.g.
 * "9:15 AM".
 *
 * Note that entries like "Wind River Avalanche Team" are a single speaker
 * credit that wraps onto two lines, not two separate speakers.
 */
export const agenda: AgendaRow[] = [
  {
    id: 'coffee',
    time: '8:30 AM',
    session: 'Coffee/Breakfast',
    speakers: [],
    isBreak: true,
  },
  {
    id: 'welcome',
    time: '9:00 AM',
    session: 'Welcome',
    speakers: ['Lieu Ta'],
  },
  {
    id: 'exec-keynote',
    time: '9:15 AM',
    session: 'Executive Keynote',
    speakers: ['Chris B'],
  },
  {
    id: 'tableau-keynote',
    time: '9:35 AM',
    session: 'Tableau Exec Keynote',
    speakers: ['Tableau Team'],
  },
  {
    id: 'avalanche-showcase',
    time: '9:55 AM',
    session: 'Avalanche Showcase',
    speakers: [SPEAKER_TBD],
  },
  {
    id: 'success-story-morning',
    time: '10:25 AM',
    session: 'Success Story',
    speakers: [SPEAKER_TBD],
  },
  {
    id: 'break',
    time: '10:35 AM',
    session: 'Break',
    speakers: [],
    isBreak: true,
  },
  {
    id: 'breakout-first',
    time: '10:50 AM',
    session: 'Breakout 1',
    speakers: [SPEAKER_TBD],
  },
  {
    id: 'success-story-midday',
    time: '11:50 AM',
    session: 'Success Story',
    speakers: [SPEAKER_TBD],
  },
  {
    id: 'lunch',
    time: '12:00 PM',
    session: 'Lunch',
    speakers: [],
    isBreak: true,
  },
  {
    id: 'roadmap-tips',
    time: '1:00 PM',
    session: 'Tableau Roadmap; Tips & Tricks',
    speakers: [SPEAKER_TBD],
  },
  {
    id: 'breakout-second',
    time: '1:30 PM',
    session: 'Breakout 2',
    speakers: [SPEAKER_TBD],
  },
  {
    id: 'qa-closing',
    time: '2:30 PM',
    session: 'Q&A and Closing',
    speakers: [SPEAKER_TBD],
  },
  {
    id: 'office-hours',
    time: '3:00 PM',
    session: 'WR Office Hours (1:1 sessions)',
    speakers: [SPEAKER_TBD],
  },
];
