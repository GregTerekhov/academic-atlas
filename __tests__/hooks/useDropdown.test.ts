import { renderHook } from '@testing-library/react';
import { act } from 'react';

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    mockUseMenu.mockReturnValue({
      isCalcMenuOpen: false,
      isNavMenuOpen: false,
    });
    mockUsePopup.mockReturnValue({
      isPopupOpen: jest.fn().mockReturnValue(false),
    });

    const { result } = renderHook(() =>
      useDropdown({ label: WorkType.Default, onOptionSelect: mockOnOptionSelect }),
    );

    expect(result.current.selectedLabel).toBe(WorkType.Default);
    expect(result.current.isOptionSelected).toBe(false);
    expect(result.current.isDropdownOpen).toBe(false);
  });

  it('should handle option click', () => {
    mockUseMenu.mockReturnValue({
      isCalcMenuOpen: false,
      isNavMenuOpen: false,
    });
    mockUsePopup.mockReturnValue({
      isPopupOpen: jest.fn().mockReturnValue(false),
    });

    const { result } = renderHook(() =>
      useDropdown({ label: WorkType.Default, onOptionSelect: mockOnOptionSelect }),
    );

    act(() => {
      result.current.handleOptionClick(WorkType.Diplomas);
    });

    expect(result.current.selectedLabel).toBe(WorkType.Diplomas);
    expect(result.current.isOptionSelected).toBe(true);
    expect(mockOnOptionSelect).toHaveBeenCalledWith(WorkType.Diplomas);
    expect(result.current.isDropdownOpen).toBe(false);
  });

  it('should toggle dropdown', () => {
    mockUseMenu.mockReturnValue({
      isCalcMenuOpen: false,
      isNavMenuOpen: false,
    });
    mockUsePopup.mockReturnValue({
      isPopupOpen: jest.fn().mockReturnValue(false),
    });

    const { result } = renderHook(() =>
      useDropdown({ label: WorkType.Default, onOptionSelect: mockOnOptionSelect }),
    );

    act(() => {
      result.current.toggleDropdown();
    });

    expect(result.current.isDropdownOpen).toBe(true);

    act(() => {
      result.current.toggleDropdown();
    });

    expect(result.current.isDropdownOpen).toBe(false);
  });

  it('should reset selected label when overlay opens', () => {
    mockUseMenu.mockReturnValue({
      isCalcMenuOpen: true,
      isNavMenuOpen: false,
    });
    mockUsePopup.mockReturnValue({
      isPopupOpen: jest.fn().mockReturnValue(false),
    });

    const { result } = renderHook(() =>
      useDropdown({ label: WorkType.Default, onOptionSelect: mockOnOptionSelect }),
    );

    act(() => {
      result.current.handleOptionClick(WorkType.Default);
    });

    expect(result.current.selectedLabel).toBe(WorkType.Default);

    mockUseMenu.mockReturnValue({
      isCalcMenuOpen: false,
      isNavMenuOpen: false,
    });

    act(() => {
      result.current.toggleDropdown();
    });

    expect(result.current.selectedLabel).toBe(WorkType.Default);
    expect(result.current.isOptionSelected).toBe(false);
  });
});
