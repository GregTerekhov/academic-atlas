import { couldChooseUniqueness } from 'helpers';
import { WorkType } from 'types';

describe('couldChooseUniqueness', () => {
  it.each([
    [
      'returns true for work types that support uniqueness (BachelorTheses)',
      WorkType.BachelorTheses,
      true,
    ],
    ['returns true for work types that support uniqueness (TeamPapers)', WorkType.TeamPapers, true],
    [
      'returns false for work types that do not support uniqueness (Default)',
      WorkType.Default,
      false,
    ],
    [
      'returns false for work types that do not support uniqueness (CaseStudyReports)',
      WorkType.CaseStudyReports,
      false,
    ],
  ])('%s', (_, workType: WorkType, expected: boolean) => {
    expect(couldChooseUniqueness(workType)).toBe(expected);
  });
});
