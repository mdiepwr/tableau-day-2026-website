import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Benefits from './Benefits';
import { benefits } from '../data/benefits';

describe('Benefits', () => {
  it('renders one block per benefit', () => {
    render(<Benefits />);

    expect(screen.getAllByRole('listitem')).toHaveLength(benefits.length);
  });

  it('renders each title as a level-three heading, under the section h2', () => {
    render(<Benefits />);

    for (const benefit of benefits) {
      expect(
        screen.getByRole('heading', { level: 3, name: benefit.title }),
      ).toBeInTheDocument();
    }
  });

  it('shows the artwork brief while the picture is a placeholder', () => {
    render(<Benefits />);

    for (const benefit of benefits) {
      expect(screen.getByText(benefit.artworkBrief)).toBeInTheDocument();
    }
  });

  it('names the section with an accessible heading', () => {
    render(<Benefits />);

    expect(
      screen.getByRole('region', { name: /why learn tableau cloud/i }),
    ).toBeInTheDocument();
  });

  it('alternates which side the figure sits on', () => {
    const { container } = render(<Benefits />);
    const figures = container.querySelectorAll('li > [aria-hidden="true"]');

    expect(figures).toHaveLength(benefits.length);
    figures.forEach((figure, index) => {
      // Odd blocks send the figure right on two columns; single column always
      // stacks it above the copy, which is source order.
      expect(figure.classList.contains('md:order-last')).toBe(index % 2 === 1);
    });
  });
});
