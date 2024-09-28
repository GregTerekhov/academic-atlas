import { getMinimalUniqueness } from 'helpers';
import { WorkType, Uniqueness } from 'types';

describe('getMinimalUniqueness', () => {
  it.each([
    [WorkType.TeamPapers, Uniqueness.TeamPapers],
    [WorkType.Diplomas, Uniqueness.Standard],
    [WorkType.MasterTheses, Uniqueness.Higher],
    [WorkType.Abstracts, Uniqueness.Highest],
  ])('returns correct minimal uniqueness for %s', (workType: WorkType, expected: Uniqueness) => {
    expect(getMinimalUniqueness(workType)).toBe(expected);
  });

  it.each([
    [WorkType.Default, Uniqueness.Zero],
    [WorkType.TestPapers, Uniqueness.Zero],
  ])('returns Zero for unknown work types like %s', (workType: WorkType, expected: Uniqueness) => {
    expect(getMinimalUniqueness(workType)).toBe(expected);
  });
});
