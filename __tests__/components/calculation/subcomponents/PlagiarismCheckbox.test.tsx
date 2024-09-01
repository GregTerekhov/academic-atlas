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

  test('render the custom checkbox with correct aria attributes and class', () => {
    renderComponent();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    expect(checkbox).toHaveClass('bg-transparent');
  });

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

  test('renders SvgIconUI when is isChecked is true', () => {
    mockUseCalculation.mockReturnValue({
      ...mockContextValue,
      isChecked: true,
    });

    renderComponent();

    const checkIcon = screen.getByTestId('check-icon');
    expect(checkIcon).toBeInTheDocument();
    expect(checkIcon).toHaveAttribute('id', IconName.Check);
    expect(checkIcon).toHaveAttribute('aria-hidden', 'false');
    expect(checkIcon).toHaveAttribute('aria-label', AriaLabel.Check);
  });

  test('does not render SvgIconUI when is isChecked is false', () => {
    renderComponent();

    const checkIcon = screen.queryByTestId('check-icon');
    expect(checkIcon).not.toBeInTheDocument();
  });
});
