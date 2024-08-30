import { getTitleClasses } from 'styles';

const setup = (
  expectedStyles: string,
  isBigTitle: boolean = false,
  hasCtaText: boolean = false,
  titleStyle: string = '',
  noAlignment: string = '',
) => {
  const styles = getTitleClasses(isBigTitle, hasCtaText, titleStyle, noAlignment);
  expect(styles).toBe(expectedStyles);
};

describe('getTitleClasses', () => {
  it('should return default styles when no parameters are passed', () => {
    setup('mb-8 md:mb-10 lg:mb-[72px]');
    expect(true).toBe(true);
  });

  it('should return styles when hasCtaText is true', () => {
    setup('mb-4 md:mb-6 lg:mb-8', false, true);
    expect(true).toBe(true);
  });

  it('should return styles for title when isBigTitle is true and titleStyle includes "no-margin"', () => {
    setup('no-margin', true, false, 'no-margin');
    expect(true).toBe(true);
  });
});
