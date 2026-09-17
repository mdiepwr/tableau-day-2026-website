import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Testimonials from './Testimonials';
import { testimonials } from '../data/testimonials';

const HOLD_MS = 9000;

/** The figure wrapping a quote, which is what carries the slide state. */
function figureFor(container: HTMLElement, index: number) {
  return container.querySelectorAll('figure')[index]!;
}

/** The track holding the stacked quotes, which is what carries the direction. */
function trackIn(container: HTMLElement) {
  return container.querySelector('figure')!.parentElement!;
}

function dotFor(name: string) {
  return screen.getByRole('button', {
    name: new RegExp(`quote from ${name}`, 'i'),
  });
}

const prevArrow = () => screen.getByRole('button', { name: 'Previous quote' });
const nextArrow = () => screen.getByRole('button', { name: 'Next quote' });

describe('Testimonials', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders every quote in a blockquote, wrapped in quotation marks', () => {
    const { container } = render(<Testimonials />);
    const quotes = container.querySelectorAll('blockquote');

    // All of them stay in the DOM — one grid cell, one visible — so the block
    // is as tall as the longest quote from the start and never resizes.
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

  it('shows only the first quote, and hides the rest from assistive tech', () => {
    const { container } = render(<Testimonials />);

    expect(figureFor(container, 0)).toHaveClass('quote-slide-current');
    expect(figureFor(container, 0)).not.toHaveAttribute('aria-hidden', 'true');

    expect(figureFor(container, 1)).toHaveClass('quote-slide-waiting');
    expect(figureFor(container, 1)).toHaveAttribute('aria-hidden', 'true');
  });

  it('advances on its own, sending the outgoing quote the other way', () => {
    const { container } = render(<Testimonials />);

    act(() => {
      vi.advanceTimersByTime(HOLD_MS);
    });

    expect(figureFor(container, 1)).toHaveClass('quote-slide-current');
    // Leaving, not waiting: a quote that has been read exits to the right
    // rather than retreating the way it came in.
    expect(figureFor(container, 0)).toHaveClass('quote-slide-leaving');
  });

  it('wraps back to the first quote', () => {
    const { container } = render(<Testimonials />);

    // One advance per quote, each in its own act: the next timeout is only
    // scheduled once React has committed the swap, so a single long jump would
    // fire one tick and then find no timer waiting.
    for (let i = 0; i < testimonials.length; i++) {
      act(() => {
        vi.advanceTimersByTime(HOLD_MS);
      });
    }

    expect(figureFor(container, 0)).toHaveClass('quote-slide-current');
  });

  it('selects a quote from its dot', () => {
    const { container } = render(<Testimonials />);
    const last = testimonials[testimonials.length - 1]!;

    fireEvent.click(dotFor(last.name));

    expect(figureFor(container, testimonials.length - 1)).toHaveClass(
      'quote-slide-current',
    );
  });

  it('marks the current quote on its dot', () => {
    render(<Testimonials />);

    expect(dotFor(testimonials[0]!.name)).toHaveAttribute(
      'aria-current',
      'true',
    );
  });

  it('stops rotating once a quote is chosen by hand', () => {
    const { container } = render(<Testimonials />);

    // Selecting the quote already showing still counts as taking over: the
    // reader has said which one they want, and the timer must not overrule it.
    fireEvent.click(dotFor(testimonials[0]!.name));

    for (let i = 0; i < testimonials.length + 1; i++) {
      act(() => {
        vi.advanceTimersByTime(HOLD_MS);
      });
    }

    expect(figureFor(container, 0)).toHaveClass('quote-slide-current');
  });

  it('holds while the block is hovered', () => {
    const { container } = render(<Testimonials />);
    const block = trackIn(container);

    fireEvent.mouseEnter(block);
    act(() => {
      vi.advanceTimersByTime(HOLD_MS * 2);
    });

    expect(figureFor(container, 0)).toHaveClass('quote-slide-current');

    // And resumes on the way out — hover is a hold, not a stop.
    fireEvent.mouseLeave(block);
    act(() => {
      vi.advanceTimersByTime(HOLD_MS);
    });

    expect(figureFor(container, 1)).toHaveClass('quote-slide-current');
  });

  it('holds while a dot has focus, which is the keyboard equivalent of hover', () => {
    const { container } = render(<Testimonials />);

    // Named rather than taken by DOM order: the arrows come before the dots in
    // the markup, so the first button in the container is not a dot.
    fireEvent.focus(dotFor(testimonials[0]!.name));
    act(() => {
      vi.advanceTimersByTime(HOLD_MS * 2);
    });

    expect(figureFor(container, 0)).toHaveClass('quote-slide-current');
  });
});

