import { getAboutUsData } from 'data';

describe('getAboutUsData', () => {
  it('should return an array of About Us data with the correct structure', () => {
    const aboutUsData = getAboutUsData();

    expect(aboutUsData).toBeDefined();
    expect(Array.isArray(aboutUsData)).toBe(true);
    expect(aboutUsData).toHaveLength(2);

    aboutUsData.forEach((item) => {
      expect(item).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          imageSrc: expect.stringMatching(/^\/images\/.*\.(jpg|jpeg|png|webp)$/),
          imageAlt: expect.any(String),
        }),
      );
    });
  });
});
