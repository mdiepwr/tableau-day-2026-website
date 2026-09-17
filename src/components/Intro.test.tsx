import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Intro from './Intro';
import { site } from '../data/site';

const leadText = site.intro.lead.map((segment) => segment.text).join('');

describe('Intro', () => {
  it('renders the visible heading', () => {
    render(<Intro />);

    expect(
      screen.getByRole('heading', { level: 2, name: /tableau day is back/i }),
    ).toBeInTheDocument();
  });

  it('names the section with that heading', () => {
    render(<Intro />);

    expect(
      screen.getByRole('region', { name: /tableau day is back/i }),
    ).toBeInTheDocument();
  });

  it('renders the full lead copy', () => {
    const { container } = render(<Intro />);

    // The lead is assembled from segments across <span>/<strong> children, so
    // there is no single text node to match — assert on the paragraph's
    // combined textContent instead.
    const hasLead = Array.from(container.querySelectorAll('p')).some(
      (p) => p.textContent === leadText,
    );
    expect(hasLead).toBe(true);
  });

  it('emphasises the key facts as strong text', () => {
    render(<Intro />);

    for (const segment of site.intro.lead.filter((s) => s.emphasis)) {
      const strong = screen.getByText(segment.text);
      expect(strong.tagName).toBe('STRONG');
    }
  });

  it('renders the transition sentence', () => {
    render(<Intro />);

    expect(screen.getByText(site.intro.transition)).toBeInTheDocument();
  });

  it('renders the BIT team logo', () => {
    render(<Intro />);

    // The mark is the only thing naming the organising team now that the
    // "Brought to you by..." note and its arrow are gone, so it carries real
    // alt text rather than being decorative.
    expect(screen.getByRole('img', { name: /bit team/i })).toBeInTheDocument();
  });
});
