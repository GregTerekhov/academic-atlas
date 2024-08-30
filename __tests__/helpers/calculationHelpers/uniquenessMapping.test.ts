import { uniquenessMapping } from 'helpers';
import { Uniqueness } from 'types';

describe('uniquenessMapping', () => {
  it('maps uniqueness values correctly', () => {
    expect(uniquenessMapping[Uniqueness.TeamPapers]).toBe(Uniqueness.TeamPapers);
    expect(uniquenessMapping[Uniqueness.Standard]).toBe(Uniqueness.Standard);
    expect(uniquenessMapping[Uniqueness.Higher]).toBe(Uniqueness.Higher);
    expect(uniquenessMapping[Uniqueness.Highest]).toBe(Uniqueness.Highest);
  });
});
