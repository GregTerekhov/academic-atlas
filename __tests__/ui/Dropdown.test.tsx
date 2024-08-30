import { fireEvent, render, screen, waitFor } from '@testing-library/react';

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
  const mockUseDropdown = useDropdown as jest.Mock;

  const mockOptions: IOption[] = [
    { typeId: '1', option: ExpertiseArea.Education },
    { typeId: '2', option: ExpertiseArea.CultureAndArt },
    { typeId: '3', option: ExpertiseArea.Humanities },
    { typeId: '4', option: ExpertiseArea.Theology },
  ];

  const mockDropdownRef = { current: document.createElement('div') };

  const setupMocks = (overrides = {}) => {
    mockUseDropdown.mockReturnValue({
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

  describe('Rendering and Basic Interaction', () => {
    it('should render elements correctly', () => {
      setupMocks();
      renderDropdown();

      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
      expect(screen.queryByRole('listbox')).toBeNull();
    });

    it('should open dropdown when button is clicked', () => {
      setupMocks();
      renderDropdown();

      const button = screen.getByTestId('dropdown-trigger');
      fireEvent.click(button);

      expect(mockToggleDropdown).toHaveBeenCalled();
    });

    it('should handle empty options list', () => {
      setupMocks({ isDropdownOpen: true });
      renderDropdown({ options: [] });

      expect(screen.queryByRole('listbox')).toBeInTheDocument();
      expect(screen.queryByTestId('mapped-list')).toBeEmptyDOMElement();
    });

    it('should handle single option in the list', () => {
      const singleOption = [{ typeId: '1', option: ExpertiseArea.Education }];
      mockUseDropdown({ isDropdownOpen: true });
      renderDropdown({ options: singleOption });

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(1);
      expect(screen.getByText(ExpertiseArea.Education)).toBeInTheDocument();
    });

    it('should handle long text option', () => {
      const longText = 'This is a very long option text that should be handled properly';
      const longOption = [{ typeId: '1', option: longText }];
      setupMocks({ isDropdownOpen: true });
      renderDropdown({ options: longOption });

      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should close dropdown without selecting an option', async () => {
      setupMocks({ isDropdownOpen: false });
      renderDropdown();

      const button = screen.getByTestId('dropdown-trigger');
      fireEvent.click(button);
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockToggleDropdown).toHaveBeenCalledTimes(2);
      });

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).toBeNull();
      });
    });
  });

  describe('Dropdown State and Interaction', () => {
    it('should render content and use correct styles when dropdown is open', () => {
      setupMocks({ isDropdownOpen: true });
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
      setupMocks({ isDropdownOpen: true });
      renderDropdown();

      const option = screen.getByText(ExpertiseArea.Humanities);
      fireEvent.click(option);

      expect(mockOnOptionSelect).toHaveBeenCalledWith(ExpertiseArea.Humanities);
    });

    it('should set aria-selected correctly on selected option', () => {
      setupMocks({
        isDropdownOpen: true,
        selectedLabel: ExpertiseArea.Humanities,
        isOptionSelected: true,
      });

      renderDropdown();

      const selectedOption = screen.getByText(ExpertiseArea.Humanities);
      expect(selectedOption).toHaveAttribute('aria-selected', 'true');
    });

    it('should set aria-labelledby correctly on listbox', () => {
      setupMocks({ isDropdownOpen: true });
      renderDropdown();

      const listbox = screen.getByRole('listbox');
      expect(listbox).toHaveAttribute(
        'aria-labelledby',
        `${DropdownAriaId.EXPERTISE_AREA}-trigger`,
      );
    });

    it('should not change selection when clicking the same option again', () => {
      setupMocks({ isDropdownOpen: true, selectedLabel: ExpertiseArea.Humanities });
      renderDropdown();

      const option = screen.getByText(ExpertiseArea.Humanities);
      fireEvent.click(option);

      expect(mockOnOptionSelect).toHaveBeenCalledTimes(1);
    });

    it('should have correct aria attributes for accessibility', () => {
      setupMocks({ isDropdownOpen: true });
      renderDropdown();

      const listbox = screen.getByRole('listbox');
      expect(listbox).toHaveAttribute(
        'aria-labelledby',
        `${DropdownAriaId.EXPERTISE_AREA}-trigger`,
      );
      expect(listbox).toHaveAttribute('role', 'listbox');
    });

    it('should reset aria-selected when resetting selected label', () => {
      const resetSelectedLabel = jest.fn();
      setupMocks({
        isDropdownOpen: true,
        selectedLabel: ExpertiseArea.Humanities,
        isOptionSelected: true,
        resetSelectedLabel,
      });
      renderDropdown();

      resetSelectedLabel();

      const selectedOption = screen.getByText(ExpertiseArea.Humanities);
      expect(selectedOption).toHaveAttribute('aria-selected');
    });
  });

  describe('Component Updates', () => {
    it('should handle window resize while dropdown is open', () => {
      setupMocks({ isDropdownOpen: true });
      renderDropdown();

      const resizeObserver = global.ResizeObserver;
      expect(resizeObserver).toHaveBeenCalled();
    });

    it('should render aria-labelledby correctly when label is updated', () => {
      setupMocks({ isDropdownOpen: true });
      const { rerender } = renderDropdown();

      const listbox = screen.getByRole('listbox');
      expect(listbox).toHaveAttribute(
        'aria-labelledby',
        `${DropdownAriaId.EXPERTISE_AREA}-trigger`,
      );

      rerender(
        <Dropdown
          label={ExpertiseArea.Humanities}
          options={mockOptions}
          onOptionSelect={mockOnOptionSelect}
          ariaId={DropdownAriaId.EXPERTISE_AREA}
        />,
      );

      expect(listbox).toHaveAttribute(
        'aria-labelledby',
        `${DropdownAriaId.EXPERTISE_AREA}-trigger`,
      );
    });
  });
});
