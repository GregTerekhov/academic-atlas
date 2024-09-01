import { render, screen } from '@testing-library/react';
import { PriceResult } from 'components/calculation/subcomponents';
import { ExecutionTime, ExpertiseArea, Uniqueness, WorkType } from 'types';

jest.mock('context', () => ({
  useCalculation: jest.fn(() => ({
    calculationData: {
      workType: WorkType,
      executionTime: ExecutionTime,
      expertiseArea: ExpertiseArea,
      uniqueness: Uniqueness,
    },
  })),
}));

jest.mock('styles', () => ({
  getResultPriceStyles: jest.fn(),
  getDisclaimerTextStyles: jest.fn(),
  getDisclaimerCtaTextStyles: jest.fn(),
}));

jest.mock('helpers', () => ({
  calculatePrice: jest.fn(),
  roundPriceToInterval: jest.fn(),
}));

jest.mock('components/calculation/subcomponents/telegram-submit-button', () =>
  jest.fn(() => <div data-testid='tg-submit'></div>),
);

describe('PriceResult', () => {
  test('shouldWork', () => {
    render(<PriceResult />);

    screen.debug();
    const asd = screen.getByRole('heading', { level: 2 });
    expect(asd).toBeInTheDocument();
  });
});
