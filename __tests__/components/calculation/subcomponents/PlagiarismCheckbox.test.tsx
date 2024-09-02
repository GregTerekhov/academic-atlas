import { fireEvent, render, screen } from '@testing-library/react';
import { PlagiarismCheckbox } from 'components/calculation/subcomponents';
import { useCalculation } from 'context';
import { getCheckboxStyles } from 'styles';
import { AriaLabel, IconName } from 'types';

jest.mock('context', () => ({
  useCalculation: jest.fn(),
}));

jest.mock('styles', () => ({
  getCheckboxStyles: jest.fn(),
}));

jest.mock('ui', () => ({
  SvgIconUI: jest.fn(({ id, ariaLabel, ariaHidden }) => (
    <svg
      data-testid='check-icon'
      id={id}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    />
  )),
}));

describe('PlagiarismCheckbox subComponent', () => {
  const mockUseCalculation = useCalculation as jest.Mock;
  const mockGetCheckboxStyles = getCheckboxStyles as jest.Mock;

  const renderComponent = () =>
    render(
      <PlagiarismCheckbox
        id='checkbox'
        label='Наявність перевірки на плагіат'
      />,
    );

  const mockContextValue = {
    isChecked: false,
    handleCheckboxChange: jest.fn(),
  };

  beforeEach(() => {
    mockUseCalculation.mockReturnValue(mockContextValue);
    mockGetCheckboxStyles.mockImplementation((isChecked: boolean) =>
      isChecked ? 'bg-accent-lightGradient' : 'bg-transparent',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly with a given label', () => {
    renderComponent();

    expect(screen.getByText('Наявність перевірки на плагіат')).toBeInTheDocument();
  });

  test.each`
    isChecked | expectedClass       | ariaChecked
    ${false}  | ${'bg-transparent'} | ${false}
  `(
    'render custom checkbox with expected class to be $expectedClass when isChecked is $isChecked',
    ({ isChecked, expectedClass, ariaChecked }) => {
      mockUseCalculation({ isChecked, handleCheckboxChange: jest.fn() });

      renderComponent();

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', `${ariaChecked}`);
      expect(checkbox).toHaveClass(expectedClass);

      const checkIcon = screen.queryByTestId('check-icon');

      if (isChecked) {
        expect(checkIcon).toHaveAttribute('id', IconName.Check);
        expect(checkIcon).toHaveAttribute('aria-hidden', 'false');
        expect(checkIcon).toHaveAttribute('aria-label', AriaLabel.Check);
      } else {
        expect(checkIcon).not.toBeInTheDocument();
      }
    },
  );

  test('calls handleCheckboxChange with the correct value when checkbox is clicked', () => {
    const mockHandleCheckboxChange = jest.fn();

    mockUseCalculation.mockReturnValue({
      ...mockContextValue,
      handleCheckboxChange: mockHandleCheckboxChange,
    });

    renderComponent();

    const hiddenInput = screen.getByLabelText('Наявність перевірки на плагіат');

    fireEvent.click(hiddenInput);

    expect(mockHandleCheckboxChange).toHaveBeenCalledWith(true);
  });

  test('calls handleCheckboxChange with the correct value when Enter or Space is pressed', () => {
    renderComponent();

    const checkbox = screen.getByRole('checkbox');

    fireEvent.keyDown(checkbox, { key: 'Enter' });
    expect(mockContextValue.handleCheckboxChange).toHaveBeenCalledWith(true);

    fireEvent.keyDown(checkbox, { key: ' ' });
    expect(mockContextValue.handleCheckboxChange).toHaveBeenCalledWith(true);
  });
});
