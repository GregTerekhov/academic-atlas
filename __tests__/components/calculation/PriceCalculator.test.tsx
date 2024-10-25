import { render, screen } from '@testing-library/react';

import { CalculationTitle } from 'types';
import { useCalculationResult } from 'context/CalculationResultProvider';
import { useButtonDisabled, usePlagiarismCheck } from 'hooks';
import PriceCalculator from 'components/calculation/product-price-calculator';

jest.mock('hooks', () => ({
  useButtonDisabled: jest.fn(),
  usePlagiarismCheck: jest.fn(),
}));

jest.mock('context/CalculationResultProvider', () => ({
  useCalculationResult: jest.fn(),
}));

jest.mock('components/calculation/subcomponents/input-fields-section', () =>
  jest.fn(() => <ul data-testid='input-fields'></ul>),
);

jest.mock('components/calculation/subcomponents/calculation-button-section', () =>
  jest.fn(() => <button data-testid='calculation-button'></button>),
);

jest.mock('components/calculation/subcomponents/plagiarism-section', () =>
  jest.fn(() => <div data-testid='plagiarism-section'></div>),
);
jest.mock('components/calculation/subcomponents/price-result', () =>
  jest.fn(() => <div data-testid='price-result'></div>),
);

const mockUseCalculationResult = useCalculationResult as jest.Mock;
const mockUsePlagiarismCheck = usePlagiarismCheck as jest.Mock;
const mockUseButtonDisabled = useButtonDisabled as jest.Mock;

const setup = (overrides = {}) => {
  const defaultValues = {
    hasSubmitData: false,
    shouldPlagiarismCheck: false,
    isButtonDisabled: true,
    ...overrides,
  };

  mockUseCalculationResult.mockReturnValue({ hasSubmitData: defaultValues.hasSubmitData });
  mockUsePlagiarismCheck.mockReturnValue({
    shouldPlagiarismCheck: defaultValues.shouldPlagiarismCheck,
  });
  mockUseButtonDisabled.mockReturnValue({ isButtonDisabled: defaultValues.isButtonDisabled });

  return render(<PriceCalculator />);
};

describe('PriceCalculator Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title with correct attributes', () => {
    setup();

    const titleElement = screen.getByText(CalculationTitle.CalculationForm);

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveAttribute('id', 'modal');
  });

  it('renders all component by default', () => {
    setup();

    expect(screen.getByTestId('input-fields')).toBeInTheDocument();
    expect(screen.getByTestId('calculation-button')).toBeInTheDocument();
    expect(screen.queryByTestId('price-result')).not.toBeInTheDocument();
    expect(screen.queryByTestId('plagiarism-section')).not.toBeInTheDocument();
  });

  it('renders PriceResult when hasSubmitData is true', () => {
    setup({ hasSubmitData: true });

    expect(screen.getByTestId('price-result')).toBeInTheDocument();
  });

  it('should render PlagiarismSection when shouldPlagiarismCheck is true', () => {
    setup({ shouldPlagiarismCheck: true });

    expect(screen.getByTestId('plagiarism-section')).toBeInTheDocument();
  });
});
