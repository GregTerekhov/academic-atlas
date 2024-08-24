import { renderHook } from '@testing-library/react';

import { ExecutionTime, ExpertiseArea, Uniqueness, WorkType } from 'types';
import { useCalculation } from 'context';
import { findSelectedObject } from 'helpers';
import { useAutoSetRange } from 'hooks';

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

describe('useAutoSetRange hook', () => {
  const mockFindSelectedObject = findSelectedObject as jest.Mock;
  const mockUseCalculation = useCalculation as jest.Mock;
  const mockHandleRangeValueChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testCases = [
    {
      description: 'should initialise with default value when isChecked is false',
      isChecked: false,
      calculationData: {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Default,
      },
      findSelectedObjectReturn: undefined,
      expectedCall: undefined,
    },
    {
      description:
        'should set rangeValue based on workType and uniquenessPercentage when isChecked is true',
      isChecked: true,
      calculationData: {
        workType: WorkType.TeamPapers,
        expertiseArea: ExpertiseArea.Education,
        executionTime: ExecutionTime.LongTerm,
      },
      findSelectedObjectReturn: {
        option: WorkType.TeamPapers,
        uniquenessPercentage: Uniqueness.TeamPapers,
      },
      expectedCall: Uniqueness.TeamPapers,
    },
    {
      description: 'should use default value when uniquenessPercentage is not in uniquenessMapping',
      isChecked: true,
      calculationData: {
        workType: WorkType.Presentations,
        expertiseArea: ExpertiseArea.AgriculturalSciences,
        executionTime: ExecutionTime.LongTerm,
      },
      findSelectedObjectReturn: {
        option: WorkType.Presentations,
        uniquenessPercentage: Uniqueness.Zero,
      },
      expectedCall: Uniqueness.Zero,
    },
    {
      description: 'should return zero when isChecked is false regardless of uniqueness value',
      isChecked: false,
      calculationData: {
        workType: WorkType.MasterTheses,
        expertiseArea: ExpertiseArea.AgriculturalSciences,
        executionTime: ExecutionTime.LongTerm,
      },
      findSelectedObjectReturn: {
        option: WorkType.MasterTheses,
        uniquenessPercentage: Uniqueness.Higher,
      },
      expectedCall: Uniqueness.Zero,
    },
    {
      description: 'should return zero when findSelectedObject returns undefined',
      isChecked: false,
      calculationData: {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.AgriculturalSciences,
        executionTime: ExecutionTime.LongTerm,
      },
      findSelectedObjectReturn: undefined,
      expectedCall: undefined,
    },
    {
      description: 'should return zero when uniqueness is not found in uniquenessMapping',
      isChecked: true,
      calculationData: {
        workType: WorkType.Diplomas,
        expertiseArea: ExpertiseArea.Education,
        executionTime: ExecutionTime.LongTerm,
      },
      findSelectedObjectReturn: {
        option: WorkType.Diplomas,
        uniquenessPercentage: 999 as Uniqueness,
      },
      expectedCall: Uniqueness.Zero,
    },
  ];

  it.each(testCases)(
    '$description',
    ({ isChecked, calculationData, findSelectedObjectReturn, expectedCall }) => {
      mockUseCalculation.mockReturnValue({
        calculationData,
        handleRangeValueChange: mockHandleRangeValueChange,
        isChecked,
      });

      mockFindSelectedObject.mockReturnValue(findSelectedObjectReturn);

      renderHook(() => useAutoSetRange());

      if (expectedCall !== undefined) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(mockHandleRangeValueChange).toHaveBeenCalledWith(expectedCall);
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(mockHandleRangeValueChange).not.toHaveBeenCalled();
      }
    },
  );
});
