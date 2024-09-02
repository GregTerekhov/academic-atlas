import { fireEvent, render, screen } from '@testing-library/react';
import { RangeInput } from 'components/calculation/subcomponents';
import { useCalculation } from 'context';
import { useRangeSettings } from 'hooks';
import { getDisabledRangeStyles } from 'styles';
import { AriaLabel, RangeValue } from 'types';

jest.mock('context', () => ({
  useCalculation: jest.fn(),
}));

jest.mock('hooks', () => ({
  useRangeSettings: jest.fn(),
  useAutoSetRange: jest.fn(),
}));

jest.mock('styles', () => ({
  getDisabledRangeStyles: jest.fn(),
}));

describe('RangeInput subComponent', () => {
  const mockUseRangeSettings = useRangeSettings as jest.Mock;
  const mockUseCalculation = useCalculation as jest.Mock;
  const mockGetDisabledRangeStyles = getDisabledRangeStyles as jest.Mock;
  const mockHandleChange = jest.fn();

  const setupMocks = (isChecked: boolean, uniqueness: RangeValue, showMinimalText: boolean) => {
    mockUseCalculation.mockReturnValue({
      isChecked,
      calculationData: { uniqueness },
    });

    mockUseRangeSettings.mockReturnValue({
      showMinimalText,
      rangeInputClass: '',
      handleChange: mockHandleChange,
      updateThumbColor: jest.fn(),
    });

    mockGetDisabledRangeStyles.mockReturnValue(
      !isChecked ? 'text-disabled-foreground' : 'text-darkBase dark:text-whiteBase',
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render subComponent with default props and values', () => {
    setupMocks(false, RangeValue.MIN, false);

    render(<RangeInput id='test-id' />);

    const inputRange = screen.getByRole('slider');
    expect(inputRange).toBeInTheDocument();
    expect(inputRange).toHaveAttribute('aria-label', AriaLabel.Range);
    expect(inputRange).toHaveAttribute('step', RangeValue.STEP.toString());
  });

  test.each`
    isChecked | isDisabled | uniqueness        | expectedClass                          | value
    ${true}   | ${false}   | ${RangeValue.MIN} | ${'text-darkBase dark:text-whiteBase'} | ${RangeValue.MIN.toString()}
    ${false}  | ${true}    | ${RangeValue.MAX} | ${'text-disabled-foreground'}          | ${RangeValue.MAX.toString()}
  `(
    'render with correct classes and input state when isChecked = $isChecked and uniqueness = $uniqueness',
    ({ isChecked, isDisabled, uniqueness, expectedClass, value }) => {
      setupMocks(isChecked, uniqueness, false);

      render(<RangeInput id='test-id' />);

      expect(mockGetDisabledRangeStyles).toHaveBeenCalledWith(isChecked);

      const label = screen.getByText(/Оберіть відсоток унікальності/i);
      expect(label).toHaveClass(expectedClass);

      const input = screen.getByRole('slider') as HTMLInputElement;

      if (isDisabled) {
        expect(input).toBeDisabled();
      } else {
        expect(input).not.toBeDisabled();
      }

      expect(input).toHaveValue(value);
    },
  );

  test.each`
    showMinimalText | fullTextClass         | shortTextClass
    ${true}         | ${'hidden sm:inline'} | ${'inline sm:hidden'}
    ${false}        | ${'hidden sm:inline'} | ${'inline sm:hidden'}
  `(
    'display minimal text conditionally when showMinimalText  is $showMinimalText',
    ({ showMinimalText, fullTextClass, shortTextClass }) => {
      setupMocks(false, RangeValue.MIN, showMinimalText);

      render(<RangeInput id='test-id' />);

      if (showMinimalText) {
        const shortText = screen.getByText(/мін\./i);

        expect(shortText).toHaveClass(shortTextClass);
      } else {
        const fullText = screen.queryByText(/мінімальний/i);
        if (fullText) {
          expect(fullText).toHaveClass(fullTextClass);
        } else {
          expect(fullText).toBeNull();
        }
      }
    },
  );

  test('calls handleChange on input change', () => {
    setupMocks(true, RangeValue.MIN, false);

    render(<RangeInput id='test-id' />);

    const inputRange = screen.getByRole('slider') as HTMLInputElement;

    fireEvent.change(inputRange, { target: { value: '50' } });
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
    expect(mockHandleChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
