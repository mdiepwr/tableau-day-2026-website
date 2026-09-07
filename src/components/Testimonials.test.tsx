import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Testimonials from './Testimonials';
import { testimonials } from '../data/testimonials';

describe('Testimonials', () => {
  it('renders each quote in a blockquote, wrapped in quotation marks', () => {
    const { container } = render(<Testimonials />);
    const quotes = container.querySelectorAll('blockquote');

    expect(quotes).toHaveLength(testimonials.length);
    testimonials.forEach((testimonial, index) => {
      expect(quotes[index]!.textContent).toBe(`\u201C${testimonial.quote}\u201D`);
    });
  });

  it('attributes each quote to a name and role', () => {
    render(<Testimonials />);

    for (const testimonial of testimonials) {
      expect(screen.getByText(testimonial.name)).toBeInTheDocument();
      expect(
        screen.getByText(testimonial.role, { exact: false }),
      ).toBeInTheDocument();
    }
  });

  it('names the section with an accessible heading', () => {
    render(<Testimonials />);

    expect(
      screen.getByRole('region', { name: /testimonials/i }),
    ).toBeInTheDocument();
  });
});
