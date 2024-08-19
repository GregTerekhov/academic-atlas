import { renderHook } from '@testing-library/react';

import { ExecutionTime, ExpertiseArea, DropdownAriaId, WorkType } from 'types';
import { useCalculation } from 'context';
import { getExecutionTime, getExpertiseArea, getWorkType } from 'data';
import { useDropdownList } from 'hooks';

jest.mock('context', () => ({
  useCalculation: jest.fn(),
}));

jest.mock('data', () => ({
  getWorkType: jest.fn(),
  getExpertiseArea: jest.fn(),
  getExecutionTime: jest.fn(),
}));

describe('useDropdownList hook', () => {
  const mockUseCalculation = useCalculation as jest.Mock;
  const mockGetWorkType = getWorkType as jest.Mock;
  const mockGetExpertiseArea = getExpertiseArea as jest.Mock;
  const mockGetExecutionTime = getExecutionTime as jest.Mock;
  const mockHandleOptionChange = jest.fn();

  const mockCalculationData = {
    workType: WorkType.Diplomas,
    expertiseArea: ExpertiseArea.IT,
    executionTime: ExecutionTime.Urgent,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCalculation.mockReturnValue({
      calculationData: mockCalculationData,
      handleOptionChange: mockHandleOptionChange,
    });

    mockGetWorkType.mockReturnValue([
      { typeId: 'teamWork1', option: WorkType.Diplomas },
      { typeId: 'teamWork2', option: WorkType.TeamPapers },
    ]);

    mockGetExpertiseArea.mockReturnValue([
      { typeId: 'area13', option: ExpertiseArea.IT },
      { typeId: 'area14', option: ExpertiseArea.MechanicalEngineering },
    ]);

    mockGetExecutionTime.mockReturnValue([
      { typeId: 'time3', option: ExecutionTime.Urgent },
      { typeId: 'time2', option: ExecutionTime.MediumTerm },
    ]);
  });

  it('returns the correct list of dropdowns', () => {
    const { result } = renderHook(() => useDropdownList());

    expect(result.current).toEqual([
      {
        id: 1,
        label: WorkType.Diplomas,
        options: [
          { typeId: 'teamWork1', option: WorkType.Diplomas },
          { typeId: 'teamWork2', option: WorkType.TeamPapers },
        ],
        onOptionSelect: expect.any(Function),
        ariaId: DropdownAriaId.WORK_TYPE,
      },
      {
        id: 2,
        label: ExpertiseArea.IT,
        options: [
          { typeId: 'area13', option: ExpertiseArea.IT },
          { typeId: 'area14', option: ExpertiseArea.MechanicalEngineering },
        ],
        onOptionSelect: expect.any(Function),
        ariaId: DropdownAriaId.EXPERTISE_AREA,
      },
      {
        id: 3,
        label: ExecutionTime.Urgent,
        options: [
          { typeId: 'time3', option: ExecutionTime.Urgent },
          { typeId: 'time2', option: ExecutionTime.MediumTerm },
        ],
        onOptionSelect: expect.any(Function),
        ariaId: DropdownAriaId.EXECUTION_TIME,
      },
    ]);
  });

  it('calls handleOptionChange with the correct parameters when the option is selected', () => {
    const { result } = renderHook(() => useDropdownList());

    result.current[0].onOptionSelect(WorkType.TeamPapers);
    expect(mockHandleOptionChange).toHaveBeenCalledWith('workType', WorkType.TeamPapers);

    result.current[1].onOptionSelect(ExpertiseArea.MechanicalEngineering);
    expect(mockHandleOptionChange).toHaveBeenCalledWith(
      'expertiseArea',
      ExpertiseArea.MechanicalEngineering,
    );

    result.current[2].onOptionSelect(ExecutionTime.MediumTerm);
    expect(mockHandleOptionChange).toHaveBeenCalledWith('executionTime', ExecutionTime.MediumTerm);
  });
});
