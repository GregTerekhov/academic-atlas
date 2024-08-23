import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ExecutionTime, ExpertiseArea, Uniqueness, WorkType } from 'types';
import { CalculationProvider, useCalculation } from 'context';

const TestComponent = () => {
  const {
    isChecked,
    calculationData,
    handleOptionChange,
    handleThemeInputChange,
    handleRangeValueChange,
    handleCheckboxChange,
    resetCalculation,
  } = useCalculation();

  return (
    <div>
      <div data-testid='work-type'>WorkType: {calculationData.workType}</div>
      <div data-testid='expertise-area'>ExpertiseArea: {calculationData.expertiseArea}</div>
      <div data-testid='execution-time'>ExecutionTime: {calculationData.executionTime}</div>
      <div data-testid='checkbox-status'>Checked: {isChecked ? 'Yes' : 'No'}</div>
      <div data-testid='theme-value'>Theme: {calculationData.theme}</div>
      <div data-testid='uniqueness-value'>Uniqueness: {calculationData.uniqueness}</div>

      <input
        type='text'
        data-testid='theme-input'
        onChange={handleThemeInputChange}
        placeholder='Enter theme'
      />

      <button onClick={() => handleOptionChange('workType', WorkType.BachelorTheses)}>
        Change Work Type
      </button>

      <button onClick={() => handleOptionChange('expertiseArea', ExpertiseArea.Education)}>
        Change Expertise Area
      </button>

      <button onClick={() => handleOptionChange('executionTime', ExecutionTime.Urgent)}>
        Change Execution Time
      </button>

      <button onClick={() => handleCheckboxChange(!isChecked)}>Toggle Checkbox</button>

      <button onClick={() => handleRangeValueChange(70)}>Set Range Value</button>

      <button onClick={resetCalculation}>Clear Values</button>
    </div>
  );
};

const renderTestComponent = () => {
  return render(
    <CalculationProvider>
      <TestComponent />
    </CalculationProvider>,
  );
};

describe('CalculationProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update workType when handleOptionChange is called', () => {
    renderTestComponent();

    fireEvent.click(screen.getByText('Change Work Type'));
    expect(screen.getByTestId('work-type')).toHaveTextContent(WorkType.BachelorTheses);
  });

  it('should update expertiseArea when handleOptionChange is called', () => {
    renderTestComponent();

    fireEvent.click(screen.getByText('Change Expertise Area'));
    expect(screen.getByTestId('expertise-area')).toHaveTextContent(ExpertiseArea.Education);
  });

  it('should update executionTime when handleOptionChange is called', () => {
    renderTestComponent();

    fireEvent.click(screen.getByText('Change Execution Time'));
    expect(screen.getByTestId('execution-time')).toHaveTextContent(ExecutionTime.Urgent);
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
      expect(screen.getByTestId('uniqueness-value')).toHaveTextContent('Uniqueness: 70'),
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

  it('should reset values', async () => {
    renderTestComponent();

    fireEvent.click(screen.getByText('Change Work Type'));
    fireEvent.click(screen.getByText('Change Expertise Area'));
    fireEvent.click(screen.getByText('Change Execution Time'));
    fireEvent.click(screen.getByText('Toggle Checkbox'));
    fireEvent.click(screen.getByText('Set Range Value'));
    fireEvent.change(screen.getByTestId('theme-input'), { target: { value: 'Temporary Theme' } });

    fireEvent.click(screen.getByText('Clear Values'));

    expect(screen.getByTestId('work-type').textContent).toBe(`WorkType: ${WorkType.Default}`);
    expect(screen.getByTestId('expertise-area').textContent).toBe(
      `ExpertiseArea: ${ExpertiseArea.Default}`,
    );
    expect(screen.getByTestId('execution-time').textContent).toBe(
      `ExecutionTime: ${ExecutionTime.Default}`,
    );
    expect(screen.getByTestId('uniqueness-value').textContent).toBe(
      `Uniqueness: ${Uniqueness.Zero}`,
    );
    expect(screen.getByTestId('checkbox-status')).toHaveTextContent('Checked: No');
    expect(screen.getByTestId('theme-value')).toHaveTextContent('Theme:');
  });
});

describe('useCalculation context hook', () => {
  it('should throw an error when used outside of CalculationProvider', () => {
    const TestCalculationErrorComponent = () => {
      const { resetCalculation } = useCalculation();
      return <button onClick={resetCalculation}>Test</button>;
    };

    expect(() => render(<TestCalculationErrorComponent />)).toThrow(
      'useCalculation must be used within an CalculationProvider',
    );
  });
});
