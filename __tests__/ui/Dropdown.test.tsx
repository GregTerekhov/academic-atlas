import { fireEvent, render, screen } from '@testing-library/react';

import { DropdownAriaId, ExpertiseArea, IOption } from 'types';
import { useDropdown } from 'hooks';

import Dropdown from 'ui/dropdown';
import { getDropdownBoxStyles, getDropdownOptionsListStyles } from 'styles';

jest.mock('hooks', () => ({
  useDropdown: jest.fn(),
}));

jest.mock('ui/subcomponents', () => ({
  DropdownTrigger: jest.fn(({ label, handleToggle, isOpen, ariaId }) => (
    <button
      data-testid='dropdown-trigger'
      onClick={handleToggle}
      aria-haspopup='listbox'
      aria-expanded={isOpen}
      aria-controls={`${ariaId}-list`}
    >
      {label}
    </button>
  )),
}));

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children, items, className }) => (
    <ul
      data-testid='mapped-list'
      className={className}
    >
      {items.map((option: IOption) => children(option))}
    </ul>
  )),
}));

describe('DropdownUI Component', () => {
  const mockOnOptionSelect = jest.fn();
  const mockToggleDropdown = jest.fn();

  const mockOptions: IOption[] = [
    { typeId: '1', option: ExpertiseArea.Education },
    { typeId: '2', option: ExpertiseArea.CultureAndArt },
    { typeId: '3', option: ExpertiseArea.Humanities },
    { typeId: '4', option: ExpertiseArea.Theology },
  ];

  const mockDropdownRef = { current: document.createElement('div') };

  const mockUseDropdown = (overrides = {}) => {
    (useDropdown as jest.Mock).mockReturnValue({
      isDropdownOpen: false,
      dropdownRef: mockDropdownRef,
      selectedLabel: ExpertiseArea.Default,
      isOptionSelected: false,
      toggleDropdown: mockToggleDropdown,
      handleOptionClick: mockOnOptionSelect,
      resetSelectedLabel: jest.fn(),
      ...overrides,
    });
  };

  const renderDropdown = (overrides = {}) => {
    return render(
      <Dropdown
        label={ExpertiseArea.Default}
        options={mockOptions}
        onOptionSelect={mockOnOptionSelect}
        ariaId={DropdownAriaId.EXPERTISE_AREA}
        {...overrides}
      />,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();

    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  it('should render elements correctly', () => {
    mockUseDropdown();
    renderDropdown();

    expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('should open dropdown when button is clicked', () => {
    mockUseDropdown();
    renderDropdown();

    const button = screen.getByTestId('dropdown-trigger');
    fireEvent.click(button);

    expect(mockToggleDropdown).toHaveBeenCalled();
  });

  it('should render content and use correct styles when dropdown is open', () => {
    mockUseDropdown({ isDropdownOpen: true });
    renderDropdown();

    const wrapperClass = getDropdownBoxStyles();
    const listClass = getDropdownOptionsListStyles();

    const wrapperList = screen.queryByRole('listbox');
    const listElement = screen.getByTestId('mapped-list');

    expect(wrapperList).toBeInTheDocument();
    expect(listElement).toBeInTheDocument();
    expect(wrapperList).toHaveClass(wrapperClass);
    expect(listElement).toHaveClass(listClass);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockOptions.length);
  });

  it('should call onOptionSelect when an option is clicked', () => {
    mockUseDropdown({ isDropdownOpen: true });
    renderDropdown();

    const option = screen.getByText(ExpertiseArea.Humanities);
    fireEvent.click(option);

    expect(mockOnOptionSelect).toHaveBeenCalledWith(ExpertiseArea.Humanities);
  });

  it('should set aria-selected correctly on selected option', () => {
    mockUseDropdown({
      isDropdownOpen: true,
      selectedLabel: ExpertiseArea.Humanities,
      isOptionSelected: true,
    });

    renderDropdown();

    const selectedOption = screen.getByText(ExpertiseArea.Humanities);
    expect(selectedOption).toHaveAttribute('aria-selected', 'true');
  });

  it('should set aria-labelledby correctly on listbox', () => {
    mockUseDropdown({ isDropdownOpen: true });
    renderDropdown();

    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveAttribute('aria-labelledby', `${DropdownAriaId.EXPERTISE_AREA}-trigger`);
  });

  it('should handle empty options list', () => {
    mockUseDropdown({ isDropdownOpen: true });
    renderDropdown({ options: [] });

    expect(screen.queryByRole('listbox')).toBeInTheDocument();
    expect(screen.queryByTestId('mapped-list')).toBeEmptyDOMElement();
  });
});
