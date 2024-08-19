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

describe('CalculationResultProvider', () => {
  beforeEach(() => {
    render(
      <CalculationResultProvider>
        <TestComponent />
      </CalculationResultProvider>,
    );
  });

  it('should initialise context values correctly', () => {
    expect(screen.getByTestId('has-submit-data')).toHaveTextContent('Has Submit Data: No');
  });

  it('should update hasSubmitData when handleShowCostResult is called', () => {
    fireEvent.click(screen.getByText('Show Cost Result'));
    expect(screen.getByTestId('has-submit-data')).toHaveTextContent('Has Submit Data: Yes');
  });

  it('should reset hasSubmitData when handleResetCostResult is called', () => {
    expect(screen.getByTestId('has-submit-data')).toHaveTextContent('Has Submit Data: No');

    fireEvent.click(screen.getByText('Show Cost Result'));
    expect(screen.getByTestId('has-submit-data')).toHaveTextContent('Has Submit Data: Yes');

    fireEvent.click(screen.getByText('Reset Cost Result'));
    expect(screen.getByTestId('has-submit-data')).toHaveTextContent('Has Submit Data: No');
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
