import { shouldResetValues } from 'helpers';
import { ICalculation, WorkType, ExpertiseArea, ExecutionTime, Uniqueness } from 'types';

describe('shouldResetValues', () => {
  it.each([
    [
      true,
      {
        workType: WorkType.Diplomas,
        expertiseArea: ExpertiseArea.ElectricalEngineering,
        executionTime: ExecutionTime.MediumTerm,
        uniqueness: Uniqueness.Standard,
        theme: 'Some theme',
      },
    ],
    [
      false,
      {
        workType: WorkType.Default,
        expertiseArea: ExpertiseArea.Default,
        executionTime: ExecutionTime.Default,
        uniqueness: Uniqueness.Zero,
        theme: '',
      },
    ],
  ])('returns %p for data %p', (expected: boolean, data: ICalculation) => {
    expect(shouldResetValues(data)).toBe(expected);
  });
});
