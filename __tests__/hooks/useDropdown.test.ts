import { renderHook } from '@testing-library/react';
import React, { act } from 'react';

import { WorkType } from 'types';
import { useMenu, usePopup } from 'context';
import { useDropdown } from 'hooks';

jest.mock('context', () => ({
  useMenu: jest.fn(),
  usePopup: jest.fn(),
}));

describe('useDropdown hook', () => {
  const mockOnOptionSelect = jest.fn();
  const mockUseMenu = useMenu as jest.Mock;
  const mockUsePopup = usePopup as jest.Mock;

  const setup = (menuState: boolean = false) => {
    mockUseMenu.mockReturnValue({
      isCalcMenuOpen: menuState,
      isNavMenuOpen: false,
    });
    mockUsePopup.mockReturnValue({
      isPopupOpen: jest.fn().mockReturnValue(false),
    });

    return renderHook(() =>
      useDropdown({ label: WorkType.Default, onOptionSelect: mockOnOptionSelect }),
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should initialize with default values', () => {
      const { result } = setup();

      expect(result.current.selectedLabel).toBe(WorkType.Default);
      expect(result.current.isOptionSelected).toBe(false);
      expect(result.current.isDropdownOpen).toBe(false);
    });
  });

  describe('Dropdown toggle', () => {
    it('should toggle dropdown on click', () => {
      const { result } = setup();

      act(() => {
        result.current.toggleDropdown({ type: 'click' } as React.MouseEvent);
      });

      expect(result.current.isDropdownOpen).toBe(true);

      act(() => {
        result.current.toggleDropdown({ type: 'click' } as React.MouseEvent);
      });

      expect(result.current.isDropdownOpen).toBe(false);
    });

    it.each([
      ['Enter', 'Enter'],
      ['Space', ' '],
    ])('should toggle dropdown on %s key press', (_, key) => {
      const { result } = setup();

      act(() => {
        result.current.toggleDropdown({ type: 'keydown', key } as React.KeyboardEvent);
      });

      expect(result.current.isDropdownOpen).toBe(true);

      act(() => {
        result.current.toggleDropdown({ type: 'keydown', key } as React.KeyboardEvent);
      });

      expect(result.current.isDropdownOpen).toBe(false);
    });
  });

  describe('Option Selection', () => {
    it('should handle option click', () => {
      const { result } = setup();

      act(() => {
        result.current.handleOptionClick(WorkType.Diplomas);
      });

      expect(result.current.selectedLabel).toBe(WorkType.Diplomas);
      expect(result.current.isOptionSelected).toBe(true);
      expect(mockOnOptionSelect).toHaveBeenCalledWith(WorkType.Diplomas);
      expect(result.current.isDropdownOpen).toBe(false);
    });

    it('should not call onOptionSelect when the default option is clicked', () => {
      const { result } = setup();

      act(() => {
        result.current.handleOptionClick(WorkType.Default);
      });

      expect(mockOnOptionSelect).not.toHaveBeenCalled();
      expect(result.current.selectedLabel).toBe(WorkType.Default);
      expect(result.current.isOptionSelected).toBe(false);
      expect(result.current.isDropdownOpen).toBe(false);
    });

    it('should not call onOptionSelect, not change selectedLabel, and not close dropdown when the same option is clicked again', () => {
      const { result } = setup();

      act(() => {
        result.current.handleOptionClick(WorkType.Diplomas);
      });

      expect(result.current.selectedLabel).toBe(WorkType.Diplomas);
      expect(result.current.isOptionSelected).toBe(true);
      expect(mockOnOptionSelect).toHaveBeenCalledWith(WorkType.Diplomas);
      expect(result.current.isDropdownOpen).toBe(false);

      act(() => {
        result.current.handleOptionClick(WorkType.Diplomas);
      });

      expect(mockOnOptionSelect).toHaveBeenCalledTimes(1);
      expect(result.current.selectedLabel).toBe(WorkType.Diplomas);
      expect(result.current.isOptionSelected).toBe(true);
      expect(result.current.isDropdownOpen).toBe(false);
    });
  });

  describe('Label reset', () => {
    it('should reset selected label when overlay opens', () => {
      const { result } = setup(true);

      act(() => {
        result.current.handleOptionClick(WorkType.Diplomas);
      });

      expect(result.current.selectedLabel).toBe(WorkType.Diplomas);
      expect(result.current.isOptionSelected).toBe(true);

      mockUseMenu.mockReturnValue({
        isCalcMenuOpen: false,
        isNavMenuOpen: false,
      });

      act(() => {
        result.current.toggleDropdown({ type: 'click' } as React.MouseEvent);
      });

      expect(result.current.selectedLabel).toBe(WorkType.Default);
      expect(result.current.isOptionSelected).toBe(false);
    });

    it('should reset selected label when initial label changes', () => {
      mockUseMenu.mockReturnValue({
        isCalcMenuOpen: false,
        isNavMenuOpen: false,
      });
      mockUsePopup.mockReturnValue({
        isPopupOpen: jest.fn().mockReturnValue(false),
      });

      const { result, rerender } = renderHook(
        ({ label }) => useDropdown({ label, onOptionSelect: mockOnOptionSelect }),
        {
          initialProps: { label: WorkType.Default },
        },
      );

      expect(result.current.selectedLabel).toBe(WorkType.Default);

      rerender({ label: WorkType.Diplomas });

      expect(result.current.selectedLabel).toBe(WorkType.Diplomas);
      expect(result.current.isOptionSelected).toBe(false);
    });
  });
});
