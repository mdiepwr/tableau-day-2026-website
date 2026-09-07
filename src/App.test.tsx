import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { benefits } from './data/benefits';
import { site } from './data/site';

describe('App', () => {
  it('renders the landing headline and every section heading', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: site.title }),
    ).toBeInTheDocument();

    const sectionHeadings = [
      'Keynote Speakers',
      'Avalanche Team',
      'Tableau Team',
      'Why Learn Tableau Cloud',
      'Testimonials',
      'Agenda',
      site.cta.headline,
    ];

    for (const name of sectionHeadings) {
      expect(
        screen.getByRole('heading', { level: 2, name }),
      ).toBeInTheDocument();
    }
  });

  it('nests only the benefit titles below h2, and nothing below h3', () => {
    render(<App />);

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    // The benefit blocks are the one place the outline goes three deep: each
    // title is a child of the "Why learn Tableau Cloud" h2.
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      benefits.length,
    );
    expect(screen.queryAllByRole('heading', { level: 4 })).toHaveLength(0);
  });

  it('names every section for assistive technology', () => {
    render(<App />);

    // Landing, intro, keynotes, both team columns counted separately,
    // benefits, testimonials, agenda and the CTA: 9 named regions in total.
    expect(screen.getAllByRole('region')).toHaveLength(9);
  });

  it('renders the registration link', () => {
    render(<App />);

    expect(
      screen.getByRole('link', { name: site.cta.buttonLabel }),
    ).toBeInTheDocument();
  });

  it('curves the people and agenda bands over the band above, alternating tone', () => {
    const { container } = render(<App />);
    const bands = container.querySelectorAll('main > .rounded-t-band');

    expect(bands).toHaveLength(2);
    // Tones must differ from each other and from the landing (page), or the
    // curve has nothing to read against.
    expect(bands[0]).toHaveClass('bg-surface');
    expect(bands[1]).toHaveClass('bg-page');

    for (const band of bands) {
      expect(band).toHaveClass('-mt-12');
    }
  });

  it('places no separator: the full-bleed teal footer is its own break', () => {
    render(<App />);

    expect(screen.queryAllByRole('separator')).toHaveLength(0);
  });
});
