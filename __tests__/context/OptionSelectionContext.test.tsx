import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ExecutionTime, ExpertiseArea, Uniqueness, WorkType } from 'types';
import { OptionSelectionProvider, useCalculation } from 'context';
import { useCalculationState, useRangeValue } from 'hooks';

jest.mock('hooks', () => ({
  useCalculationState: jest.fn(),
  useRangeValue: jest.fn(),
}));

const mockUseCalculationState = useCalculationState as jest.Mock;
const mockUseRangeValue = useRangeValue as jest.Mock;

const TestComponent = () => {
  const {
    isChecked,
    rangeValue,
    calculationData,
    handleCheckboxChange,
    handleClearValues,
    handleOptionChange,
    handleRangeValueChange,
    handleThemeInputChange,
  } = useCalculation();

  return (
    <div>
      <div data-testid='checkbox-status'>Checked: {isChecked ? 'Yes' : 'No'}</div>
      <div data-testid='range-value'>Range Value: {rangeValue}</div>
      <div data-testid='theme-value'>Theme: {calculationData?.theme || ''}</div>
      <div data-testid='uniqueness-value'>
        Uniqueness: {calculationData?.uniqueness && calculationData.uniqueness}
      </div>

      <input
        type='text'
        data-testid='theme-input'
        onChange={handleThemeInputChange}
        placeholder='Enter theme'
      />

      <button onClick={() => handleOptionChange('workType', WorkType.BachelorTheses)}>
        Change Work Type
      </button>

      <button onClick={() => handleCheckboxChange(!isChecked)}>Toggle Checkbox</button>

      <button onClick={() => handleRangeValueChange(70)}>Set Range Value</button>

      <button onClick={handleClearValues}>Clear Values</button>
    </div>
  );
};

const renderTestComponent = () => {
  return render(
    <OptionSelectionProvider>
      <TestComponent />
    </OptionSelectionProvider>,
  );
};

const mockInitialState = () => {
  let mockTheme = '';
  let mockRangeValue = Uniqueness.Zero;

  mockUseCalculationState.mockImplementation(() => ({
    calculationData: {
      workType: WorkType.Default,
      expertiseAre: ExpertiseArea.Default,
      executionTime: ExecutionTime.Default,
      uniqueness: mockRangeValue,
      theme: mockTheme,
    },
    handleOptionChange: jest.fn(),
    handleThemeChange: jest.fn((newTheme: string) => {
      mockTheme = newTheme;
    }),
    handleRangeChange: jest.fn((newValue: number) => {
      mockRangeValue = newValue;
    }),
    resetCalculation: jest.fn(),
  }));

  mockUseRangeValue.mockImplementation(() => ({
    rangeValue: mockRangeValue,
    updateRangeValue: jest.fn((newValue: number) => {
      mockRangeValue = newValue;
    }),
    handleClearRangeValue: jest.fn(() => {
      mockRangeValue = Uniqueness.Zero;
    }),
  }));
};

describe('OptionSelectionProvider', () => {
  beforeEach(() => {
    mockInitialState();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should toggle checkbox', async () => {
    renderTestComponent();

    fireEvent.click(screen.getByText('Toggle Checkbox'));
    await waitFor(() =>
      expect(screen.getByTestId('checkbox-status')).toHaveTextContent('Checked: Yes'),
    );
  });

  it('should update range value', async () => {
    renderTestComponent();

    fireEvent.click(screen.getByText('Set Range Value'));
    await waitFor(() =>
      expect(screen.getByTestId('range-value')).toHaveTextContent('Range Value: 70'),
    );
  });

  it('should update theme with valid value', async () => {
    renderTestComponent();

    fireEvent.change(screen.getByTestId('theme-input'), { target: { value: 'Valid Theme' } });

    await waitFor(() =>
      expect(screen.getByTestId('theme-value')).toHaveTextContent('Theme: Valid Theme'),
    );
  });

  it('should not update theme input with invalid input', async () => {
    renderTestComponent();

    fireEvent.change(screen.getByTestId('theme-input'), {
      target: { value: '<script>alert("xss")</script>' },
    });

    await waitFor(() => expect(screen.getByTestId('theme-value')).toHaveTextContent('Theme:'));
  });

  it('should update uniqueness value', async () => {
    renderTestComponent();

    fireEvent.click(screen.getByText('Set Range Value'));

    await waitFor(() =>
      act(() => {
        expect(screen.getByTestId('uniqueness-value')).toHaveTextContent('Set Range Value: 70');
      }),
    );
  });

  it('should reset values', async () => {
    renderTestComponent();

    fireEvent.click(screen.getByText('Toggle Checkbox'));
    fireEvent.click(screen.getByText('Set Range Value'));
    fireEvent.change(screen.getByTestId('theme-input'), { target: { value: 'Temporary Theme' } });

    fireEvent.click(screen.getByText('Clear Values'));

    await waitFor(() => {
      expect(screen.getByTestId('checkbox-status')).toHaveTextContent('Checked: No');
      expect(screen.getByTestId('range-value')).toHaveTextContent('Range Value: 0');
      expect(screen.getByTestId('theme-value')).toHaveTextContent('Theme:');
    });
  });
});

describe('useCalculation context hook', () => {
  it('should throw an error when used outside of OptionSelectionProvider', () => {
    const TestCalculationErrorComponent = () => {
      const { resetCalculation } = useCalculation();
      return <button onClick={resetCalculation}>Test</button>;
    };

    expect(() => render(<TestCalculationErrorComponent />)).toThrow(
      'useCalculation must be used within an OptionSelectionProvider',
    );
  });
});
