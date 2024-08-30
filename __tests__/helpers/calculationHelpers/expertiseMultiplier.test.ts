import { expertiseMultiplier } from 'helpers';
import { ExpertiseArea, CalculationMultiplier } from 'types';

describe('expertiseMultiplier', () => {
  it.each([
    [
      'returns Standard for humanities and economics',
      ExpertiseArea.Humanities,
      CalculationMultiplier.Standard,
    ],
    [
      'returns IncreasedStandard for technical sciences',
      ExpertiseArea.ElectricalEngineering,
      CalculationMultiplier.IncreasedStandard,
    ],
    ['returns IT for IT area', ExpertiseArea.IT, CalculationMultiplier.IT],
    [
      'returns NoMultiplier for default area',
      ExpertiseArea.Default,
      CalculationMultiplier.NoMultiplier,
    ],
  ])('%s', (_, expertiseArea: ExpertiseArea, expected: CalculationMultiplier) => {
    expect(expertiseMultiplier(expertiseArea)).toBe(expected);
  });
});
