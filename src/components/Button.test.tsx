import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders a <button> when given no href', () => {
    render(<Button>Press me</Button>);

    expect(screen.getByRole('button', { name: 'Press me' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('opens an off-site href in a new tab, with rel guarding window.opener', () => {
    render(<Button href="https://forms.gle/example">Register</Button>);

    // Matched loosely: the new-tab notice is a separate element, and the
    // accessible name concatenates it without a separator.
    const link = screen.getByRole('link', {
      name: /Register.*opens in a new tab/,
    });

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('keeps an in-page href in the same tab and unannounced', () => {
    render(<Button href="#agenda">Jump to agenda</Button>);

    const link = screen.getByRole('link', { name: 'Jump to agenda' });

    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });
});
