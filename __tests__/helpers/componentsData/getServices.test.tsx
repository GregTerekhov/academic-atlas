import { WorkType } from 'types';
import { getServices } from 'data';

describe('getServices', () => {
  it('should return an array of services with the correct structure', () => {
    const services = getServices();

    expect(services).toBeDefined();
    expect(Array.isArray(services)).toBe(true);
    expect(services).toHaveLength(9);

    services.forEach((service) => {
      expect(service).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          imageSrc: expect.stringMatching(/^\/images\/.*\.(jpg|jpeg|png|webp)$/),
          imageAlt: expect.any(String),
          serviceTitle: expect.any(String),
        }),
      );

      expect(Object.values(WorkType)).toContain(service.serviceTitle);
      expect(service.serviceTitle).not.toBe(WorkType.Default);
    });
  });
});
