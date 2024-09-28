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

  const testCases = [
    {
      description: 'should return default value is equal false',
      calculationData: {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Default,
        uniqueness: Uniqueness.Zero,
        theme: '',
      },
      checkFieldResult: false,
      checkWorkTypeResult: false,
      expectedResult: false,
    },
    {
      description:
        'should return false when calculation data is not necessary to plagiarism checking',
      calculationData: {
        workType: WorkType.PracticalWorks,
        expertiseArea: ExpertiseArea.Education,
        executionTime: ExecutionTime.Urgent,
        uniqueness: Uniqueness.Zero,
        theme: '',
      },
      checkFieldResult: true,
      checkWorkTypeResult: false,
      expectedResult: false,
    },
    {
      description: 'should return false when calculation data is incomplete',
      calculationData: {
        workType: WorkType.MasterTheses,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Urgent,
        uniqueness: Uniqueness.Zero,
        theme: '',
      },
      checkFieldResult: false,
      checkWorkTypeResult: true,
      expectedResult: false,
    },
    {
      description:
        'should return false when the theme is provided but necessary data for plagiarism check is incomplete',
      calculationData: {
        workType: WorkType.MasterTheses,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Urgent,
        uniqueness: Uniqueness.Zero,
        theme: 'Some Theme',
      },
      checkFieldResult: false,
      checkWorkTypeResult: true,
      expectedResult: false,
    },
    {
      description:
        'should return false when only the theme is provided without other necessary data',
      calculationData: {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Default,
        uniqueness: Uniqueness.Zero,
        theme: 'Some Theme',
      },
      checkFieldResult: false,
      checkWorkTypeResult: false,
      expectedResult: false,
    },
    {
      description: 'should return true when calculation data is valid and work type is valid',
      calculationData: {
        workType: WorkType.MasterTheses,
        expertiseArea: ExpertiseArea.SocialSciences,
        executionTime: ExecutionTime.Urgent,
        uniqueness: Uniqueness.Zero,
        theme: '',
      },
      checkFieldResult: true,
      checkWorkTypeResult: true,
      expectedResult: true,
    },
  ];

  it.each(testCases)(
    '$description',
    ({ calculationData, checkFieldResult, checkWorkTypeResult, expectedResult }) => {
      mockUseCalculation.mockReturnValue({ calculationData });
      mockCheckCalculationField.mockReturnValue(checkFieldResult);
      mockCheckValidWorkType.mockReturnValue(checkWorkTypeResult);

      const { result } = renderHook(() => usePlagiarismCheck());

      expect(mockCheckValidWorkType).toHaveBeenCalledWith(calculationData.workType);
      expect(mockCheckCalculationField).toHaveBeenCalledWith(calculationData);
      expect(result.current.shouldPlagiarismCheck).toBe(expectedResult);
    },
  );
});
