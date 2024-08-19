import { fireEvent, render, screen, waitFor } from '@testing-library/react';

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

describe('OptionSelectionProvider', () => {
  beforeEach(() => {
    let mockTheme = '';
    let mockRangeValue = Uniqueness.Zero;

    mockUseCalculationState.mockReturnValue({
      calculationData: {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Default,
        uniqueness: Uniqueness.Zero,
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
    });

    mockUseRangeValue.mockReturnValue({
      rangeValue: mockRangeValue,
      updateRangeValue: jest.fn((newValue) => {
        mockRangeValue = newValue;
      }),
      handleClearRangeValue: jest.fn(() => {
        mockRangeValue = Uniqueness.Zero;
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should toggle checkbox', async () => {
    render(
      <OptionSelectionProvider>
        <TestComponent />
      </OptionSelectionProvider>,
    );

    expect(screen.getByTestId('checkbox-status')).toHaveTextContent('Checked: No');

    fireEvent.click(screen.getByText('Toggle Checkbox'));
    await waitFor(() =>
      expect(screen.getByTestId('checkbox-status')).toHaveTextContent('Checked: Yes'),
    );
  });

  it('should update range value', async () => {
    render(
      <OptionSelectionProvider>
        <TestComponent />
      </OptionSelectionProvider>,
    );

    expect(screen.getByTestId('range-value')).toHaveTextContent('Range Value: 0');

    fireEvent.click(screen.getByText('Set Range Value'));
    await waitFor(() =>
      expect(screen.getByTestId('range-value')).toHaveTextContent('Range Value: 70'),
    );
  });

  it('should update theme', async () => {
    render(
      <OptionSelectionProvider>
        <TestComponent />
      </OptionSelectionProvider>,
    );

    fireEvent.change(screen.getByTestId('theme-input'), { target: { value: 'New Theme' } });
    // expect(mockHandleThemeChange).toHaveBeenCalledWith('New Theme');

    await waitFor(() =>
      expect(screen.getByTestId('theme-value')).toHaveTextContent('Theme: New Theme'),
    );
  });

  it('should update uniqueness value', async () => {
    render(
      <OptionSelectionProvider>
        <TestComponent />
      </OptionSelectionProvider>,
    );

    fireEvent.click(screen.getByText('Set Range Value'));

    await waitFor(() =>
      expect(screen.getByTestId('uniqueness-value')).toHaveTextContent('Uniqueness: 70'),
    );
  });

  it('should reset values', async () => {
    render(
      <OptionSelectionProvider>
        <TestComponent />
      </OptionSelectionProvider>,
    );

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
