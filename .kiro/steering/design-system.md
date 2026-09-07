# Design System — Tableau Day 2026

Authoritative for all components, pages and future work unless explicitly
overridden. Tokens live in `src/index.css` (one `@theme static` block).
**Never hard-code a colour, size or spacing value in a component.**

`src/test/designSystem.test.ts` enforces most of this. Tailwind silently skips
class names it cannot resolve, so an off-scale utility does not break the build
— it renders with nothing applied. The test is what catches it.

## Colour

Two tiers. Tier 1 is the palette of record; tier 2 is what components use.
Reach for tier 1 only when adding a new semantic alias.

Brand base: Wind River Teal `teal-500` `#31C1B7`.

| Tier 1 | Hex | | Tier 1 | Hex |
| --- | --- | --- | --- | --- |
| `teal-900` | `#0F3D3A` | | `black-900` | `#0A0A0A` |
| `teal-800` | `#145A55` | | `black-800` | `#1A1A1A` |
| `teal-700` | `#1B7A73` | | `black-700` | `#2E2E2E` |
| `teal-600` | `#229990` | | `gray-500` | `#6B6B6B` |
| `teal-500` | `#31C1B7` | | `gray-400` | `#808080` |
| `teal-400` | `#5CD0C7` | | `offwhite-100` | `#FAFAF8` |
| `teal-300` | `#8ADFD9` | | `offwhite-200` | `#F5F4F0` |
| `teal-200` | `#B7EEEA` | | `offwhite-300` | `#EDEBE4` |
| `teal-100` | `#E1F8F6` | | | |

Tier 2 semantic aliases — use these:

| Alias | Maps to | Contrast |
| --- | --- | --- |
| `page` | offwhite-100 | page background |
| `surface` | offwhite-200 | cards/sections — layering without hard borders |
| `divider` | offwhite-300 | borders, dividers (1.14:1 — intentionally soft) |
| `heading` | black-800 | 16.65:1 on page |
| `body` | black-700 | 12.99:1 — preferred over black-900 for text blocks |
| `muted` | gray-500 | 5.10:1 |
| `muted-light` | gray-400 | 3.78:1 — large text only (≥24px) |
| `accent` | teal-700 | 4.93:1 — teal headings |
| `accent-strong` | teal-800 | 7.66:1 — body-sized accent text |
| `primary` / `-hover` / `-active` | teal-700 / 800 / 900 | button fills |
| `on-primary` | white | 5.15:1 on primary |
| `inverse` / `-hover` / `-active` | offwhite-100 / 200 / 300 | button on dark |
| `on-inverse` | teal-900 | 11.49:1 |
| `tint` / `on-tint` | teal-100 / teal-800 | 7.23:1 — badges, tints, table headers |
| `band-to` | teal-700 | registration footer fill |
| `band-ink` / `band-ink-muted` | white / teal-100 | 5.15:1 / 4.65:1 on teal-700 |

### Colour rules

- **teal-500 is never used for text.** It is 2.13:1 on the page background.
  Use it for fills, icons and decoration only.
- **White on teal-500 is 2.22:1 and fails AA.** The primary button is therefore
  teal-700 with white ink (5.15:1), darkening to teal-800 (8.00:1) on hover and
  teal-900 (12.01:1) on press. This keeps the specified "darken on interaction"
  direction; a teal-500 base cannot, because darkening to teal-600 drops dark
  ink to 3.45:1 and lightening contradicts the interaction model.
- Badges/tints: teal-100–300 background with teal-800 or teal-900 ink.
- Dividers are deliberately near-invisible. Where structure must read — a data
  table — carry it with tinted headers and banded rows, not heavier borders.
- **`text-body` is a size, never an ink.** `body` is declared twice — as a type
  step and as a colour alias — and `text-*` resolves the font-size first, so
  `text-body` silently sets 16px and leaves the colour alone. Where body ink is
  wanted, inherit it from `<body>` or name the ink you mean (`text-heading`,
  `text-muted`).
- Check contrast before introducing any new colour pair. Body text needs 4.5:1,
  large text (≥24px) and UI boundaries need 3:1.

## Typography

One utility applies size, line-height and weight together. Mobile-first;
heading steps step up at `md` (768px) by overriding the token, so one class per
element stays correct at both sizes.

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

- Body never drops below 16px at any viewport (also prevents iOS input zoom).
- Tailwind's default scale is cleared (`--text-*: initial`); `text-sm`,
  `text-2xl` and friends do not exist.
- Visual step and semantic level are independent: an `h2` may take
  `text-h4` if the design calls for modest size.
