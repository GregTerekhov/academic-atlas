import { fireEvent, render, screen } from '@testing-library/react';
import { CalculationButton } from 'components/calculation/subcomponents';
import { useCalculationResult } from 'context';
import { AriaDescription, AriaId, PrimaryButtonLabel } from 'types';
import { PrimaryButtonUI } from 'ui';

jest.mock('context', () => ({
  useCalculationResult: jest.fn(),
}));

jest.mock('ui', () => ({
  PrimaryButtonUI: jest.fn(
    ({ children, isDisabled, ariaId, props, handleClick, ariaDescription }) => (
      <>
        <button
          aria-describedby={ariaId}
          onClick={handleClick}
          disabled={isDisabled}
          {...props}
        >
          {children}
        </button>
        <span
          id={ariaId}
          data-testid='calculation-button-aria-description'
        >
          {ariaDescription}
        </span>
      </>
    ),
  ),
}));

describe('CalculationButton subComponent', () => {
  const mockUseCalculationResult = useCalculationResult as jest.Mock;

  const setup = (isDisabled: boolean = true) => {
    return render(<CalculationButton isDisabled={isDisabled} />);
  };

  beforeEach(() => {
    mockUseCalculationResult.mockReturnValue({
      handleShowCostResult: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render PrimaryButtonUI main attributes and props correctly', () => {
    setup();

    const calculationButtonTag = screen.getByRole('button', {
      name: PrimaryButtonLabel.CostCalculation,
    });
    expect(calculationButtonTag).toBeInTheDocument();
    expect(calculationButtonTag).toBeDisabled();
    expect(calculationButtonTag).toHaveAttribute('aria-describedby', AriaId.CostOutput);
    expect(PrimaryButtonUI).toHaveBeenCalledWith(
      expect.objectContaining({ isOnLightBackground: true }),
      {},
    );
  });

  test('should render PrimaryButtonUI description correctly', () => {
    setup();

    const calculationButtonDesc = screen.getByText(AriaDescription.CostOutput);
    expect(calculationButtonDesc).toBeInTheDocument();
    expect(calculationButtonDesc).toHaveAttribute('id', AriaId.CostOutput);
  });

  test('should check the disable state', () => {
    const mockHandleShowCostResult = jest.fn();
    mockUseCalculationResult.mockReturnValue({
      handleShowCostResult: mockHandleShowCostResult,
    });

    const { rerender } = setup();

    const calculationButtonTag = screen.getByRole('button', {
      name: PrimaryButtonLabel.CostCalculation,
    });

    fireEvent.click(calculationButtonTag);
    expect(mockHandleShowCostResult).not.toHaveBeenCalled();

    rerender(<CalculationButton isDisabled={false} />);

    fireEvent.click(calculationButtonTag);
    expect(mockHandleShowCostResult).toHaveBeenCalled();
  });
});
