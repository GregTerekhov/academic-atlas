import { act, renderHook } from '@testing-library/react';
import React from 'react';

import { ThemeVariants, WorkType } from 'types';
import { useCalculation, useTheme } from 'context';
import { couldChooseUniqueness, getMinimalUniqueness } from 'helpers';
import { useRangeSettings } from 'hooks';

jest.mock('context', () => ({
  useTheme: jest.fn(),
  useCalculation: jest.fn(),
}));

jest.mock('helpers', () => ({
  couldChooseUniqueness: jest.fn(),
  getMinimalUniqueness: jest.fn(),
}));

describe('useRangeSettings hook', () => {
  const mockUseTheme = useTheme as jest.Mock;
  const mockUseCalculation = useCalculation as jest.Mock;
  const mockCouldChooseUniqueness = couldChooseUniqueness as jest.Mock;
  const mockGetMinimalUniqueness = getMinimalUniqueness as jest.Mock;
  const mockHandleRangeValueChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialise with default values and isChecked is false', () => {
    mockUseTheme.mockReturnValue({ theme: ThemeVariants.LIGHT });
    mockUseCalculation.mockReturnValue({
      isChecked: false,
      calculationData: { workType: WorkType.Default },
      handleRangeValueChange: mockHandleRangeValueChange,
    });
    mockCouldChooseUniqueness.mockReturnValue(true);
    mockGetMinimalUniqueness.mockReturnValue(50);

    const { result } = renderHook(() => useRangeSettings());

    act(() => {
      result.current.updateThumbColor();
    });

    expect(document.documentElement.style.getPropertyValue('--thumb-color')).toBe(
      'var(--thumb-color-disabled)',
    );
    expect(result.current.rangeInputClass).toBe('range-input-light');
  });

  it('should initialise with default values and isChecked is true', () => {
    mockUseTheme.mockReturnValue({ theme: ThemeVariants.LIGHT });
    mockUseCalculation.mockReturnValue({
      isChecked: true,
      calculationData: { workType: WorkType.Diplomas },
      handleRangeValueChange: mockHandleRangeValueChange,
    });
    mockCouldChooseUniqueness.mockReturnValue(true);
    mockGetMinimalUniqueness.mockReturnValue(50);

    const { result } = renderHook(() => useRangeSettings());

    expect(result.current.showMinimalText).toBe(true);
    expect(result.current.rangeInputClass).toBe('range-input-light');
  });

  it('should update thumb colour based on theme and isChecked', () => {
    mockUseCalculation.mockReturnValue({
      isChecked: true,
      calculationData: { workType: WorkType.Default },
      handleRangeValueChange: mockHandleRangeValueChange,
    });

    const { result, rerender } = renderHook(() => useRangeSettings());

    act(() => {
      result.current.updateThumbColor();
    });

    expect(document.documentElement.style.getPropertyValue('--thumb-color')).toBe(
      'var(--thumb-color-light)',
    );

    mockUseTheme.mockReturnValue({ theme: ThemeVariants.DARK });

    rerender();

    act(() => {
      result.current.updateThumbColor();
    });

    expect(document.documentElement.style.getPropertyValue('--thumb-color')).toBe(
      'var(--thumb-color-dark)',
    );
  });

  it('should handle range input change', () => {
    mockUseCalculation.mockReturnValue({
      isChecked: true,
      calculationData: { workType: WorkType.Diplomas },
      handleRangeValueChange: mockHandleRangeValueChange,
    });

    const { result } = renderHook(() => useRangeSettings());

    act(() => {
      result.current.handleChange({
        target: { value: '10' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(mockHandleRangeValueChange).toHaveBeenCalledWith(10);
    expect(result.current.showMinimalText).toBe(true);
  });

  it('should return the correct range input class based on theme', () => {
    mockUseTheme.mockReturnValue({ theme: ThemeVariants.DARK });
    const { result } = renderHook(() => useRangeSettings());

    expect(result.current.rangeInputClass).toBe('range-input-dark');
  });
});