- The first two steps belong to the landing. `text-display` is `56/96px ×
  --title-scale`, where `--title-scale` is `--hero-scale × 0.8`. `text-countdown`
  is a flat 32/40px at weight 400 — it once carried `--hero-scale` too, but at
  48/60px and weight 700 it read as too loud beside the smaller title and left
  no room to centre the hero, so it dropped to the base size and a lighter
  weight. Tune the landing's overall size through `--hero-scale`, which still
  drives `text-display` and `--size-logo`, rather than editing sizes one by one.
- `text-display` belongs to the landing `h1` alone, and it is a fifth smaller
  than the rest of the landing because it has a constraint the other hero
  elements do not: **it must set on one line.** "Tableau Day 2026" measures
  7.8em in Outfit at `tracking-tight`, so at 115px it occupies 898px — well
  inside the 90rem (1440px) page container. The desktop step also caps itself at
  `(100vw - 3rem) / 8`, which holds the line together between 768px and the
  ~976px that 115px needs; the divisor is 8 rather than 7.8 to leave slack.
  Mobile does not attempt one line — 342px of a 390px viewport cannot hold the
  title at any readable size — so it wraps to "Tableau" / "Day 2026".
  Any change to the title copy invalidates the 7.8em and needs re-measuring.
  Weight 400 is deliberate: at that size Outfit's geometric skeleton carries
  the title, and bold would make it heavy rather than large.
- `text-countdown` belongs to `Countdown` alone. It exists so the digits are
  their own step rather than borrowing `text-h1` and dragging the heading ladder
  along. At 32/40px they are still large text (≥24px), which is what lets them
  take the `muted-light` grey and clear its 3:1 threshold.
- Font: **Outfit** (Google Fonts, OFL) for everything, requested at 400/600/700
  — the only weights the scale asks for, so nothing is synthesised. Two gaps
  come with using one family: no italic, so the intro's italic annotation is a
  synthesised oblique (keep italic small and rare), and unverified tabular
  figures, so `tabular-nums` is a hint and the countdown's fixed column width is
  what actually holds changing numerals steady.

## Spacing — 4px base, ten steps

`1`=4 `2`=8 `3`=12 `4`=16 `6`=24 `8`=32 `12`=48 `16`=64 `24`=96 `32`=128

Keys keep Tailwind's arithmetic (`p-4` is 16px); the off-scale steps are
removed (`--spacing: initial`). No arbitrary values, and **no zero steps**:
there is no `--spacing-0`, so `p-0` and `inset-0` resolve to nothing and render
silently unstyled. A zero offset that is genuinely wanted goes in a named
utility (`layer-fill`).

- Section vertical padding: `py-12 md:py-24` (48/96px). Range 64–128 desktop,
  32–64 mobile.
- Card/component padding: `p-4`–`p-6` (16–24px).
- Tightly related elements: `gap-1`–`gap-2` (4–8px).
- Unrelated blocks: `gap-6`–`gap-12` (24–48px).

## Buttons

`components/Button.tsx` owns every recipe. Vertical padding is half the
horizontal. Renders an anchor when given `href`, otherwise a `<button>`.

| Size | Padding | Type step |
| --- | --- | --- |
| `small` | 8 / 16 | `text-small` |
| `medium` | 12 / 24 | `text-body` |
| `large` | 16 / 32 | `text-body-lg` |

Variants: `primary` (teal, default) and `inverse` (light fill, for dark
backgrounds). Every state is an explicit fill; focus is a visible ring.

## Bands

`components/Band.tsx`. Full-bleed content band that curves over the band above
it, replacing the rule between the landing, the people block and the agenda.

| Prop | Values | Meaning |
| --- | --- | --- |
| `tone` | `page` (offwhite-100) / `surface` (offwhite-200) | fill; must alternate down the page |

- The band above stays square; the band in front is pulled up `-mt-12` (48px)
  and takes `rounded-t-band` (`--radius-band`, 40px), so its own fill sweeps
  across the seam.
- Overlap must exceed the radius, or the arc is clipped at the seam instead of
  landing on the band behind. 48 > 40 holds; changing one means checking both.
- Tones must alternate. Two `page` bands in a row leave the curve invisible.
- The band is `relative`. A static block would only paint over the previous
  band's background — positioned elements paint after all in-flow content, so
  the text of the band above cannot bleed through the overlap.
- Full-bleed by design: corners meet the viewport edge. The page container
  lives inside, in `Section`.
- Overlap eats 48px of the band above, so keep content clear of that strip —
  the landing centres its content with `justify-center` inside `py-16` (64px
  top and bottom), and every `Section` carries `py-12 md:py-24`.

