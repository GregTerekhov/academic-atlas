import { renderHook } from '@testing-library/react';

import { ExecutionTime, ExpertiseArea, ICalculationData, Uniqueness, WorkType } from 'types';
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
  interface ICalculation extends ICalculationData {
    uniqueness?: number;
    theme?: string;
  }
  const mockUseCalculation = useCalculation as jest.Mock;
  const mockCheckCalculationField = checkCalculationField as jest.Mock;
  const mockFindSelectedObject = findSelectedObject as jest.Mock;

  const defaultData: ICalculation = {
    workType: WorkType.Default,
    expertiseArea: ExpertiseArea.Default,
    executionTime: ExecutionTime.Default,
  };

  const incompleteData: ICalculation = {
    workType: WorkType.BachelorTheses,
    expertiseArea: ExpertiseArea.Default,
    executionTime: ExecutionTime.Default,
  };

  const incompleteDataWithOnlyExecutionTime: ICalculation = {
    workType: WorkType.Default,
    expertiseArea: ExpertiseArea.Default,
    executionTime: ExecutionTime.MediumTerm,
  };

  const validDataWithUniqueness: ICalculation = {
    workType: WorkType.Abstracts,
    expertiseArea: ExpertiseArea.CivilSecurity,
    executionTime: ExecutionTime.LongTerm,
  };

  const validDataWithoutUniqueness: ICalculation = {
    workType: WorkType.CaseStudyReports,
    expertiseArea: ExpertiseArea.ArchitectureAndConstruction,
    executionTime: ExecutionTime.LongTerm,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the button to unavailable by default', () => {
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Default,
      },
      isChecked: false,
    });
    mockCheckCalculationField.mockReturnValue(false);
    mockFindSelectedObject.mockReturnValue(undefined);

    const { result } = renderHook(() => useButtonDisabled());

    expect(mockCheckCalculationField).toHaveBeenCalledWith(defaultData);
    expect(mockFindSelectedObject).toHaveBeenCalledWith(WorkType.Default);
    expect(result.current.isButtonDisabled).toBe(true);
  });

  it('returns the button unavailable when findSelectedObject returns object, even if checkCalculationField returns true', () => {
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.BachelorTheses,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Default,
      },
      isChecked: false,
    });
    mockCheckCalculationField.mockReturnValue(true);
    mockFindSelectedObject.mockReturnValue({ uniquenessPercentage: Uniqueness.Standard });

    const { result } = renderHook(() => useButtonDisabled());

    expect(mockCheckCalculationField).toHaveBeenCalledWith(incompleteData);
    expect(mockFindSelectedObject).toHaveBeenCalledWith(WorkType.BachelorTheses);
    expect(result.current.isButtonDisabled).toBe(true);
  });

  it('returns the button unavailable when findSelectedObject returns selected object, but checkCalculationField returns false', () => {
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.MediumTerm,
      },
      isChecked: false,
    });
    mockCheckCalculationField.mockReturnValue(false);
    mockFindSelectedObject.mockReturnValue({ uniquenessPercentage: Uniqueness.Zero });

    const { result } = renderHook(() => useButtonDisabled());

    expect(mockCheckCalculationField).toHaveBeenCalledWith(incompleteDataWithOnlyExecutionTime);
    expect(mockFindSelectedObject).toHaveBeenCalledWith(WorkType.Default);
    expect(result.current.isButtonDisabled).toBe(true);
  });

  it('returns the button unavailable when checkCalculationField returns true, object contains uniqueness key, but isChecked is false', () => {
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.Abstracts,
        expertiseArea: ExpertiseArea.CivilSecurity,
        executionTime: ExecutionTime.LongTerm,
      },
      isChecked: false,
    });
    mockCheckCalculationField.mockReturnValue(true);
    mockFindSelectedObject.mockReturnValue({ uniquenessPercentage: Uniqueness.Highest });

    const { result } = renderHook(() => useButtonDisabled());

    expect(mockCheckCalculationField).toHaveBeenCalledWith(validDataWithUniqueness);
    expect(mockFindSelectedObject).toHaveBeenCalledWith(WorkType.Abstracts);
    expect(result.current.isButtonDisabled).toBe(true);
  });

  it('returns the button available when checkCalculationField returns true and object contains uniqueness key is equal zero', () => {
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.CaseStudyReports,
        expertiseArea: ExpertiseArea.ArchitectureAndConstruction,
        executionTime: ExecutionTime.LongTerm,
      },
      isChecked: false,
    });
    mockCheckCalculationField.mockReturnValue(true);
    mockFindSelectedObject.mockReturnValue({ uniquenessPercentage: Uniqueness.Zero });

    const { result } = renderHook(() => useButtonDisabled());

    expect(mockCheckCalculationField).toHaveBeenCalledWith(validDataWithoutUniqueness);
    expect(mockFindSelectedObject).toHaveBeenCalledWith(WorkType.CaseStudyReports);
    expect(result.current.isButtonDisabled).toBe(false);
  });

  it('returns the button available when checkCalculationField returns true, object contains uniqueness key, and isChecked is true', () => {
    mockUseCalculation.mockReturnValue({
      calculationData: {
        workType: WorkType.Abstracts,
        expertiseArea: ExpertiseArea.CivilSecurity,
        executionTime: ExecutionTime.LongTerm,
      },
      isChecked: true,
    });
    mockCheckCalculationField.mockReturnValue(true);
    mockFindSelectedObject.mockReturnValue({ uniquenessPercentage: Uniqueness.Highest });

    const { result } = renderHook(() => useButtonDisabled());

    expect(mockCheckCalculationField).toHaveBeenCalledWith(validDataWithUniqueness);
    expect(mockFindSelectedObject).toHaveBeenCalledWith(WorkType.Abstracts);
    expect(result.current.isButtonDisabled).toBe(false);
  });
});
