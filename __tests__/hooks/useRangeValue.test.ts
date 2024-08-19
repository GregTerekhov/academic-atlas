import { act, renderHook } from '@testing-library/react';

import { ExecutionTime, ExpertiseArea, ICalculationData, Uniqueness, WorkType } from 'types';
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

describe('useRangeValue hook', () => {
  const mockFindSelectedObject = findSelectedObject as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialise with default value when isChecked is false', () => {
    const calculationData: ICalculationData = {
      workType: WorkType.Default,
      expertiseArea: ExpertiseArea.Default,
      executionTime: ExecutionTime.Default,
    };
    mockFindSelectedObject.mockReturnValue(undefined);

    const { result } = renderHook(() => useRangeValue(calculationData, false));

    expect(result.current.rangeValue).toBe(Uniqueness.Zero);
  });

  it('should set rangeValue based on workType and uniquenessPercentage when isChecked is true', () => {
    const calculationData: ICalculationData = {
      workType: WorkType.TeamPapers,
      expertiseArea: ExpertiseArea.Education,
      executionTime: ExecutionTime.LongTerm,
    };
    mockFindSelectedObject.mockReturnValue({
      option: WorkType.TeamPapers,
      uniquenessPercentage: Uniqueness.TeamPapers,
    });

    const { result } = renderHook(() => useRangeValue(calculationData, true));

    expect(result.current.rangeValue).toBe(Uniqueness.TeamPapers);
  });

  it('should use default value when uniquenessPercentage is not in uniquenessMapping', () => {
    const calculationData: ICalculationData = {
      workType: WorkType.Presentations,
      expertiseArea: ExpertiseArea.AgriculturalSciences,
      executionTime: ExecutionTime.LongTerm,
    };
    mockFindSelectedObject.mockReturnValue({
      option: WorkType.Presentations,
      uniquenessPercentage: Uniqueness.Zero,
    });

    const { result } = renderHook(() => useRangeValue(calculationData, true));

    expect(result.current.rangeValue).toBe(Uniqueness.Zero);
  });

  it('should return zero when isChecked is false regardless of uniqueness value', () => {
    const calculationData: ICalculationData = {
      workType: WorkType.MasterTheses,
      expertiseArea: ExpertiseArea.AgriculturalSciences,
      executionTime: ExecutionTime.LongTerm,
    };
    mockFindSelectedObject.mockReturnValue({
      option: WorkType.MasterTheses,
      uniquenessPercentage: Uniqueness.Higher,
    });

    const { result } = renderHook(() => useRangeValue(calculationData, false));

    expect(result.current.rangeValue).toBe(Uniqueness.Zero);
  });

  it('should return zero when findSelectedObject returns  undefined', () => {
    const calculationData: ICalculationData = {
      workType: WorkType.Default,
      expertiseArea: ExpertiseArea.AgriculturalSciences,
      executionTime: ExecutionTime.LongTerm,
    };
    mockFindSelectedObject.mockReturnValue(undefined);

    const { result } = renderHook(() => useRangeValue(calculationData, false));

    expect(result.current.rangeValue).toBe(Uniqueness.Zero);
  });

  it('should update rangeValue when updateRangeValue is called', () => {
    const calculationData: ICalculationData = {
      workType: WorkType.TeamPapers,
      expertiseArea: ExpertiseArea.Education,
      executionTime: ExecutionTime.LongTerm,
    };
    mockFindSelectedObject.mockReturnValue({
      option: WorkType.TeamPapers,
      uniquenessPercentage: Uniqueness.TeamPapers,
    });

    const { result } = renderHook(() => useRangeValue(calculationData, true));

    act(() => {
      result.current.updateRangeValue(70);
    });

    expect(result.current.rangeValue).toBe(70);
  });

  it('should reset rangeValue to zero with handleClearRangeValue is called', () => {
    const calculationData: ICalculationData = {
      workType: WorkType.Diplomas,
      expertiseArea: ExpertiseArea.Education,
      executionTime: ExecutionTime.LongTerm,
    };
    mockFindSelectedObject.mockReturnValue({
      option: WorkType.TeamPapers,
      uniquenessPercentage: Uniqueness.Standard,
    });

    const { result } = renderHook(() => useRangeValue(calculationData, true));

    act(() => {
      result.current.handleClearRangeValue();
    });

    expect(result.current.rangeValue).toBe(Uniqueness.Zero);
  });

  it('should return zero when uniqueness is not found in uniquenessMapping', () => {
    //FIXME: unreal case. Probably, should fix the hooks logic. Line 19
    const calculationData: ICalculationData = {
      workType: WorkType.Diplomas,
      expertiseArea: ExpertiseArea.Education,
      executionTime: ExecutionTime.LongTerm,
    };
    mockFindSelectedObject.mockReturnValue({
      option: WorkType.Diplomas,
      uniquenessPercentage: 999 as Uniqueness,
    });

    const { result } = renderHook(() => useRangeValue(calculationData, true));

    expect(result.current.rangeValue).toBe(Uniqueness.Zero);
  });
});