## Landing backdrop

`assets/landing-backdrop.png` (2732×1536) fills the landing behind the lockup,
title and countdown: a flat illustration with a white-to-cyan sky over rolling
green hills, trees clustered at the left and right edges.

- Decoration, not content: `alt=""` plus `aria-hidden`, so assistive tech skips
  it. `pointer-events-none select-none` keeps it out of the way of selection.
- `layer-fill object-cover object-bottom`, then the whole layer is translated
  down by `--size-backdrop-drop` (12% of the section's height). Bottom anchoring
  keeps the artwork's own foot on the layer's bottom edge and crops sky, which
  is empty; the translation then pushes that foot past the bottom of the section
  — hence `overflow-hidden` — so the horizon lands near 78% of the viewport
  instead of 66% and a strip of plain page opens above the artwork. A percentage
  keeps both true at any viewport height.
- Centring the horizontal crop keeps the trees out of frame on narrow
  viewports, where the crop is tightest — a 390px viewport shows only the middle
  37–63% of the artwork, which is hills and sky.
- The section keeps `bg-page` underneath: the fill while the image loads, and
  the colour of the strip above it.
- `layer-fade-top` masks the top of the image away over `--size-backdrop-fade`
  (20%), so the artwork emerges out of the page rather than starting on a line.
  Matching the two colours instead does not work: the artwork's top rows are
  pure white and the page is a warm off-white, and although that is only a
  1.02:1 luminance step, the hue difference still reads as a cut. Any layer
  whose edge lands mid-section needs the same treatment.
- The section is `relative` and the content block is `relative` too. Both are
  positioned, so source order alone lifts the content above the backdrop — no
  z-index.
- Ink: the sky runs white to `#C7FAFF`, the grass `#ACC931` → `#94B331` →
  `#679320`, the tree foliage `#4D7F10`. `heading` clears AA on sky and grass
  (12.6:1 on the horizon, 9.19:1 on the light grass) but only reaches 3.62:1 on
  the foliage; `muted` is 4.70:1 on the horizon and 2.81:1 on the grass; and
  `muted-light` is 3.49:1 on the sky but 2.31:1 on the grass.
  So: anything that can land low on the backdrop takes `body` or `heading`, and
  text stays inside the centred page container, clear of the trees at the frame
  edges. The countdown is the exception and the reason the hero content is not
  purely centred: its digits are `muted-light`, which is only legible above the
  horizon, so the landing's symmetric `py-16` lifts the block off the grass.
  Anything else placed low here takes a dark ink, not a grey one.
- The band below still curves over the last 48px, eating the bottom strip of
  grass. That is the intended reading: the next section rises over the
  landscape.

## Dividers

`components/Divider.tsx`. A 4px pill-shaped `<hr>`. Now used only ahead of the
registration band, which is a dark gradient block inside the page container
rather than a full-bleed tonal band, so a curve has nothing to curve over.

| Prop | Values | Meaning |
| --- | --- | --- |
| `tone` | `quiet` (offwhite-300) / `accent` (teal-300) | quiet = structural break between similar bands; accent = transition into something different |
| `width` | `full` (page container) / `short` (`--size-divider`, 96px, centered) | |

- Even `full` stays inside the page container rather than bleeding to the
  viewport edge — rounded caps only read as rounded if there is margin for them
  to sit against.
- Do not pair `quiet` with `short`: offwhite-300 is 1.14:1 against the page, so
  a 96px sliver of it is invisible. Low-contrast tones need full width.
- Carries its own `my-12 md:my-16` (48/64px). Adjacent section padding adds to
  this, so a divider between two padded sections shows ~96px mobile / ~160px
  desktop. Keep it symmetric: if a neighbouring band lacks padding on the
  touching edge, add it rather than special-casing the divider.
- Rendered as `<hr>`, which carries an implicit separator role and needs no
  ARIA. `border-0` is required, or the default 1px top border shows through as
  a square-ended line under the pill.

## Other conventions

- Named dimensions only — no inline magic sizes. Declare a `--size-*` token and
  reference it as `size-(--size-name)`.
- Content lives in `src/data/` (`site.ts`, `speakers.ts`, `agenda.ts`,
  `benefits.ts`, `testimonials.ts`). Components render from those arrays and
  never inline copy or people.
- Sections are separated by whitespace, not boxes. One `h1`, then peer `h2`
  per section; every `<section>` is named via `aria-labelledby`.
- Delete tokens and variants that nothing uses. A dead token reads as intent
  and misleads the next reader.
