import { fireEvent, render, screen } from '@testing-library/react';

import { useCalculation, useCalculationResult } from 'context';
import { BackButton } from 'components';

jest.mock('context', () => ({
  useCalculation: jest.fn(),
  useCalculationResult: jest.fn(),
}));

jest.mock('ui', () => ({
  SvgIconUI: jest.fn(() => <svg data-testid='button-back-icon'></svg>),
}));

describe('BackButton Component', () => {
  const mockUseCalculation = useCalculation as jest.Mock;
  const mockUseCalculationResult = useCalculationResult as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render the button if hasSubmitData is false', () => {
    const handleClearValues = jest.fn();

    mockUseCalculation.mockReturnValue({ handleClearValues });
    mockUseCalculationResult.mockReturnValue({ hasSubmitData: false });

    render(<BackButton />);

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('should render the button if hasSubmitData is true', () => {
    const handleClearValues = jest.fn();

    mockUseCalculation.mockReturnValue({ handleClearValues });
    mockUseCalculationResult.mockReturnValue({ hasSubmitData: true });

    render(<BackButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should call handleResetCostResult and handleClearValues when is button is clicked', () => {
    const handleResetCostResult = jest.fn();
    const handleClearValues = jest.fn();

    mockUseCalculation.mockReturnValue({ handleClearValues });
    mockUseCalculationResult.mockReturnValue({
      hasSubmitData: true,
      handleResetCostResult,
    });

    render(<BackButton />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleResetCostResult).toHaveBeenCalled();
    expect(handleClearValues).toHaveBeenCalled();
  });
});
