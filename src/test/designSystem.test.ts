import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Guards the design system declared in src/index.css.
 *
 * Tailwind silently skips class names it cannot resolve, so an off-scale
 * utility does not fail the build — it just renders with no padding. These
 * tests fail instead, which is what keeps the scale honest over time.
 */

/**
 * 4px base unit.
 *
 * Zero is not allowed. `--spacing: initial` clears Tailwind's dynamic scale,
 * and this project declares no `--spacing-0`, so `p-0` / `inset-0` resolve to
 * nothing at all and render silently unstyled — exactly the failure mode these
 * tests exist to catch. A zero offset that is genuinely wanted belongs in a
 * named utility in the system layer (see `layer-fill` in index.css).
 */
const ALLOWED_SPACING = new Set([1, 2, 3, 4, 6, 8, 12, 16, 24, 32]);

const TYPE_STEPS = [
  'display',
  'countdown',
  'h1',
  'h2',
  'h3',
  'h4',
  'body-lg',
  'body',
  'small',
  'micro',
] as const;

const SPACING_UTILITIES = [
  'p', 'px', 'py', 'pt', 'pb', 'pl', 'pr',
  'm', 'mx', 'my', 'mt', 'mb', 'ml', 'mr',
  'gap', 'gap-x', 'gap-y', 'space-x', 'space-y',
  'w', 'h', 'size', 'min-w', 'min-h', 'max-w', 'max-h',
  'top', 'right', 'bottom', 'left', 'inset',
].join('|');

const spacingPattern = new RegExp(
  `\\b(?:(?:sm|md|lg|xl):)?(?:${SPACING_UTILITIES})-(\\d+(?:\\.\\d+)?)\\b`,
  'g',
);

/** Tailwind's default type scale, which this project replaces. */
const legacyTypePattern = /\btext-(?:xs|sm|base|lg|xl|\d+xl)\b/g;

function sourceFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      sourceFiles(path, found);
    } else if (/\.tsx?$/.test(path) && !/\.test\./.test(path)) {
      found.push(path);
    }
  }
  return found;
}

const files = sourceFiles('src');
const sources = files.map((file) => ({
  file,
  content: readFileSync(file, 'utf8'),
}));

describe('design system', () => {
  it('finds source files to check', () => {
    expect(files.length).toBeGreaterThan(5);
  });

  it('uses no spacing value outside the 4px scale', () => {
    const offences: string[] = [];

    for (const { file, content } of sources) {
      for (const match of content.matchAll(spacingPattern)) {
        if (!ALLOWED_SPACING.has(Number(match[1]))) {
          offences.push(`${file}: ${match[0]}`);
        }
      }
    }

    expect(offences).toEqual([]);
  });

  it('uses no utility from the replaced Tailwind type scale', () => {
    const offences: string[] = [];

    for (const { file, content } of sources) {
      for (const match of content.matchAll(legacyTypePattern)) {
        offences.push(`${file}: ${match[0]}`);
      }
    }

    expect(offences).toEqual([]);
  });

  it('declares every type step with a size, line-height and weight', () => {
    const css = readFileSync(join('src', 'index.css'), 'utf8');

    for (const step of TYPE_STEPS) {
      expect(css, `--text-${step} size`).toContain(`--text-${step}: `);
      expect(css, `--text-${step} line-height`).toContain(
        `--text-${step}--line-height: `,
      );
      expect(css, `--text-${step} weight`).toContain(
        `--text-${step}--font-weight: `,
      );
    }
  });

  it('clears the Tailwind defaults it replaces', () => {
    const css = readFileSync(join('src', 'index.css'), 'utf8');

    expect(css).toContain('--text-*: initial');
    expect(css).toContain('--spacing: initial');
  });

  it('declares exactly the ten spacing steps', () => {
    const css = readFileSync(join('src', 'index.css'), 'utf8');
    const declared = [...css.matchAll(/--spacing-(\d+):/g)].map((m) =>
      Number(m[1]),
    );

    expect(declared.sort((a, b) => a - b)).toEqual([
      1, 2, 3, 4, 6, 8, 12, 16, 24, 32,
    ]);
  });

  it('keeps body text at 16px or larger at every viewport', () => {
    const css = readFileSync(join('src', 'index.css'), 'utf8');

    // The body step is the mobile floor and must never be overridden smaller.
    expect(css).toContain('--text-body: 1rem');

    const smallerBodyOverride = /--text-body:\s*(0?\.\d+rem|1[0-5]px)/.test(css);
    expect(smallerBodyOverride).toBe(false);
  });

  it('hard-codes no colour outside the token layer', () => {
    const offences: string[] = [];
    const hex = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;

    for (const { file, content } of sources) {
      // Ignore hex inside comments, which document measured contrast ratios.
      const stripped = content
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '');

      for (const match of stripped.matchAll(hex)) {
        offences.push(`${file}: ${match[0]}`);
      }
    }

    expect(offences).toEqual([]);
  });

  it('references semantic colour aliases, not raw palette positions', () => {
    const offences: string[] = [];
    const paletteClass =
      /\b(?:text|bg|border|ring|from|to|outline|fill|stroke|divide)-(?:teal|black|gray|offwhite)-\d{3}\b/g;

    for (const { file, content } of sources) {
      for (const match of content.matchAll(paletteClass)) {
        offences.push(`${file}: ${match[0]}`);
      }
    }

    expect(offences).toEqual([]);
  });

  it('declares the full teal, black and off-white palette', () => {
    const css = readFileSync(join('src', 'index.css'), 'utf8');

    for (const step of [900, 800, 700, 600, 500, 400, 300, 200, 100]) {
      expect(css, `teal-${step}`).toContain(`--color-teal-${step}:`);
    }
    for (const step of [900, 800, 700]) {
      expect(css, `black-${step}`).toContain(`--color-black-${step}:`);
    }
    for (const step of [100, 200, 300]) {
      expect(css, `offwhite-${step}`).toContain(`--color-offwhite-${step}:`);
    }
    expect(css).toContain('--color-gray-500:');
  });
});
