import {
  smallGroupSessions,
  smallGroupSessionsNote,
} from '../data/sessions';
import Section from './Section';

/**
 * The breakout line-up, as a grid of cards in the agenda's band.
 *
 * It sits directly under the agenda on purpose: the table names the two
 * breakout blocks and no more — they are "Breakout 1" and "Breakout 2" there,
 * a slot and a time — and this is what fills them in. Same band, so the two
 * read as one part of the page — the day, then the choice within it.
 *
 * The cards are `surface` on the agenda band's `page` fill, the same layering
 * the agenda table uses, and they carry a title and nothing else where nothing
 * else is known. That is the reason there is no artwork, icon or number on
 * them: a number would imply a running order these do not have, and an icon per
 * session would be five decisions made to fill space. The grid reflows 1 → 2 →
 * 3 columns, which leaves the fifth card alone on its row at `lg` — honest about
 * there being five rather than padded to six.
 *
 * The heading is an h3 under the section's h2, so the outline stays two deep
 * here as it does in the benefit blocks.
 */
export default function SmallGroupSessions() {
  return (
    <Section id="small-group-sessions" title="Small-Group Sessions">
      <p className="max-w-(--container-prose) text-body-lg">
        {smallGroupSessionsNote}
      </p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
        {smallGroupSessions.map((session) => (
          <li
            key={session.id}
            className="rounded-card border border-divider bg-surface p-6"
          >
            <h3 className="text-h4 tracking-tight text-heading">
              {session.title}
            </h3>

            {session.focus && (
              <p className="mt-2 text-body text-muted">{session.focus}</p>
            )}

            {(session.audience || session.host) && (
              <p className="mt-4 text-small">
                {session.audience && (
                  <span className="text-muted">For {session.audience}</span>
                )}
                {/* Punctuation between two facts, so it is hidden from assistive
                    tech the way the testimonial em dash is: the line is heard as
                    "For Aptiv. Tableau", not "For Aptiv middle dot Tableau". */}
                {session.audience && session.host && (
                  <span aria-hidden="true" className="text-muted">
                    {' \u00B7 '}
                  </span>
                )}
                {session.host && (
                  <span className="font-semibold text-accent-strong">
                    {session.host}
                  </span>
                )}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
