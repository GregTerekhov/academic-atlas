import { render, screen } from '@testing-library/react';

import { SectionDescriptions, SectionTitle } from 'types';
import { Cost } from 'components';

jest.mock('components/home/subcomponents', () => ({
  PriceControlsDesktop: jest.fn(() => <div data-testid='price-controls-desktop'></div>),
  PriceControlsMobile: jest.fn(() => <div data-testid='price-controls-mobile'></div>),
}));

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    homeCost: {
      title: SectionTitle.FindOutCost,
    },
  })),
}));

jest.mock('template', () => ({
  SectionTemplate: jest.fn(({ title, children }) => {
    return (
      <section id={title}>
        <h2>
          {title === SectionTitle.FindOutCost
            ? SectionDescriptions[SectionTitle.FindOutCost]
            : title}
        </h2>
        {children}
      </section>
    );
  }),
}));

describe('Cost Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<Cost />);
  });

  it('should render correctly with all subcomponents and render the correct h2', () => {
    const titleElement = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.FindOutCost],
    });

    expect(titleElement).toBeInTheDocument();

    const sectionElement = titleElement.closest('section');
    expect(sectionElement).toHaveAttribute('id', 'find-out-cost');

    expect(screen.getByTestId('price-controls-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('price-controls-mobile')).toBeInTheDocument();
  });
});
