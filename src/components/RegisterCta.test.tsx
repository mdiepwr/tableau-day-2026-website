import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import RegisterCta from './RegisterCta';
import { site } from '../data/site';

const { cta } = site;

describe('RegisterCta', () => {
  it('renders the headline as the section heading', () => {
    render(<RegisterCta />);

    expect(
      screen.getByRole('heading', { level: 2, name: cta.headline }),
    ).toBeInTheDocument();
  });

  it('renders the virtual attendee note', () => {
    render(<RegisterCta />);

    expect(screen.getByText(cta.virtualNote)).toBeInTheDocument();
  });

  it('renders the register link with the href from the site config', () => {
    render(<RegisterCta />);

    const register = screen.getByRole('link', {
      name: new RegExp(`${cta.buttonLabel}.*opens in a new tab`),
    });

    expect(register).toHaveAttribute('href', cta.buttonHref);
    // The form is off-site, so it opens alongside the page rather than
    // replacing it — Button derives this from the URL.
    expect(register).toHaveAttribute('target', '_blank');
  });
});
