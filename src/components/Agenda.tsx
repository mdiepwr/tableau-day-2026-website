import { agenda } from '../data/agenda';
import { site } from '../data/site';
import Section from './Section';

const COLUMNS = ['Time', 'Session/Activity', 'Speakers'] as const;

/**
 * Cells no longer carry borders — the zebra striping is the only row
 * separator now — so they need a touch more vertical padding to keep the rows
 * from feeling cramped without the lines: py-4 rather than py-3.
 */
const CELL = 'px-4 py-4 align-top';
/**
 * Header labels take `text-body-lg` (18px) rather than the table's 16px body,
 * a step larger so the column titles read as headers. No italic.
 */
const HEADER_CELL = `${CELL} bg-tint text-center text-body-lg font-semibold text-on-tint`;

export default function Agenda() {
  return (
    <Section id="agenda" title="Agenda">
      {/*
        The palette favours layering over hard borders: offwhite-300 is only
        1.14:1 against the page, so gridlines never did much work here. The
        tinted header and the alternating row fill carry the structure on their
        own, which is why the inter-row borders are gone.
      */}
      <div className="rounded-card border border-divider bg-surface p-4 sm:p-6">
        {/* Narrow screens scroll the table sideways rather than crushing three
            columns into unreadable slivers. */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-(--width-agenda-min) border-collapse text-left text-body">
            <caption className="sr-only">
              {site.title} agenda for {site.eventDateLabel}, listing each
              session with its time and speakers.
            </caption>

            <thead>
              <tr>
                {COLUMNS.map((column) => (
                  <th key={column} scope="col" className={HEADER_CELL}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {agenda.map((row) => (
                <tr
                  key={row.id}
                  // Zebra striping is the default row separator. Break and meal
                  // slots take a light teal wash instead of their zebra fill, so
                  // they are set apart by type — no italics, no rule.
                  className={row.isBreak ? 'bg-tint' : 'odd:bg-page'}
                >
                  {/* Times are bold, which is enough to separate the column
                      from the session text without a border between them. */}
                  <th scope="row" className={`${CELL} font-semibold`}>
                    {row.time}
                  </th>
                  <td className={CELL}>{row.session}</td>
                  {/* A slot with no named speaker leaves the cell blank. */}
                  <td className={CELL}>
                    {row.speakers.map((speaker) => (
                      <span key={speaker} className="block">
                        {speaker}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
