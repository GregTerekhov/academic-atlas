/* eslint-disable jest/no-conditional-expect */
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
  const handleResetCostResult = jest.fn();
  const resetCalculation = jest.fn();

  const setupMocks = (hasSubmitData: boolean) => {
    mockUseCalculation.mockReturnValue({ resetCalculation });
    mockUseCalculationResult.mockReturnValue({
      hasSubmitData,
      handleResetCostResult,
    });
  };

  const renderComponent = () => render(<BackButton />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each`
    hasSubmitData | shouldRenderButton
    ${false}      | ${false}
    ${true}       | ${true}
  `(
    'should $shouldRenderButton render the button when hasSubmitData is $hasSubmitData',
    ({ hasSubmitData, shouldRenderButton }) => {
      setupMocks(hasSubmitData);
      renderComponent();

      const button = screen.queryByRole('button');

      if (shouldRenderButton) {
        expect(button).toBeInTheDocument();
        fireEvent.click(button!);
        expect(handleResetCostResult).toHaveBeenCalled();
        expect(resetCalculation).toHaveBeenCalled();
      } else {
        expect(button).not.toBeInTheDocument();
      }
    },
  );
});
