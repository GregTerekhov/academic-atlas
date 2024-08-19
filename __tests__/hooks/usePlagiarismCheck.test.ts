import { renderHook } from '@testing-library/react';

import { ExecutionTime, ExpertiseArea, type ICalculationData, WorkType } from 'types';
import { checkCalculationField, checkValidWorkType } from 'helpers';
import { usePlagiarismCheck } from 'hooks';

jest.mock('helpers', () => ({
  checkCalculationField: jest.fn(),
  checkValidWorkType: jest.fn(),
}));

describe('usePlagiarismCheck hook', () => {
  const mockCheckCalculationField = checkCalculationField as jest.Mock;
  const mockCheckValidWorkType = checkValidWorkType as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return default value is equal false', () => {
    const mockData: ICalculationData = {
      workType: WorkType.Default,
      expertiseArea: ExpertiseArea.Default,
      executionTime: ExecutionTime.Default,
    };

    mockCheckCalculationField.mockReturnValue(false);
    mockCheckValidWorkType.mockReturnValue(false);

    const { result } = renderHook(() => usePlagiarismCheck(mockData));

    expect(mockCheckCalculationField).toHaveBeenCalledWith(mockData);
    expect(mockCheckValidWorkType).toHaveBeenCalledWith(WorkType.Default);
    expect(result.current.shouldPlagiarismCheck).toBe(false);
  });

  it('should return false when calculation data is not necessary to plagiarism checking', () => {
    const mockData: ICalculationData = {
      workType: WorkType.PracticalWorks,
      expertiseArea: ExpertiseArea.Education,
      executionTime: ExecutionTime.Urgent,
    };

    mockCheckCalculationField.mockReturnValue(true);
    mockCheckValidWorkType.mockReturnValue(false);

    const { result } = renderHook(() => usePlagiarismCheck(mockData));

    expect(mockCheckCalculationField).toHaveBeenCalledWith(mockData);
    expect(mockCheckValidWorkType).toHaveBeenCalledWith(WorkType.PracticalWorks);
    expect(result.current.shouldPlagiarismCheck).toBe(false);
  });

  it('should return false when calculation data is incomplete', () => {
    const mockData: ICalculationData = {
      workType: WorkType.MasterTheses,
      expertiseArea: ExpertiseArea.Default,
      executionTime: ExecutionTime.Urgent,
    };

    mockCheckCalculationField.mockReturnValue(false);
    mockCheckValidWorkType.mockReturnValue(true);

    const { result } = renderHook(() => usePlagiarismCheck(mockData));

    expect(mockCheckCalculationField).toHaveBeenCalledWith(mockData);
    expect(mockCheckValidWorkType).toHaveBeenCalledWith(WorkType.MasterTheses);
    expect(result.current.shouldPlagiarismCheck).toBe(false);
  });

  it('should return true when calculation data is valid and work type is valid', () => {
    const mockData: ICalculationData = {
      workType: WorkType.MasterTheses,
      expertiseArea: ExpertiseArea.SocialSciences,
      executionTime: ExecutionTime.Urgent,
    };

    mockCheckCalculationField.mockReturnValue(true);
    mockCheckValidWorkType.mockReturnValue(true);

    const { result } = renderHook(() => usePlagiarismCheck(mockData));

    expect(mockCheckCalculationField).toHaveBeenCalledWith(mockData);
    expect(mockCheckValidWorkType).toHaveBeenCalledWith(WorkType.MasterTheses);
    expect(result.current.shouldPlagiarismCheck).toBe(true);
  });
});
