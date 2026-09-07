/**
 * A portrait. Square by requirement: the avatar is a circle, so a rectangular
 * source would crop unevenly. Intrinsic dimensions are recorded so the browser
 * reserves the space and the roster does not reflow as portraits load.
 */
export interface PersonPhoto {
  src: string;
  width: number;
  height: number;
}

/** A person shown in the keynote or team grids. */
export interface Person {
  /** Stable key for React lists. */
  id: string;
  name: string;
  /**
   * Job title. Use the TBD constant where the title is not yet confirmed so
   * unfinished entries are greppable rather than silently blank.
   */
  role: string;
  /** Portrait. Omitted where we have no photo — the avatar falls back to initials. */
  photo?: PersonPhoto;
}

/** One row of the agenda table. */
export interface AgendaRow {
  id: string;
  /** Time range as displayed, e.g. "9:15 – 9:45 AM". */
  time: string;
  session: string;
  /** Speaker names, one per line. Empty means "no speaker for this slot". */
  speakers: string[];
  /**
   * Marks a break or meal slot (coffee, break, lunch) rather than a content
   * session. Given a light teal row wash to set it apart from the sessions.
   */
  isBreak?: boolean;
}

/** One block in the "why Tableau Cloud" section. */
export interface Benefit {
  id: string;
  title: string;
  body: string;
  /** What the artwork should show. Rendered in the placeholder until it exists. */
  artworkBrief: string;
}

/** One testimonial. */
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
}

/** Placeholder for a title we do not know yet. */
export const TBD = 'Title TBD';
