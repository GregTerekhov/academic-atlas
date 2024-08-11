import { render, screen } from '@testing-library/react';

import { SectionDescriptions, SectionTitle } from 'types';

import { Cost } from 'components';

jest.mock('../../../components/home/subcomponents', () => ({
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

describe('Cost Component', () => {
  beforeEach(() => {
    render(<Cost />);
  });

  it('should render correctly with all subcomponents', () => {
    expect(
      screen.getByRole('heading', { name: SectionDescriptions[SectionTitle.FindOutCost] }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('price-controls-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('price-controls-mobile')).toBeInTheDocument();
  });

  it('should render background image if backgroundImagePaths exist', () => {
    expect(screen.getByAltText(SectionDescriptions[SectionTitle.FindOutCost])).toBeInTheDocument();
  });
});
