import type { AgendaRow } from '../types';

/**
 * Day-of schedule. An empty `speakers` array leaves the Speakers cell blank —
 * the null value for a slot with no named speaker, such as coffee or a break.
 *
 * Break and meal slots carry `isBreak` so the table can set them apart from the
 * content sessions. Times use a spaced en dash for ranges and a single
 * uppercased meridiem, e.g. "9:15 – 9:45 AM".
 *
 * Note that entries like "Wind River Avalanche Team" are a single speaker
 * credit that wraps onto two lines, not two separate speakers.
 */
export const agenda: AgendaRow[] = [
  {
    id: 'coffee',
    time: '8:30 – 9:00 AM',
    session: 'Coffee with Snacks',
    speakers: [],
    isBreak: true,
  },
  {
    id: 'welcome',
    time: '9:00 – 9:15 AM',
    session: 'Welcome',
    speakers: ['Lieu Ta'],
  },
  {
    id: 'keynotes',
    time: '9:15 – 9:45 AM',
    session: 'Executive Keynotes',
    speakers: ['Sean Lamb', 'Melissa Jacob'],
  },
  {
    id: 'showcase',
    time: '9:45 – 10:15 AM',
    session: 'Showcase of Wind River Avalanche',
    speakers: ['Wind River Avalanche Team'],
  },
  {
    id: 'break',
    time: '10:15 – 10:30 AM',
    session: 'Break',
    speakers: [],
    isBreak: true,
  },
  {
    id: 'breakouts',
    time: '10:30 – 11:30 AM',
    session: 'Breakout Sessions',
    speakers: ['Tableau & Wind River Avalanche Team'],
  },
  {
    id: 'lunch',
    time: '11:30 – 1:00 PM',
    session: 'Lunch & Learn',
    speakers: ['Tableau Team'],
    isBreak: true,
  },
  {
    id: 'closing',
    time: '1:00 PM',
    session: 'Closing & Conclusions',
    speakers: ['Lieu Ta'],
  },
  {
    id: 'office-hours',
    time: '2:00 – 5:00 PM',
    session: 'Office Hours (1:1 Sessions)',
    speakers: ['Wind River Avalanche Team'],
  },
];
