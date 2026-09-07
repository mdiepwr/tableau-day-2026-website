import type { Benefit } from '../types';

/**
 * The three blocks under "Why Learn Tableau Cloud". Copy only — the section
 * alternates sides by index, so reordering this array reflows the layout.
 */
export const benefits: Benefit[] = [
  {
    id: 'one-source',
    title: 'One Link, One Version of the Numbers',
    body: 'Workbooks live in the cloud instead of on someone\u2019s laptop. There is no extract to refresh by hand and no third copy of last quarter to reconcile — everyone opens the same link and reads the same figures.',
    artworkBrief: 'Two teammates reviewing the same dashboard on a shared screen',
  },
  {
    id: 'self-service',
    title: 'Answers Without a Ticket',
    body: 'Publish once and stakeholders filter, drill and export for themselves. Questions that used to arrive as report requests get answered in the dashboard, which gives the analysts their week back.',
    artworkBrief: 'A stakeholder filtering a published dashboard on a laptop',
  },
  {
    id: 'reuse',
    title: 'Model Once, Reuse Everywhere',
    body: 'Published data sources carry their joins, calculations and definitions with them, so the next workbook starts from work that is already done — and a new analyst inherits the model instead of rebuilding it.',
    artworkBrief: 'One published data source feeding several workbooks',
  },
];
