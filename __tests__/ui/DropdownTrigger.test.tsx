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

  const testCases = [
    {
      description: 'renders button with correct styles and attributes',
      props: {
        isOpen: false,
        isOptionSelected: false,
        handleToggle: mockHandleToggle,
        selectedLabel: ExpertiseArea.Education,
        ariaId: DropdownAriaId.EXPERTISE_AREA,
      },
      expected: {
        buttonClass: getDropdownTriggerStyles(false, false),
        labelClass: getDropdownLabelStyles(false),
        iconClass: getDropdownIconStyles(false, false),
        ariaExpanded: 'false',
      },
    },
    {
      description: 'applies correct styles when dropdown is open and option is selected',
      props: {
        isOpen: true,
        isOptionSelected: true,
        handleToggle: mockHandleToggle,
        selectedLabel: ExpertiseArea.CultureAndArt,
        ariaId: DropdownAriaId.EXPERTISE_AREA,
      },
      expected: {
        buttonClass: getDropdownTriggerStyles(true, true),
        labelClass: getDropdownLabelStyles(true),
        iconClass: getDropdownIconStyles(true, true),
        ariaExpanded: 'true',
      },
    },
  ];

  it.each(testCases)('$description', ({ props, expected }) => {
    renderDropdownTrigger(props);

    const button = screen.getByRole('button');
    const label = screen.getByText(props.selectedLabel);
    const icon = screen.getByRole('img');

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(expected.buttonClass);
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    expect(button).toHaveAttribute('aria-expanded', expected.ariaExpanded);
    expect(button).toHaveAttribute('aria-controls', `${props.ariaId}-list`);

    expect(label).toBeInTheDocument();
    expect(label).toHaveClass(expected.labelClass);

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass(expected.iconClass);
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
