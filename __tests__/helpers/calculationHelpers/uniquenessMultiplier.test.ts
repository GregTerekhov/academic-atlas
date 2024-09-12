import { uniquenessMultiplier } from 'helpers';
import { Uniqueness, CalculationMultiplier } from 'types';

describe('uniquenessMultiplier', () => {
  it.each([
    // NoMultiplier cases
    [CalculationMultiplier.NoMultiplier, { uniquenessPercentage: Uniqueness.Standard }, undefined],
    [CalculationMultiplier.NoMultiplier, { uniquenessPercentage: 999 as Uniqueness }, undefined],
    [
      CalculationMultiplier.NoMultiplier,
      { uniquenessPercentage: Uniqueness.Standard },
      Uniqueness.Standard + 10,
    ],
    [
      CalculationMultiplier.NoMultiplier,
      { uniquenessPercentage: Uniqueness.Standard },
      Uniqueness.Standard - 10,
    ],
    [
      CalculationMultiplier.NoMultiplier,
      { uniquenessPercentage: Uniqueness.Standard },
      Uniqueness.Zero,
    ],
    [
      CalculationMultiplier.NoMultiplier,
      { uniquenessPercentage: Uniqueness.TeamPapers },
      undefined,
    ],
    [
      CalculationMultiplier.NoMultiplier,
      { uniquenessPercentage: Uniqueness.TeamPapers },
      Uniqueness.TeamPapers + 10,
    ],
    [
      CalculationMultiplier.NoMultiplier,
      { uniquenessPercentage: Uniqueness.TeamPapers },
      Uniqueness.TeamPapers - 10,
    ],
    [
      CalculationMultiplier.NoMultiplier,
      { uniquenessPercentage: Uniqueness.TeamPapers },
      Uniqueness.Zero,
    ],
    [CalculationMultiplier.NoMultiplier, { uniquenessPercentage: Uniqueness.Higher }, undefined],
    [
      CalculationMultiplier.NoMultiplier,
      { uniquenessPercentage: Uniqueness.Higher },
      Uniqueness.Higher + 10,
    ],
    [
      CalculationMultiplier.NoMultiplier,
      { uniquenessPercentage: Uniqueness.Higher },
      Uniqueness.Higher - 10,
    ],
    [
      CalculationMultiplier.NoMultiplier,
      { uniquenessPercentage: Uniqueness.Higher },
      Uniqueness.Zero,
    ],
    [CalculationMultiplier.NoMultiplier, { uniquenessPercentage: Uniqueness.Highest }, undefined],
    [
      CalculationMultiplier.NoMultiplier,
      { uniquenessPercentage: Uniqueness.Highest },
      Uniqueness.Highest - 10,
    ],
    [
      CalculationMultiplier.NoMultiplier,
      { uniquenessPercentage: Uniqueness.Highest },
      Uniqueness.Zero,
    ],
    [
      CalculationMultiplier.NoMultiplier,
      { uniquenessPercentage: undefined as unknown as Uniqueness },
      Uniqueness.Standard,
    ],
    // Standard cases
    [
      CalculationMultiplier.Standard,
      { uniquenessPercentage: Uniqueness.Standard },
      Uniqueness.Standard + 30,
    ],
    [
      CalculationMultiplier.Standard,
      { uniquenessPercentage: Uniqueness.TeamPapers },
      Uniqueness.Standard + 20,
    ],
    [
      CalculationMultiplier.Standard,
      { uniquenessPercentage: Uniqueness.Higher },
      Uniqueness.Higher + 20,
    ],
    // IncreasedStandard cases
    [
      CalculationMultiplier.IncreasedStandard,
      { uniquenessPercentage: Uniqueness.Standard },
      Uniqueness.Standard + 40,
    ],
    [
      CalculationMultiplier.IncreasedStandard,
      { uniquenessPercentage: Uniqueness.TeamPapers },
      Uniqueness.TeamPapers + 40,
    ],
    [
      CalculationMultiplier.IncreasedStandard,
      { uniquenessPercentage: Uniqueness.Higher },
      Uniqueness.Higher + 30,
    ],
  ])(
    'returns %s for uniquenessPercentage = %o and customUniqueness = %o',
    (expected, workTypeData, customUniqueness) => {
      expect(uniquenessMultiplier(workTypeData, customUniqueness)).toBe(expected);
    },
  );
});
