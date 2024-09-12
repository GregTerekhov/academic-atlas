import { IconName } from 'types';
import { getOrderSteps } from 'data';

describe('getOrderSteps', () => {
  it('should return an array of order steps with the correct structure', () => {
    const steps = getOrderSteps();

    expect(steps).toBeDefined();
    expect(Array.isArray(steps)).toBe(true);
    expect(steps).toHaveLength(5);

    steps.forEach((step) => {
      expect(step).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          step: expect.any(String),
          iconName: expect.any(String),
        }),
      );

      expect(Object.values(IconName)).toContain(step.iconName);
    });
  });
});
