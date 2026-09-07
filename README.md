# tableau-day-2026-website

Website for Wind River's Tableau Day 2026.

Single-page site built with Vite, React, TypeScript and Tailwind CSS v4. Set
throughout in Outfit, with the landing drawn one and a half times the base
scale. Partner logos are final;
five portraits are in place and the rest of the roster still shows initials.

## Getting started

```bash
npm install
npm run dev      # dev server on http://localhost:5173
npm test         # Vitest + React Testing Library
npm run build    # typecheck, then production build to dist/
npm run preview  # serve the production build locally
```

## Deploying to GitHub Pages

The site deploys automatically to
**https://mdiepwr.github.io/tableau-day-2026-website/** on every push to `main`,
via `.github/workflows/deploy.yml` (it installs, tests, builds and publishes the
`dist/` output as a Pages artifact — no `gh-pages` branch).

One-time setup in the repository: **Settings → Pages → Build and deployment →
Source: GitHub Actions**. After that, pushing to `main` is all that is needed.

Because this is a *project* site served from a subpath, `vite.config.ts` sets
`base: '/tableau-day-2026-website/'` so the built asset URLs resolve. If the
repo is renamed, or moved to a user site (`mdiepwr.github.io`), update `base` to
match — otherwise the page loads but every script, style and image 404s.

`dist/` is intentionally git-ignored: the deployed build is produced by the
workflow, not committed.

## Editing content

No component changes are needed to update copy or people — everything lives in
`src/data/`:

| File | Controls |
| --- | --- |
| `data/site.ts` | Event title, countdown target date, the intro lead paragraphs, partner wordmarks, all CTA copy, registration URL |
| `data/speakers.ts` | Keynote speakers, Avalanche team, Tableau team, and each person's portrait |
| `data/agenda.ts` | Agenda table rows |
| `data/benefits.ts` | The three "Why learn Tableau Cloud" blocks, including the brief for each block's artwork |
| `data/testimonials.ts` | Pull-quotes and their attribution (currently placeholder copy) |

Design tokens — colours, radii, container width and the named avatar/cluster
dimensions — are declared in one `@theme` block at the top of `src/index.css`.
Components reference tokens by name and never hard-code a colour or size.

## Design system

The authoritative guideline is **`.kiro/steering/design-system.md`**, which is
loaded automatically into every Kiro CLI session so future work follows it
without being reminded. It covers the colour palette, type scale, spacing
scale, button recipes and the reasoning behind each contrast decision.

Tokens are declared in one `@theme static` block at the top of `src/index.css`.
Components reference them by name and never hard-code a value.

Colour is two-tiered: a palette of record (`teal-100`…`teal-900`, `black-700`…
`black-900`, `gray-400`, `gray-500`, `offwhite-100`…`offwhite-300`) and semantic
aliases that components actually use (`page`, `surface`, `divider`, `heading`,
`body`, `muted`, `muted-light`, `accent`, `primary`, `tint`, `band-*`). Reach for
the palette tier only when adding a new alias.

Two Tailwind defaults are deliberately cleared and replaced, so off-scale
values cannot be written by accident:

- `--text-*: initial` removes `text-xs` … `text-9xl`. Only the ten steps
  below
  exist.
- `--spacing: initial` disables Tailwind's dynamic spacing, which would
  otherwise invent any 4px multiple on demand (`p-5`, `p-7`, `p-13` …).

### Typography

One utility applies size, line-height and weight together, so the three cannot
drift apart. The scale is mobile-first; heading steps step up at `md` (768px)
by overriding the token itself, which means one class per element stays correct
at both sizes.

| Utility | Mobile | Desktop | Line-height | Weight |
| --- | --- | --- | --- | --- |
| `text-display` | 67px | 115px | 1.05 | 400 |
| `text-countdown` | 32px | 40px | 1.15 | 400 |
| `text-h1` | 32px | 40px | 1.15 | 700 |
| `text-h2` | 24px | 32px | 1.2 | 600 |
| `text-h3` | 20px | 24px | 1.25 | 600 |
| `text-h4` | 18px | 20px | 1.3 | 600 |
| `text-body-lg` | 18px | 18px | 1.5 | 400 |
| `text-body` | 16px | 16px | 1.5 | 400 |
| `text-small` | 14px | 14px | 1.4 | 400 |
| `text-micro` | 12px | 12px | 1.4 | 400 |

