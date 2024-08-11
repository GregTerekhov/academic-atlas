import { IconName } from 'types';
import { getPartnershipBenefits } from 'data';

describe('getPartnershipBenefits', () => {
  it('should return an array of partnership benefits with the correct structure', () => {
    const benefits = getPartnershipBenefits();

    expect(benefits).toBeDefined();
    expect(Array.isArray(benefits)).toBe(true);
    expect(benefits).toHaveLength(3);

    benefits.forEach((benefit) => {
      expect(benefit).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          iconName: expect.any(String),
        }),
      );

      expect(Object.values(IconName)).toContain(benefit.iconName);
    });
  });
});
