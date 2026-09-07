import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Divider from './Divider';

describe('Divider', () => {
  it('renders a separator element', () => {
    render(<Divider />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('is a 4px pill with fully rounded ends and no border', () => {
    render(<Divider />);

    const rule = screen.getByRole('separator');

    expect(rule).toHaveClass('h-1');
    expect(rule).toHaveClass('rounded-full');
    // <hr> carries a 1px top border by default, which must be cleared or the
    // pill would render as a square-ended line sitting on a hairline.
    expect(rule).toHaveClass('border-0');
  });

  it('carries symmetric vertical spacing', () => {
    render(<Divider />);

    const rule = screen.getByRole('separator');

    expect(rule).toHaveClass('my-12');
    expect(rule).toHaveClass('md:my-16');
  });

  it('defaults to the quiet tone at full width', () => {
    render(<Divider />);

    const rule = screen.getByRole('separator');

    expect(rule).toHaveClass('bg-divider');
    expect(rule).toHaveClass('w-full');
  });

  it('renders the accent tone when asked', () => {
    render(<Divider tone="accent" />);

    expect(screen.getByRole('separator')).toHaveClass('bg-divider-accent');
  });

  it('renders a centered short pill from the named width token', () => {
    render(<Divider width="short" />);

    const rule = screen.getByRole('separator');

    expect(rule).toHaveClass('w-(--size-divider)');
    expect(rule).toHaveClass('mx-auto');
  });
});
