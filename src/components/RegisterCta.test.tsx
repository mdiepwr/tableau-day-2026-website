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

    expect(
      screen.getByRole('link', { name: cta.buttonLabel }),
    ).toHaveAttribute('href', cta.buttonHref);
  });
});
