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

  const setupMocks = (hasSubmitData: boolean, handleResetCostResult = jest.fn()) => {
    const resetCalculation = jest.fn();

    mockUseCalculation.mockReturnValue({ resetCalculation });
    mockUseCalculationResult.mockReturnValue({
      hasSubmitData,
      handleResetCostResult,
    });

    return { resetCalculation, handleResetCostResult };
  };

  const renderComponent = () => render(<BackButton />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render the button if hasSubmitData is false', () => {
    setupMocks(false);
    renderComponent();

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('should render the button if hasSubmitData is true', () => {
    setupMocks(true);
    renderComponent();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should call handleResetCostResult and resetCalculation when is button is clicked', () => {
    const { resetCalculation, handleResetCostResult } = setupMocks(true);
    renderComponent();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleResetCostResult).toHaveBeenCalled();
    expect(resetCalculation).toHaveBeenCalled();
  });
});
