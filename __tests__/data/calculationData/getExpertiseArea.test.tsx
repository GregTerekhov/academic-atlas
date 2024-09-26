import { getExpertiseArea } from 'data';
import { ExpertiseArea } from 'types';

describe('getExpertiseArea', () => {
  test('should return an array of expertise area with the correct structure', () => {
    const expertiseArea = getExpertiseArea();

    expect(expertiseArea).toBeDefined();
    expect(Array.isArray(expertiseArea)).toBe(true);
    expect(expertiseArea).toHaveLength(27);

    expertiseArea.forEach((area) => {
      expect(area).toEqual(
        expect.objectContaining({
          typeId: expect.any(String),
          option: expect.any(String),
        }),
      );

      expect(Object.values(ExpertiseArea)).toContain(area.option);
    });
  });
});
