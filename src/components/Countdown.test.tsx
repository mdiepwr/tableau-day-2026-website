import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Countdown from './Countdown';

const FUTURE_ISO = '2099-10-22T08:30:00';
const PAST_ISO = '2000-10-22T08:30:00';

describe('Countdown', () => {
  it('renders all four unit labels', () => {
    render(
      <Countdown
        targetIso={FUTURE_ISO}
        dateLabel="Thursday, October 22, 2099"
        eventName="Tableau Day 2099"
      />,
    );

    for (const label of ['Days', 'Hours', 'Minutes', 'Seconds']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('announces the event date once instead of the ticking digits', () => {
    render(
      <Countdown
        targetIso={FUTURE_ISO}
        dateLabel="Thursday, October 22, 2099"
        eventName="Tableau Day 2099"
      />,
    );

    expect(
      screen.getByText(/Tableau Day 2099 starts on Thursday, October 22, 2099/),
    ).toBeInTheDocument();
  });

  it('shows zeroed digits and past-tense text after the event', () => {
    render(
      <Countdown
        targetIso={PAST_ISO}
        dateLabel="Sunday, October 22, 2000"
        eventName="Tableau Day 2000"
      />,
    );

    expect(
      screen.getByText(/Tableau Day 2000 took place on Sunday, October 22, 2000/),
    ).toBeInTheDocument();
    expect(screen.getAllByText('00')).toHaveLength(4);
  });
});
