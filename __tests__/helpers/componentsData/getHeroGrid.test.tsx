import { getHeroGrid } from 'data';

describe('getHeroGrid', () => {
  it('should return an array of hero grid items with the correct structure', () => {
    const heroGrid = getHeroGrid();

    expect(heroGrid).toBeDefined();
    expect(Array.isArray(heroGrid)).toBe(true);
    expect(heroGrid).toHaveLength(7);

    heroGrid.forEach((item) => {
      expect(item).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          className: expect.any(String),
        }),
      );
    });
  });
});
