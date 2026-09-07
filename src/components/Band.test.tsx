import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Band from './Band';

function renderBand(tone: 'page' | 'surface' = 'page') {
  const { container } = render(
    <Band tone={tone}>
      <p>band content</p>
    </Band>,
  );

  return container.firstElementChild as HTMLElement;
}

describe('Band', () => {
  it('renders its children', () => {
    renderBand();

    expect(screen.getByText('band content')).toBeInTheDocument();
  });

  it('curves over the band above it', () => {
    const band = renderBand();

    // The overlap (48px) must exceed the 40px radius, or the arc is clipped at
    // the seam instead of landing on the band behind.
    expect(band).toHaveClass('-mt-12');
    expect(band).toHaveClass('rounded-t-band');
  });

  it('is positioned, so it paints over the previous band', () => {
    // A static block only covers the previous band's background; its text
    // would still bleed through the overlap.
    expect(renderBand()).toHaveClass('relative');
  });

  it('fills with the requested tone', () => {
    expect(renderBand('page')).toHaveClass('bg-page');
    expect(renderBand('surface')).toHaveClass('bg-surface');
  });
});
