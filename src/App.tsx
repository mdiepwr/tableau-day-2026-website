import Agenda from './components/Agenda';
import Band from './components/Band';
import Benefits from './components/Benefits';
import Intro from './components/Intro';
import KeynoteSpeakers from './components/KeynoteSpeakers';
import Landing from './components/Landing';
import RegisterCta from './components/RegisterCta';
import Teams from './components/Teams';
import Testimonials from './components/Testimonials';

/**
 * Four content bands.
 *
 * The landing, the people block and the agenda are separated by curve rather
 * than by line: each band is pulled up over the one above it and carries a
 * large top radius, so its fill sweeps across the seam. Tones alternate
 * page / surface / page, because the curve is only visible where the fill
 * behind it differs.
 *
 * "Speakers" is read as the whole people block — the intro lead-in, the
 * keynotes and both team columns — so one band carries all of them, and the
 * agenda curves over the block as a whole rather than splitting the intro or
 * keynotes off from the teams.
 *
 * The benefits and testimonials sections share that same surface band rather
 * than taking one of their own. Tones have to alternate, so a new band here
 * would push the agenda from page to surface and leave a surface band ending
 * against the page-coloured divider above the CTA — a hard straight seam where
 * the curve is meant to be. Inside a band, sections are separated the
 * documented way: their own `py-12 md:py-24`, whitespace rather than boxes.
 *
 * The registration footer is a full-bleed teal band spanning the viewport edge
 * to edge, closing the page. It carries its own gradient and needs no divider
 * or curve above it: running full width and switching to the dark teal fill is
 * itself the break from the page-toned agenda band above.
 */
export default function App() {
  return (
    <main>
      <Landing />

      <Band tone="surface">
        <Intro />
        <KeynoteSpeakers />
        <Teams />
        <Benefits />
        <Testimonials />
      </Band>

      <Band tone="page">
        <Agenda />
      </Band>

      <RegisterCta />
    </main>
  );
}
