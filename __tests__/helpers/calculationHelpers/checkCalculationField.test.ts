import { checkCalculationField } from 'helpers';
import { ICalculationData, WorkType, ExpertiseArea, ExecutionTime } from 'types';

describe('checkCalculationField', () => {
  it.each([
    [
      'returns true if all fields are set to non-default values',
      {
        workType: WorkType.Diplomas,
        expertiseArea: ExpertiseArea.ElectricalEngineering,
        executionTime: ExecutionTime.MediumTerm,
      },
      true,
    ],
    [
      'returns false if any field is set to a default value (WorkType)',
      {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.ElectricalEngineering,
        executionTime: ExecutionTime.MediumTerm,
      },
      false,
    ],
    [
      'returns false if any field is set to a default value (ExpertiseArea)',
      {
        workType: WorkType.Diplomas,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.MediumTerm,
      },
      false,
    ],
    [
      'returns false if any field is set to a default value (ExecutionTime)',
      {
        workType: WorkType.Diplomas,
        expertiseArea: ExpertiseArea.ElectricalEngineering,
        executionTime: ExecutionTime.Default,
      },
      false,
    ],
  ])('%s', (_, data: ICalculationData, expected: boolean) => {
    expect(checkCalculationField(data)).toBe(expected);
  });
});
