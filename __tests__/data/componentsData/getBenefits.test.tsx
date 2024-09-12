import { BenefitLabel, IconName } from 'types';
import { getBenefits } from 'data';

describe('getBenefits', () => {
  it('should return an array of benefits with the correct structure', () => {
    const benefits = getBenefits();

    expect(benefits).toBeDefined();
    expect(Array.isArray(benefits)).toBe(true);
    expect(benefits).toHaveLength(4);

    benefits.forEach((benefit) => {
      expect(benefit).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          iconName: expect.any(String),
          label: expect.any(String),
        }),
      );

      expect(Object.values(IconName)).toContain(benefit.iconName);
      expect(Object.values(BenefitLabel)).toContain(benefit.label);
    });
  });
});
