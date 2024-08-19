import { fireEvent, render, screen } from '@testing-library/react';

import { DropdownAriaId, ExpertiseArea, type IDropdownTriggerProps } from 'types';
import { DropdownTrigger } from 'ui/subcomponents';

import { getDropdownIconStyles, getDropdownLabelStyles, getDropdownTriggerStyles } from 'styles';

jest.mock('ui/svg-icon', () =>
  jest.fn((props) => (
    <svg
      role='img'
      width={props.size.width}
      height={props.size.height}
      className={props.className}
      aria-hidden={props.ariaHidden}
      aria-label={props.ariaLabel}
    >
      <use href={`/images/icons.svg#icon-${props.id}`} />
    </svg>
  )),
);

describe('DropdownTrigger Component', () => {
  const mockHandleToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderDropdownTrigger = (props: IDropdownTriggerProps) => {
    render(<DropdownTrigger {...props} />);
  };

  it('should render button with correct styles and attributes', () => {
    const props = {
      isOpen: false,
      isOptionSelected: false,
      handleToggle: mockHandleToggle,
      selectedLabel: ExpertiseArea.Education,
      ariaId: DropdownAriaId.EXPERTISE_AREA,
    };

    renderDropdownTrigger(props);

    const buttonClass = getDropdownTriggerStyles(false, false);
    const labelClass = getDropdownLabelStyles(false);
    const iconClass = getDropdownIconStyles(false, false);

    const button = screen.getByRole('button');
    const label = screen.getByText(ExpertiseArea.Education);
    const icon = screen.getByRole('img');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(buttonClass);
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-controls', `${DropdownAriaId.EXPERTISE_AREA}-list`);

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass(labelClass);

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass(iconClass);
  });

  it('should apply correct styles when dropdown is open and option is selected', () => {
    const props = {
      isOpen: true,
      isOptionSelected: true,
      handleToggle: mockHandleToggle,
      selectedLabel: ExpertiseArea.CultureAndArt,
      ariaId: DropdownAriaId.EXPERTISE_AREA,
    };

    renderDropdownTrigger(props);

    const buttonClass = getDropdownTriggerStyles(true, true);
    const labelClass = getDropdownLabelStyles(true);
    const iconClass = getDropdownIconStyles(true, true);

    const button = screen.getByRole('button');
    const label = screen.getByText(ExpertiseArea.CultureAndArt);
    const icon = screen.getByRole('img');

    expect(button).toHaveClass(buttonClass);
    expect(label).toHaveClass(labelClass);
    expect(icon).toHaveClass(iconClass);
  });

  it('should call handleToggle when button is clicked', () => {
    const props = {
      isOpen: false,
      isOptionSelected: false,
      handleToggle: mockHandleToggle,
      selectedLabel: ExpertiseArea.Education,
      ariaId: DropdownAriaId.EXPERTISE_AREA,
    };

    renderDropdownTrigger(props);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockHandleToggle).toHaveBeenCalled();
  });
});
