import { getWorkType } from 'data/calculationData';
import { BasePrice, Uniqueness, WorkType } from 'types/calculation';

describe('getWorkType', () => {
  test('should return an array of work types with the correct structure', () => {
    const workTypes = getWorkType();

    expect(workTypes).toBeDefined();
    expect(Array.isArray(workTypes)).toBe(true);
    expect(workTypes).toHaveLength(9);

    workTypes.forEach((type) => {
      expect(type).toEqual(
        expect.objectContaining({
          typeId: expect.any(String),
          option: expect.any(String),
          uniquenessPercentage: expect.any(Number),
          basePrice: expect.any(Number),
        }),
      );

      expect(Object.values(WorkType)).toContain(type.option);
      expect(Object.values(Uniqueness)).toContain(type.uniquenessPercentage);
      expect(Object.values(BasePrice)).toContain(type.basePrice);
    });
  });
});
