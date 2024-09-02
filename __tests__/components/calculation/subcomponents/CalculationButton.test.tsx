import { fireEvent, render, screen } from '@testing-library/react';

import { AriaDescription, AriaId, PrimaryButtonLabel } from 'types';
import { useCalculationResult } from 'context';
import { CalculationButton } from 'components/calculation/subcomponents';
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
  const mockHandleShowCostResult = jest.fn();

  const setup = (isDisabled: boolean = true) => {
    render(<CalculationButton isDisabled={isDisabled} />);

    const button = screen.getByRole('button', {
      name: PrimaryButtonLabel.CostCalculation,
    });

    return { button };
  };

  beforeEach(() => {
    mockUseCalculationResult.mockReturnValue({
      handleShowCostResult: mockHandleShowCostResult,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render PrimaryButtonUI main attributes and props correctly', () => {
    const { button } = setup();

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-describedby', AriaId.CostOutput);

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

  test.each`
    isDisabled | isCalled
    ${false}   | ${true}
    ${true}    | ${false}
  `(
    'calls handle handleShowCostResult when isDisabled is $isDisabled',
    ({ isDisabled, isCalled }) => {
      const { button } = setup(isDisabled);

      fireEvent.click(button);

      if (isCalled) {
        expect(mockHandleShowCostResult).toHaveBeenCalled();
      } else {
        expect(mockHandleShowCostResult).not.toHaveBeenCalled();
      }
    },
  );

  test.each`
    isDisabled | expectedState
    ${false}   | ${false}
    ${true}    | ${true}
  `(
    'buttons disabled state is $expectedState when isDisabled is $isDisabled',
    ({ isDisabled, expectedState }) => {
      const { button } = setup(isDisabled);

      if (expectedState) {
        expect(button).toBeDisabled();
      } else {
        expect(button).not.toBeDisabled();
      }
    },
  );
});
