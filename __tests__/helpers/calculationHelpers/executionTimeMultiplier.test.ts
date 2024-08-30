import { executionTimeMultiplier } from 'helpers';
import { ExecutionTime, CalculationMultiplier } from 'types';

describe('executionTimeMultiplier', () => {
  it.each([
    [
      'returns NoMultiplier for LongTerm execution time',
      ExecutionTime.LongTerm,
      CalculationMultiplier.NoMultiplier,
    ],
    [
      'returns IncreasedStandard for MediumTerm execution time',
      ExecutionTime.MediumTerm,
      CalculationMultiplier.IncreasedStandard,
    ],
    [
      'returns Urgent for Urgent execution time',
      ExecutionTime.Urgent,
      CalculationMultiplier.Urgent,
    ],
    [
      'returns NoMultiplier for default execution time',
      ExecutionTime.Default,
      CalculationMultiplier.NoMultiplier,
    ],
  ])('%s', (_, executionTime: ExecutionTime, expected: CalculationMultiplier) => {
    expect(executionTimeMultiplier(executionTime)).toBe(expected);
  });
});
