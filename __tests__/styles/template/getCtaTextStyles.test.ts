import { getCtaTextStyles } from 'styles';

describe('getCtaTextStyles', () => {
  it('should return margin class "max-md:mb-6" when "no-margin" is in textStyle', () => {
    const textStyle = 'no-margin some-other-class';
    const result = getCtaTextStyles(textStyle);

    expect(result).toContain('max-md:mb-6');
  });

  it('should return margin class "mb-6 md:mb-8 lg:mb-16" when "no-margin" is not in textStyle', () => {
    const textStyle = 'some-other-class';
    const result = getCtaTextStyles(textStyle);

    expect(result).toContain('mb-6 md:mb-8 lg:mb-16');
  });

  it('should return default text style with margin classes when textStyle is undefined', () => {
    const result = getCtaTextStyles(undefined);

    expect(result).toBe(' mb-6 md:mb-8 lg:mb-16 text-medium md:text-xl lg:text-2xl');
  });

  it('should append provided textStyle and correct margin class', () => {
    const textStyle = 'custom-class';
    const result = getCtaTextStyles(textStyle);

    expect(result).toBe('custom-class mb-6 md:mb-8 lg:mb-16 text-medium md:text-xl lg:text-2xl');
  });
});
