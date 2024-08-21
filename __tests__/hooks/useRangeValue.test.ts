import { renderHook } from '@testing-library/react';

import { ExecutionTime, ExpertiseArea, Uniqueness, WorkType } from 'types';
import { useCalculation } from 'context';
import { findSelectedObject } from 'helpers';
import { useRangeValue } from 'hooks';

jest.mock('helpers', () => ({
  findSelectedObject: jest.fn(),
  uniquenessMapping: {
    [Uniqueness.TeamPapers]: Uniqueness.TeamPapers,
    [Uniqueness.Standard]: Uniqueness.Standard,
    [Uniqueness.Higher]: Uniqueness.Higher,
    [Uniqueness.Highest]: Uniqueness.Highest,
  },
}));

jest.mock('context', () => ({
  useCalculation: jest.fn(),
}));

describe('useRangeValue hook', () => {
  const mockFindSelectedObject = findSelectedObject as jest.Mock;
  const mockUseCalculation = useCalculation as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialise with default value when isChecked is false', () => {
    const mockHandleRangeValueChange = jest.fn();
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Default,
      },
      handleRangeValueChange: mockHandleRangeValueChange,
      isChecked: false,
    });
    mockFindSelectedObject.mockReturnValue(undefined);

    renderHook(() => useRangeValue());

    expect(mockHandleRangeValueChange).not.toHaveBeenCalled();
  });

  it('should set rangeValue based on workType and uniquenessPercentage when isChecked is true', () => {
    const mockHandleRangeValueChange = jest.fn();
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.TeamPapers,
        expertiseArea: ExpertiseArea.Education,
        executionTime: ExecutionTime.LongTerm,
      },
      handleRangeValueChange: mockHandleRangeValueChange,
      isChecked: true,
    });

    mockFindSelectedObject.mockReturnValue({
      option: WorkType.TeamPapers,
      uniquenessPercentage: Uniqueness.TeamPapers,
    });

    renderHook(() => useRangeValue());

    expect(mockHandleRangeValueChange).toHaveBeenCalledWith(Uniqueness.TeamPapers);
  });

  it('should use default value when uniquenessPercentage is not in uniquenessMapping', () => {
    const mockHandleRangeValueChange = jest.fn();
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.Presentations,
        expertiseArea: ExpertiseArea.AgriculturalSciences,
        executionTime: ExecutionTime.LongTerm,
      },
      handleRangeValueChange: mockHandleRangeValueChange,
      isChecked: true,
    });

    mockFindSelectedObject.mockReturnValue({
      option: WorkType.Presentations,
      uniquenessPercentage: Uniqueness.Zero,
    });

    renderHook(() => useRangeValue());

    expect(mockHandleRangeValueChange).toHaveBeenCalledWith(Uniqueness.Zero);
  });

  it('should return zero when isChecked is false regardless of uniqueness value', () => {
    const mockHandleRangeValueChange = jest.fn();
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.MasterTheses,
        expertiseArea: ExpertiseArea.AgriculturalSciences,
        executionTime: ExecutionTime.LongTerm,
      },
      handleRangeValueChange: mockHandleRangeValueChange,
      isChecked: false,
    });

    mockFindSelectedObject.mockReturnValue({
      option: WorkType.MasterTheses,
      uniquenessPercentage: Uniqueness.Higher,
    });

    renderHook(() => useRangeValue());

    expect(mockHandleRangeValueChange).toHaveBeenCalledWith(Uniqueness.Zero);
  });

  it('should return zero when findSelectedObject returns undefined', () => {
    const mockHandleRangeValueChange = jest.fn();
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.AgriculturalSciences,
        executionTime: ExecutionTime.LongTerm,
      },
      handleRangeValueChange: mockHandleRangeValueChange,
      isChecked: false,
    });

    mockFindSelectedObject.mockReturnValue(undefined);

    renderHook(() => useRangeValue());

    expect(mockHandleRangeValueChange).not.toHaveBeenCalled();
  });

  it('should return zero when uniqueness is not found in uniquenessMapping', () => {
    //FIXME: unreal case. Probably, should fix the hooks logic. Line 19
    const mockHandleRangeValueChange = jest.fn();
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.Diplomas,
        expertiseArea: ExpertiseArea.Education,
        executionTime: ExecutionTime.LongTerm,
      },
      handleRangeValueChange: mockHandleRangeValueChange,
      isChecked: true,
    });

    mockFindSelectedObject.mockReturnValue({
      option: WorkType.Diplomas,
      uniquenessPercentage: 999 as Uniqueness,
    });

    renderHook(() => useRangeValue());

    expect(mockHandleRangeValueChange).toHaveBeenCalledWith(Uniqueness.Zero);
  });
});
