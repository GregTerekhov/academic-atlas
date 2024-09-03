import { render, screen } from '@testing-library/react';
import { PriceResult } from 'components/calculation/subcomponents';
import { useCalculation } from 'context';
import { calculatePrice, roundPriceToInterval } from 'helpers';
import {
  ExecutionTime,
  ExpertiseArea,
  ICalculation,
  Uniqueness,
  WorkType,
} from 'types/calculation';

jest.mock('context', () => ({
  useCalculation: jest.fn(),
}));

jest.mock('styles', () => ({
  getResultPriceStyles: jest.fn(() => 'mocked-result-price-class'),
  getDisclaimerTextStyles: jest.fn(() => 'mocked-disclaimer-text-class'),
  getDisclaimerCtaTextStyles: jest.fn(() => 'mocked-disclaimer-cta-text-class'),
}));

jest.mock('helpers', () => ({
  calculatePrice: jest.fn(),
  roundPriceToInterval: jest.fn(),
}));

jest.mock('components/calculation/subcomponents/telegram-submit-button', () =>
  jest.fn(() => <div data-testid='tg-submit'></div>),
);

describe('PriceResult subComponent', () => {
  const mockUseCalculation = useCalculation as jest.Mock;
  const mockCalculatePrice = calculatePrice as jest.Mock;
  const mockRoundPriceToInterval = roundPriceToInterval as jest.Mock;

  const mockCalculationData: Partial<ICalculation> = {
    workType: WorkType.Abstracts,
    expertiseArea: ExpertiseArea.AutomationAndInstrumentation,
    executionTime: ExecutionTime.LongTerm,
    uniqueness: Uniqueness.Highest,
  };
  const mockCalculatedPrice = 7770;
  const mockRenderedPrice = 7750;

  beforeEach(() => {
    mockUseCalculation.mockReturnValue({ calculationData: mockCalculationData });
    mockCalculatePrice.mockReturnValue(mockCalculatedPrice);
    mockRoundPriceToInterval.mockReturnValue(mockRenderedPrice);

    render(<PriceResult />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering and Styles', () => {
    test('renders heading with correct id attribute', () => {
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveAttribute('id', 'modal');
    });

    test('renders calculation result with correct attributes and class', () => {
      const calculationResult = screen.getByText(`від ${mockRenderedPrice} грн*`);
      expect(calculationResult).toBeInTheDocument();
      expect(calculationResult).toHaveAttribute('aria-live', 'polite');
      expect(calculationResult).toHaveAttribute('aria-atomic', 'true');
      expect(calculationResult).toHaveClass('mocked-result-price-class');
    });

    test('renders disclaimer text with correct class', () => {
      const disclaimerText = screen.getByText(
        /Зверніть увагу, що ця вартість може варіюватися залежно від складності вашої роботи і вона може бути змінена/i,
      );
      expect(disclaimerText).toBeInTheDocument();
      expect(disclaimerText).toHaveClass('mocked-disclaimer-text-class');
    });

    test('renders disclaimer ctaText with correct class', () => {
      const ctaText = screen.getByText(
        /Для замовлення та уточнення питань зв’яжіться з нами у телеграм/i,
      );
      expect(ctaText).toBeInTheDocument();
      expect(ctaText).toHaveClass('mocked-disclaimer-cta-text-class');
    });

    test('renders button correctly', () => {
      expect(screen.getByTestId('tg-submit')).toBeInTheDocument();
    });
  });

  describe('Function Calls', () => {
    test('calls calculatePrice and roundPriceToInterval functions with correct arguments', () => {
      expect(mockCalculatePrice).toHaveBeenCalledWith(
        mockCalculationData.workType,
        mockCalculationData.expertiseArea,
        mockCalculationData.executionTime,
        mockCalculationData.uniqueness,
      );

      expect(mockRoundPriceToInterval).toHaveBeenCalledWith(mockCalculatedPrice);
    });
  });
});