Body never drops below 16px at any viewport, which also stops iOS from
auto-zooming form fields.

Visual step and semantic level are chosen independently — the registration
headline stays an `h2` for the document outline while taking the `text-h4`
step, because the wireframe gives it modest size.

The first two steps belong to the landing. `text-display` is the landing `h1`
and nothing else, and it takes `--title-scale` — `--hero-scale × 0.8` — because
the title must set on one line and the full hero scale broke it in two.
`text-countdown` belongs to `Countdown` alone and is a flat 32/40px at weight
400: it once scaled with the hero as well, but at 48/60px it read as too loud
beside the smaller title and left no room to centre the hero vertically, so it
was pulled back to the base size and a lighter weight. `--hero-scale` still
drives `text-display` and `--size-logo`, so the landing is tuned through one
number.

"Tableau Day 2026" measures 7.8em in Outfit at `tracking-tight`, so at 115px it
occupies 898px, well inside the 90rem (1440px) page container. The desktop step
also caps itself at `(100vw - 3rem) / 8`, which keeps the line intact between
768px and the ~976px that 115px needs. Mobile does not attempt one line — a
390px viewport leaves 342px — so it wraps to "Tableau" / "Day 2026". Changing
the title copy invalidates the 7.8em measurement. Weight 400 is deliberate: at
that size Outfit's geometric skeleton carries the title, and bold would make it
heavy rather than large.

The whole site is set in **Outfit** (Google Fonts, OFL), requested at 400/600
/700 — the only weights the scale asks for, so nothing is synthesised. One
family has two costs here: Outfit ships no italic, so the intro's italic
annotation is a browser-synthesised oblique, and its tabular-figure coverage
is unverified, so the countdown depends on a fixed column width rather than on
`tabular-nums` to keep changing digits from shifting.

### Spacing

4px base unit, ten steps. Keys keep Tailwind's usual arithmetic, so `p-4` is
still 16px; the off-scale steps simply no longer exist.

| Utility | px |  | Utility | px |
| --- | --- | --- | --- | --- |
| `1` | 4 |  | `8` | 32 |
| `2` | 8 |  | `12` | 48 |
| `3` | 12 |  | `16` | 64 |
| `4` | 16 |  | `24` | 96 |
| `6` | 24 |  | `32` | 128 |

Applied as: section padding `py-12 md:py-24` (48/96px), card padding
`p-4 sm:p-6` (16/24px), tight pairs `gap-1`–`gap-2`, unrelated blocks
`gap-6`–`gap-12`.

There is no zero step either, so `p-0` and `inset-0` resolve to nothing and
render unstyled. A genuine zero offset is declared as a named utility instead —
`layer-fill` pins the landing backdrop to its positioned ancestor.

### Buttons

`components/Button.tsx` owns the padding recipes — vertical is half of
horizontal at every step. It renders an anchor when given `href`, otherwise a
`<button>`. Variants are `primary` (teal) and `inverse` (light fill, for dark
backgrounds).

| Size | Padding | Type step |
| --- | --- | --- |
| `small` | 8 / 16 | `text-small` |
| `medium` | 12 / 24 | `text-body` |
| `large` | 16 / 32 | `text-body-lg` |

### Bands

`components/Band.tsx` separates the major content blocks. Rather than a rule
between sections, each band is pulled up 48px (`-mt-12`) over the band above it
and given a 40px top radius (`--radius-band`), so its own fill curves across
the seam. The band behind stays square.

Tones alternate `page` (offwhite-100) and `surface` (offwhite-200) — the curve
is only visible where the fill behind it differs — and run landing → people
block → agenda. The benefits and testimonials sections share the people block's
surface band rather than taking one of their own, since a fourth band would
force the agenda to surface and leave a flat tonal seam above the CTA divider.
Two constraints hold the effect together: the overlap must
exceed the radius, or the arc is clipped at the seam, and the band must be
`relative`, or the text of the band above bleeds through the overlap (a static
block paints over the previous background but not its inline content).

