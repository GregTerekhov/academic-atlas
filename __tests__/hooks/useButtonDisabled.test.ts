import { renderHook } from '@testing-library/react';

import { ExecutionTime, ExpertiseArea, Uniqueness, WorkType } from 'types';
import { useCalculation } from 'context';
import { checkCalculationField, findSelectedObject } from 'helpers';
import { useButtonDisabled } from 'hooks';

jest.mock('helpers', () => ({
  checkCalculationField: jest.fn(),
  findSelectedObject: jest.fn(),
}));

jest.mock('context', () => ({
  useCalculation: jest.fn(),
}));

describe('useButtonDisabled hook', () => {
  const mockUseCalculation = useCalculation as jest.Mock;
  const mockCheckCalculationField = checkCalculationField as jest.Mock;
  const mockFindSelectedObject = findSelectedObject as jest.Mock;

  const testCases = [
    {
      description: 'returns the button to unavailable by default',
      data: {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Default,
      },
      isChecked: false,
      checkCalculationFieldReturn: undefined,
      findSelectedObjectReturn: false,
      expectedDisabled: true,
    },
    {
      description:
        'returns the button unavailable when findSelectedObject returns object, even if checkCalculationField returns true',
      data: {
        workType: WorkType.BachelorTheses,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Default,
      },
      isChecked: false,
      checkCalculationFieldReturn: true,
      findSelectedObjectReturn: { uniquenessPercentage: Uniqueness.Standard },
      expectedDisabled: true,
    },
    {
      description:
        'returns the button unavailable when findSelectedObject returns selected object, but checkCalculationField returns false',
      data: {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.MediumTerm,
      },
      isChecked: false,
      checkCalculationFieldReturn: false,
      findSelectedObjectReturn: { uniquenessPercentage: Uniqueness.Zero },
      expectedDisabled: true,
    },
    {
      description:
        'returns the button unavailable when checkCalculationField returns true, object contains uniqueness key, but isChecked is false',
      data: {
        workType: WorkType.Abstracts,
        expertiseArea: ExpertiseArea.CivilSecurity,
        executionTime: ExecutionTime.LongTerm,
      },
      isChecked: false,
      checkCalculationFieldReturn: true,
      findSelectedObjectReturn: { uniquenessPercentage: Uniqueness.Highest },
      expectedDisabled: true,
    },
    {
      description:
        'returns the button available when checkCalculationField returns true and object contains uniqueness key is equal zero',
      data: {
        workType: WorkType.CaseStudyReports,
        expertiseArea: ExpertiseArea.ArchitectureAndConstruction,
        executionTime: ExecutionTime.LongTerm,
      },
      isChecked: false,
      checkCalculationFieldReturn: true,
      findSelectedObjectReturn: { uniquenessPercentage: Uniqueness.Zero },
      expectedDisabled: false,
    },
    {
      description:
        'returns the button available when checkCalculationField returns true, object contains uniqueness key, and isChecked is true',
      data: {
        workType: WorkType.Abstracts,
        expertiseArea: ExpertiseArea.CivilSecurity,
        executionTime: ExecutionTime.LongTerm,
      },
      isChecked: true,
      checkCalculationFieldReturn: true,
      findSelectedObjectReturn: { uniquenessPercentage: Uniqueness.Highest },
      expectedDisabled: false,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each(testCases)(
    '$description',
    ({
      data,
      isChecked,
      checkCalculationFieldReturn,
      findSelectedObjectReturn,
      expectedDisabled,
    }) => {
      mockUseCalculation.mockReturnValue({
        calculationData: data,
        isChecked,
      });

      mockCheckCalculationField.mockReturnValue(checkCalculationFieldReturn);
      mockFindSelectedObject.mockReturnValue(findSelectedObjectReturn);

      const { result } = renderHook(() => useButtonDisabled());

      expect(mockCheckCalculationField).toHaveBeenCalledWith(data);
      expect(mockFindSelectedObject).toHaveBeenCalledWith(data.workType);
      expect(result.current.isButtonDisabled).toBe(expectedDisabled);
    },
  );
});