describe('Testimonials arrows', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('offers a named control in each direction', () => {
    render(<Testimonials />);

    expect(prevArrow()).toBeInTheDocument();
    expect(nextArrow()).toBeInTheDocument();
  });

  it('advances with the next arrow', () => {
    const { container } = render(<Testimonials />);

    fireEvent.click(nextArrow());

    expect(figureFor(container, 1)).toHaveClass('quote-slide-current');
    expect(figureFor(container, 0)).toHaveClass('quote-slide-leaving');
  });

  it('goes back with the previous arrow, wrapping to the last quote', () => {
    const { container } = render(<Testimonials />);
    const last = testimonials.length - 1;

    // From the first quote, back is the last one: the modulo has to survive a
    // negative index rather than landing on -1.
    fireEvent.click(prevArrow());

    expect(figureFor(container, last)).toHaveClass('quote-slide-current');
  });

  it('wraps forward from the last quote to the first', () => {
    const { container } = render(<Testimonials />);

    for (let i = 0; i < testimonials.length; i++) {
      fireEvent.click(nextArrow());
    }

    expect(figureFor(container, 0)).toHaveClass('quote-slide-current');
  });

  it('runs the slide the way the reader went', () => {
    const { container } = render(<Testimonials />);

    // Forward is the default direction, so the track carries no reverse flag.
    fireEvent.click(nextArrow());
    expect(trackIn(container).className).not.toContain('quote-track-reverse');

    // Backward mirrors it: the incoming quote arrives from the side the arrow
    // points at, which is the whole reason the direction is state.
    fireEvent.click(prevArrow());
    expect(trackIn(container).className).toContain('quote-track-reverse');
  });

  it('reverses for a dot behind the quote showing', () => {
    const { container } = render(<Testimonials />);
    const last = testimonials[testimonials.length - 1]!;

    fireEvent.click(dotFor(last.name));
    expect(trackIn(container).className).not.toContain('quote-track-reverse');

    fireEvent.click(dotFor(testimonials[0]!.name));
    expect(trackIn(container).className).toContain('quote-track-reverse');
  });

  it('stops the rotation for good, like the dots', () => {
    const { container } = render(<Testimonials />);

    fireEvent.click(nextArrow());

    for (let i = 0; i < testimonials.length + 1; i++) {
      act(() => {
        vi.advanceTimersByTime(HOLD_MS);
      });
    }

    // Still on the quote the arrow chose: taking the sequence over is what
    // satisfies WCAG 2.2.2 here, so it has to outlast the timer.
    expect(figureFor(container, 1)).toHaveClass('quote-slide-current');
  });

  it('offers no controls at all when there is only one quote', async () => {
    // Controls exist to move between quotes and to stop a rotation. With one
    // quote there is nothing to rotate, so arrows and dots alike would be dead
    // affordances — the same `rotates` guard covers all three.
    vi.resetModules();
    vi.doMock('../data/testimonials', () => ({
      testimonials: [
        { id: 'only', quote: 'The only quote.', name: 'Solo', role: 'Analyst' },
      ],
    }));

    const { default: SingleQuote } = await import('./Testimonials');
    render(<SingleQuote />);

    expect(screen.queryByRole('button')).toBeNull();

    vi.doUnmock('../data/testimonials');
    vi.resetModules();
  });
});
