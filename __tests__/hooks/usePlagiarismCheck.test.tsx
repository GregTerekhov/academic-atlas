import { renderHook } from '@testing-library/react';

import { ExecutionTime, ExpertiseArea, Uniqueness, WorkType } from 'types';
import { checkCalculationField, checkValidWorkType } from 'helpers';
import { usePlagiarismCheck } from 'hooks';
import { useCalculation } from 'context';

jest.mock('helpers', () => ({
  checkCalculationField: jest.fn(),
  checkValidWorkType: jest.fn(),
}));

jest.mock('context', () => ({
  useCalculation: jest.fn(),
}));

describe('usePlagiarismCheck hook', () => {
  const mockCheckCalculationField = checkCalculationField as jest.Mock;
  const mockCheckValidWorkType = checkValidWorkType as jest.Mock;
  const mockUseCalculation = useCalculation as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return default value is equal false', () => {
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Default,
        uniqueness: Uniqueness.Zero,
        theme: '',
      },
    });

    mockCheckCalculationField.mockReturnValue(false);
    mockCheckValidWorkType.mockReturnValue(false);

    const { result } = renderHook(() => usePlagiarismCheck());

    expect(mockCheckValidWorkType).toHaveBeenCalledWith(WorkType.Default);
    expect(result.current.shouldPlagiarismCheck).toBe(false);
  });

  it('should return false when calculation data is not necessary to plagiarism checking', () => {
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.PracticalWorks,
        expertiseArea: ExpertiseArea.Education,
        executionTime: ExecutionTime.Urgent,
        uniqueness: Uniqueness.Zero,
        theme: '',
      },
    });

    mockCheckCalculationField.mockReturnValue(true);
    mockCheckValidWorkType.mockReturnValue(false);

    const { result } = renderHook(() => usePlagiarismCheck());

    expect(mockCheckValidWorkType).toHaveBeenCalledWith(WorkType.PracticalWorks);
    expect(result.current.shouldPlagiarismCheck).toBe(false);
  });

  it('should return false when calculation data is incomplete', () => {
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.MasterTheses,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Urgent,
        uniqueness: Uniqueness.Zero,
        theme: '',
      },
    });

    mockCheckCalculationField.mockReturnValue(false);
    mockCheckValidWorkType.mockReturnValue(true);

    const { result } = renderHook(() => usePlagiarismCheck());

    expect(mockCheckValidWorkType).toHaveBeenCalledWith(WorkType.MasterTheses);
    expect(result.current.shouldPlagiarismCheck).toBe(false);
  });

  it('should return true when calculation data is valid and work type is valid', () => {
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.MasterTheses,
        expertiseArea: ExpertiseArea.SocialSciences,
        executionTime: ExecutionTime.Urgent,
        uniqueness: Uniqueness.Zero,
        theme: '',
      },
    });

    mockCheckCalculationField.mockReturnValue(true);
    mockCheckValidWorkType.mockReturnValue(true);

    const { result } = renderHook(() => usePlagiarismCheck());

    expect(mockCheckValidWorkType).toHaveBeenCalledWith(WorkType.MasterTheses);
    expect(result.current.shouldPlagiarismCheck).toBe(true);
  });
});
