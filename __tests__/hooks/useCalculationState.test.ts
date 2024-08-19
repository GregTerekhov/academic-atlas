import { act, renderHook } from '@testing-library/react';

import { ExecutionTime, ExpertiseArea, Uniqueness, WorkType } from 'types';
import { useCalculationState } from 'hooks';

describe('useCalculationState hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialise with default values', () => {
    const { result } = renderHook(() => useCalculationState());

    expect(result.current.calculationData).toEqual({
      workType: WorkType.Default,
      expertiseArea: ExpertiseArea.Default,
      executionTime: ExecutionTime.Default,
      uniqueness: Uniqueness.Zero,
      theme: '',
    });
  });

  it('should update calculation data when handleOptionChange is called', () => {
    const { result } = renderHook(() => useCalculationState());

    act(() => {
      result.current.handleOptionChange('workType', WorkType.BachelorTheses);
    });

    expect(result.current.calculationData.workType).toBe(WorkType.BachelorTheses);

    act(() => {
      result.current.handleOptionChange('expertiseArea', ExpertiseArea.FormalSciences);
    });

    expect(result.current.calculationData.expertiseArea).toBe(ExpertiseArea.FormalSciences);

    act(() => {
      result.current.handleOptionChange('executionTime', ExecutionTime.MediumTerm);
    });

    expect(result.current.calculationData.executionTime).toBe(ExecutionTime.MediumTerm);
  });

  it('should update theme when handleThemeChange is called', () => {
    const { result } = renderHook(() => useCalculationState());

    act(() => {
      result.current.handleThemeChange('Концепт "чистого кода" та проблеми його застосування');
    });

    expect(result.current.calculationData.theme).toBe(
      'Концепт "чистого кода" та проблеми його застосування',
    );
  });

  it('should update uniqueness when handleRangeChange is called', () => {
    const { result } = renderHook(() => useCalculationState());

    act(() => {
      result.current.handleRangeChange(90);
    });

    expect(result.current.calculationData.uniqueness).toBe(90);
  });

  it('should reset calculation data to default when resetCalculation is called', () => {
    const { result } = renderHook(() => useCalculationState());

    act(() => {
      result.current.handleOptionChange('workType', WorkType.MasterTheses);
      result.current.handleOptionChange('expertiseArea', ExpertiseArea.IT);
      result.current.handleOptionChange('executionTime', ExecutionTime.Urgent);
      result.current.handleThemeChange(
        'Концепт "чистого кода" та проблеми його застосування у середовищі молодших спеціалістів',
      );
      result.current.handleRangeChange(100);
    });

    act(() => {
      result.current.resetCalculation();
    });

    expect(result.current.calculationData).toEqual({
      workType: WorkType.Default,
      expertiseArea: ExpertiseArea.Default,
      executionTime: ExecutionTime.Default,
      uniqueness: Uniqueness.Zero,
      theme: '',
    });
  });
});
