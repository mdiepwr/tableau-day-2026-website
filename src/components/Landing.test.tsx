import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Landing from './Landing';
import { site } from '../data/site';

describe('Landing', () => {
  it('renders the event title from the site config as the page heading', () => {
    render(<Landing />);

    expect(
      screen.getByRole('heading', { level: 1, name: site.title }),
    ).toBeInTheDocument();
  });

  it('renders exactly one level-one heading', () => {
    render(<Landing />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('renders a logo image for each partner, labelled with its name', () => {
    render(<Landing />);

    for (const partner of site.partners) {
      const logo = screen.getByRole('img', { name: partner.name });

      expect(logo).toHaveAttribute('src', partner.logo.src);
      // Intrinsic dimensions must be present so the landing does not shift
      // as the logos load.
      expect(logo).toHaveAttribute('width', String(partner.logo.width));
      expect(logo).toHaveAttribute('height', String(partner.logo.height));
    }
  });

  it('renders the backdrop as decoration, hidden from assistive tech', () => {
    const { container } = render(<Landing />);

    // Queried by attribute on purpose: a decorative image has no accessible
    // role or name, so getByRole('img') cannot reach it — which is the point.
    const backdrop = container.querySelector('img[aria-hidden="true"]');

    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveAttribute('alt', '');
    expect(screen.getAllByRole('img')).toHaveLength(site.partners.length);
  });

  it('renders a registration link pointing at the CTA href', () => {
    render(<Landing />);

    const register = screen.getByRole('link', { name: 'Register Here!' });

    // Shares the single registration URL with the footer CTA, so the two
    // cannot drift to different links.
    expect(register).toHaveAttribute('href', site.cta.buttonHref);
  });
});
