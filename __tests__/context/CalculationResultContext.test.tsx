import { fireEvent, render, screen } from '@testing-library/react';
import { CalculationResultProvider, useCalculationResult } from 'context';

const TestComponent = () => {
  const { hasSubmitData, handleResetCostResult, handleShowCostResult } = useCalculationResult();

  return (
    <div>
      <div data-testid='has-submit-data'>Has Submit Data: {hasSubmitData ? 'Yes' : 'No'}</div>
      <button onClick={handleShowCostResult}>Show Cost Result</button>
      <button onClick={handleResetCostResult}>Reset Cost Result</button>
    </div>
  );
};

const renderWithProvider = () => {
  render(
    <CalculationResultProvider>
      <TestComponent />
    </CalculationResultProvider>,
  );
};

const clickButton = (buttonText: string) => {
  fireEvent.click(screen.getByText(buttonText));
};

const expectHasSubmitData = (expectedText: string) => {
  expect(screen.getByTestId('has-submit-data')).toHaveTextContent(
    `Has Submit Data: ${expectedText}`,
  );
};

describe('CalculationResultProvider', () => {
  beforeEach(() => {
    renderWithProvider();
  });

  it('should initialise context values correctly', () => {
    expectHasSubmitData('No');
    expect(true).toBe(true);
  });

  it('should update hasSubmitData when handleShowCostResult is called', () => {
    clickButton('Show Cost Result');
    expectHasSubmitData('Yes');
    expect(true).toBe(true);
  });

  it('should reset hasSubmitData when handleResetCostResult is called', () => {
    clickButton('Show Cost Result');
    expectHasSubmitData('Yes');
    expect(true).toBe(true);

    clickButton('Reset Cost Result');
    expectHasSubmitData('No');
    expect(true).toBe(true);
  });
});

describe('useCalculationResult context hook', () => {
  it('should throw an error when used outside of CalculationResultProvider', () => {
    const TestCalculationErrorComponent = () => {
      useCalculationResult();
      return null;
    };

    expect(() => render(<TestCalculationErrorComponent />)).toThrow(
      'useCalculationResult must be used within a CalculationResultProvider',
    );
  });
});
