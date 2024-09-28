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

const expectTextContent = (testId: string, expectedText: string) => {
  expect(screen.getByTestId(testId)).toHaveTextContent(expectedText);
};

const clickAndExpect = (buttonText: string, testId: string, expectedText: string) => {
  fireEvent.click(screen.getByText(buttonText));

  expectTextContent(testId, expectedText);
};

const actions = [
  {
    action: () => fireEvent.click(screen.getByText('Change Work Type')),
    testId: 'work-type',
    expectedText: `WorkType: ${WorkType.Default}`,
  },
  {
    action: () => fireEvent.click(screen.getByText('Change Expertise Area')),
    testId: 'expertise-area',
    expectedText: `ExpertiseArea: ${ExpertiseArea.Default}`,
  },
  {
    action: () => fireEvent.click(screen.getByText('Change Execution Time')),
    testId: 'execution-time',
    expectedText: `ExecutionTime: ${ExecutionTime.Default}`,
  },
  {
    action: () => fireEvent.click(screen.getByText('Toggle Checkbox')),
    testId: 'checkbox-status',
    expectedText: 'Checked: No',
  },
  {
    action: () => fireEvent.click(screen.getByText('Set Range Value')),
    testId: 'uniqueness-value',
    expectedText: `Uniqueness: ${Uniqueness.Zero}`,
  },
  {
    action: () =>
      fireEvent.change(screen.getByTestId('theme-input'), {
        target: { value: 'Temporary Theme' },
      }),
    testId: 'theme-value',
    expectedText: 'Theme:',
  },
];

const mockFieldsData = [
  { buttonText: 'Change Work Type', testId: 'work-type', expectedText: WorkType.BachelorTheses },
  {
    buttonText: 'Change Expertise Area',
    testId: 'expertise-area',
    expectedText: ExpertiseArea.Education,
  },
  {
    buttonText: 'Change Execution Time',
    testId: 'execution-time',
    expectedText: ExecutionTime.Urgent,
  },
  {
    buttonText: 'Toggle Checkbox',
    testId: 'checkbox-status',
    expectedText: 'Checked: Yes',
  },
  {
    buttonText: 'Set Range Value',
    testId: 'uniqueness-value',
    expectedText: 'Uniqueness: 70',
  },
];

describe('CalculationProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    renderTestComponent();
  });

  it.each(mockFieldsData)(
    'should update calculation data correctly for $testId',
    ({ buttonText, testId, expectedText }) => {
      clickAndExpect(buttonText, testId, expectedText);
      expect(true).toBe(true);
    },
  );

  it.each([
    { value: 'Valid Theme', expectedText: 'Theme: Valid Theme' },
    { value: '<script>alert("xss")</script>', expectedText: 'Theme:' },
  ])('should update theme with $value', async ({ value, expectedText }) => {
    fireEvent.change(screen.getByTestId('theme-input'), { target: { value } });
    await waitFor(() => {
      expectTextContent('theme-value', expectedText);
      expect(true).toBe(true);
    });
  });

  it('should reset values', () => {
    actions.forEach(({ action }) => action());

    fireEvent.click(screen.getByText('Clear Values'));

    actions.forEach(({ testId, expectedText }) => {
      expectTextContent(testId, expectedText);
      expect(true).toBe(true);
    });
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
