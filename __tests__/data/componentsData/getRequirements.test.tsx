import { getRequirements } from 'data';

describe('getRequirements', () => {
  it('should return an array of requirements with the correct structure', () => {
    const requirements = getRequirements();

    expect(requirements).toBeDefined();
    expect(Array.isArray(requirements)).toBe(true);
    expect(requirements).toHaveLength(3);

    requirements.forEach((req) => {
      expect(req).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
        }),
      );
    });
  });
});
