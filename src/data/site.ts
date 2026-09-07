import tableauLogo from '../assets/tableau-logo.png';
import windRiverLogo from '../assets/wind-river-logo.webp';

/**
 * Single source of truth for event-level copy and dates.
 * Retargeting the site to another year should only require edits in here
 * plus the people/agenda data files.
 */

export interface PartnerLogo {
  src: string;
  /** Intrinsic pixel size, set on the img so the browser reserves space and the landing does not shift as the logo loads. */
  width: number;
  height: number;
  /**
   * Optical size correction, multiplied against the --size-logo token.
   *
   * Matching two logos on raw height alone makes one look wrong when their
   * letterforms differ: WNDRVR is all-caps and fills its full image height,
   * whereas the Tableau mark is lowercase with a plus-cluster that overshoots
   * the wordmark. Tableau therefore needs to render slightly larger to carry
   * the same visual weight. Tune this one number if the balance looks off.
   */
  opticalScale: number;
}

export interface Partner {
  /** Stable key for React lists. */
  id: string;
  /** Full organisation name — also the logo's alt text. */
  name: string;
  logo: PartnerLogo;
}

export interface CtaConfig {
  headline: string;
  virtualNote: string;
  buttonLabel: string;
  /**
   * PLACEHOLDER. Swap for the real registration form URL before launch.
   * `isPlaceholder` keeps the stub obvious so it cannot ship unnoticed.
   */
  buttonHref: string;
  isPlaceholder: boolean;
}

export interface SiteConfig {
  eventName: string;
  year: number;
  /** Landing headline. */
  title: string;
  /** ISO 8601 local time the countdown targets — doors open with coffee at 8:30 am. */
  eventStartIso: string;
  /** Human-readable date used in assistive text and the document outline. */
  eventDateLabel: string;
  /**
   * Intro block above the keynote roster.
   *
   * `lead` is a run of segments rather than a plain string so the key facts can
   * be emphasised from data: a segment with `emphasis: true` renders inside a
   * <strong>. `transition` is the hand-off sentence, shown on its own closer to
   * the speakers. `blurb` is the small hand-annotated note beside the Avalanche
   * logo ("Brought to you by...").
   */
  intro: {
    heading: string;
    lead: { text: string; emphasis?: boolean }[];
    transition: string;
    blurb: string;
  };
  partners: Partner[];
  cta: CtaConfig;
}

export const site: SiteConfig = {
  eventName: 'Tableau Day',
  year: 2026,
  title: 'Tableau Day 2026',
  eventStartIso: '2026-10-22T08:30:00',
  eventDateLabel: 'Thursday, October 22, 2026',
  intro: {
    heading: 'Tableau Day is Back!',
    lead: [
      { text: 'Join us for the second annual Wind River Tableau Day on ' },
      { text: 'October 22, 2026', emphasis: true },
      { text: ' in ' },
      { text: 'San Francisco', emphasis: true },
      {
        text: '. This complimentary, in-person event brings together Wind River Avalanche experts, Tableau professionals, and power users from across the organization for a day of hands-on learning, practical tips, and real stories of how your peers are using visual analytics to drive smarter decisions.',
      },
    ],
    transition:
      "Open to all Wind River and Aptiv employees worldwide, this year's event features keynotes from our featured speakers below.",
    blurb: 'Brought to you by the Avalanche team!',
  },
  partners: [
    {
      id: 'wind-river',
      name: 'Wind River',
      logo: { src: windRiverLogo, width: 960, height: 158, opticalScale: 1 },
    },
    {
      id: 'tableau',
      name: 'Tableau',
      logo: { src: tableauLogo, width: 518, height: 120, opticalScale: 1.3 },
    },
  ],
  cta: {
    headline: 'Free lunch. Big prizes. One catch: you have to be there!',
    virtualNote:
      'For virtual attendees, you will receive a Teams invite link after registration. We look forward to seeing you there!',
    buttonLabel: 'Register by October 17th',
    buttonHref: '#',
    isPlaceholder: true,
  },
};
