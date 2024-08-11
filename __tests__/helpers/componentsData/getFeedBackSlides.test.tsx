import { getFeedbackSlides } from 'data';

describe('getFeedbackSlides', () => {
  it('should return an array of slides with the correct structure', () => {
    const slides = getFeedbackSlides();

    expect(slides).toBeDefined();
    expect(Array.isArray(slides)).toBe(true);
    expect(slides).toHaveLength(7);

    slides.forEach((slide) => {
      expect(slide).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          imageSrc: expect.stringMatching(/^\/images\/.*\.(jpg|jpeg|png|webp)$/),
          imageAlt: expect.any(String),
          memberRating: expect.any(Number),
        }),
      );
    });
  });
});
