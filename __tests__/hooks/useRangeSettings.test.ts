import { act, renderHook } from '@testing-library/react';
import React from 'react';

import { ThemeVariants, Uniqueness, WorkType } from 'types';
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

  const setup = ({
    theme = ThemeVariants.LIGHT,
    isChecked = false,
    workType = WorkType.Default,
    couldChoose = true,
    minimalUniqueness = Uniqueness.Standard,
  } = {}) => {
    mockUseTheme.mockReturnValue({ theme });
    mockUseCalculation.mockReturnValue({
      isChecked,
      calculationData: { workType },
      handleRangeValueChange: mockHandleRangeValueChange,
    });
    mockCouldChooseUniqueness.mockReturnValue(couldChoose);
    mockGetMinimalUniqueness.mockReturnValue(minimalUniqueness);

    return renderHook(() => useRangeSettings());
  };

  it('should initialise with default values and isChecked is false', () => {
    const { result } = setup({ workType: WorkType.BachelorTheses });

    act(() => {
      result.current.updateThumbColor();
    });

    expect(document.documentElement.style.getPropertyValue('--thumb-color')).toBe(
      'var(--thumb-color-disabled)',
    );
    expect(result.current.rangeInputClass).toBe('range-input-light');
  });

  it('should initialise with default values and isChecked is true', () => {
    const { result } = setup({ isChecked: true, workType: WorkType.Diplomas });

    expect(result.current.showMinimalText).toBe(true);
    expect(result.current.rangeInputClass).toBe('range-input-light');
  });

  it('should update thumb colour based on theme and isChecked', () => {
    const { result, rerender } = setup({
      isChecked: true,
      workType: WorkType.MasterTheses,
      minimalUniqueness: Uniqueness.Higher,
    });

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
    const { result } = setup({ isChecked: true, workType: WorkType.Diplomas });

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
