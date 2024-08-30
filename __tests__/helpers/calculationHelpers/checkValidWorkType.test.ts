import { checkValidWorkType } from 'helpers';
import { WorkType } from 'types';

describe('checkValidWorkType', () => {
  it.each([
    ['returns true for valid work types (Diplomas)', WorkType.Diplomas, true],
    ['returns true for valid work types (TeamPapers)', WorkType.TeamPapers, true],
    ['returns false for invalid work types (Default)', WorkType.Default, false],
    ['returns false for invalid work types (PracticalWorks)', WorkType.PracticalWorks, false],
  ])('%s', (_, workType: WorkType, expected: boolean) => {
    expect(checkValidWorkType(workType)).toBe(expected);
  });
});