The registration footer is a full-bleed flat teal-700 band spanning the
viewport edge to edge, closing the page. It needs no divider or curve above it:
running full width and switching to the teal fill is itself the break from the
page-toned agenda band above.

### Enforcement

`src/test/designSystem.test.ts` fails the suite on any off-scale spacing value,
any utility from the replaced type scale, any raw hex in a component, and any
direct use of a palette-tier colour class where a semantic alias belongs. This
matters because Tailwind silently skips class names it cannot resolve — an
off-scale utility does not break the build, it just renders with no padding.
The test catches it instead.

## Outstanding before launch

- `site.cta.buttonHref` is `#`. Replace it with the real registration URL and
  set `isPlaceholder: false`. The dev server logs a warning while it is a stub.
- Both testimonials in `data/testimonials.ts` are fabricated, and so are the
  people they are attributed to. They must be replaced with real, attributable
  quotes — shipping them as-is would put invented words in a colleague's mouth.
- The three benefit blocks show a tinted panel carrying the brief for the
  artwork rather than the artwork itself. Adding a real picture means a `photo`
  field on `Benefit` and an `<img>` branch in `Benefits.tsx`, mirroring how
  `Avatar.tsx` chooses between a portrait and initials.
- Keynote speakers are carried over from 2025 as placeholders.
- Tableau team is five reserved slots; Avalanche titles marked `Title TBD` need
  confirming.
- Portraits exist for five people (all three keynotes, plus Aniket Rawas and
  Kristen Crocco). Everyone else still shows an initials circle — drop a square
  image in `src/assets/` and add a `photo` to the person in `data/speakers.ts`.
- Two of the five are candid rather than studio shots, and `lieu-ta.webp`
  (270px) and `sean-lamb.webp` (288px) are smaller than the 208px keynote
  circle needs on a 2× display, so they will look soft there.
- The CTA photo cluster is still a placeholder. `tableau-day-framewrok.png` is
  the layout reference.

## Portraits

Square sources only: the avatar is a circle, so anything else crops unevenly.
The circle *is* the crop — `overflow-hidden rounded-full` on the shell, the
image `object-cover` inside it — which also trims whatever sits in the corners
of a candid shot. Portraits are decorative (`alt=""`, and the whole circle is
`aria-hidden`) because the name is rendered directly beneath, and they are
`loading="lazy"` since every roster sits below the fold.

## Partner logos

The landing lockup uses real artwork from `src/assets/`:

| Asset | Source | Notes |
| --- | --- | --- |
| `wind-river-logo.webp` | `assets/wind_river_logo.webp` | 960×158, used as supplied |
| `tableau-logo.png` | `assets/Tableau-Logo.png` | Original was 3840×2160 and roughly two-thirds empty space; cropped to its content box and downscaled to 518×120 |

Both are sized from the `--size-logo` token in `src/index.css`, multiplied by a
per-logo `opticalScale` in `data/site.ts`. Tableau renders at `1.3` because its
lowercase wordmark carries less visual weight than the all-caps WNDRVR mark at
the same pixel height — adjust that single number if the pairing looks off.

## Layout

`tableau-day-framewrok.png` is the source wireframe. The landing fills the
viewport and closes square; the people block, agenda and registration bands
scroll below it, each curving over the one before.

The landing sits on `src/assets/landing-backdrop.png` — a flat illustration of
rolling green hills under a white-to-cyan sky. It is `object-cover`, anchored to
its own bottom edge, then translated down 12% of the section height so the
horizon lands near 78% of the viewport and the hero has clean page above it (the
section is `overflow-hidden` to clip the overhang). Its top edge is masked away
over the first 20% of the image, so the artwork fades out of the page instead of
starting on a line — the sky's top rows are pure white against a warm off-white
page, which reads as a cut if left hard. It is decorative (`alt=""`,
`aria-hidden`), and grey ink over it is a contrast question, not a style one:
neither `muted` nor `muted-light` clears AA against the hill green, so anything
that can land low on the artwork takes `heading` or `body`. The countdown is the
exception — its digits are `muted-light`, so the hero content is centred inside
a symmetric `py-16` rather than dead-centre, which keeps the countdown above the
horizon. See the "Landing backdrop" section of
the steering doc before putting anything new on top of it.
