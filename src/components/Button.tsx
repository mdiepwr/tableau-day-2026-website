import type { ReactNode } from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'inverse';

interface ButtonProps {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  /** When provided the button renders as an anchor; otherwise a <button>. An
   * absolute http(s) href is treated as leaving the site and opens in a new
   * tab. */
  href?: string;
  onClick?: () => void;
}

/**
 * Design-system button padding. Vertical padding is half the horizontal at
 * every step, and each step pairs with a type step so the label never
 * outgrows its box.
 *
 *   small   8 / 16   (py-2 px-4)
 *   medium  12 / 24  (py-3 px-6)
 *   large   16 / 32  (py-4 px-8)
 */
const SIZES: Record<ButtonSize, string> = {
  small: 'px-4 py-2 text-small',
  medium: 'px-6 py-3 text-body',
  large: 'px-8 py-4 text-body-lg',
};

/**
 * `primary` is the teal button from the palette, darkening on hover and press.
 * `inverse` is a light fill for dark backgrounds, where a teal button would
 * disappear into the band behind it — the registration call to action is the
 * one place that applies today.
 *
 * Every state is an explicit fill, and focus is a visible ring rather than a
 * removed outline.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active focus-visible:outline-primary-active',
  inverse:
    'bg-inverse text-on-inverse hover:bg-inverse-hover active:bg-inverse-active focus-visible:outline-band-ink',
};

/**
 * font-medium deliberately overrides the type step's 400 weight — button
 * labels need more presence than body copy at the same size.
 */
const BASE =
  'inline-flex items-center justify-center rounded-control font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2';

/**
 * An absolute http(s) href leaves the site, so it opens in a new tab and the
 * page stays behind it — every off-site link here is the registration form.
 * Detected from the URL rather than passed as a prop so the two register
 * buttons, which both read their href from `site.cta`, cannot disagree.
 *
 * `rel` is required with `target="_blank"`: without it the opened page can
 * reach back through `window.opener`.
 */
const isExternal = (href: string) => /^https?:\/\//i.test(href);

export default function Button({
  children,
  size = 'medium',
  variant = 'primary',
  href,
  onClick,
}: ButtonProps) {
  const className = `${BASE} ${VARIANTS[variant]} ${SIZES[size]}`;

  if (href) {
    const external = isExternal(href);

    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {children}
        {/* A link that opens a new tab has to say so, and the visible label
            reads better without it — so it goes into the accessible name only.
            Tests that query these links by name must expect the suffix. */}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
