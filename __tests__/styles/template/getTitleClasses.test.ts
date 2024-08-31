import { getTitleClasses } from 'styles';

describe('getTitleClasses', () => {
  it.each([
    ['mb-8 md:mb-10 lg:mb-[72px]', false, false, '', ''],
    ['mb-4 md:mb-6 lg:mb-8', false, true, '', ''],
    ['no-margin', true, false, 'no-margin', ''],
  ])(
    'should return correct styles (%s) for isBigTitle=%s, hasCtaText=%s, titleStyle=%s, noAlignment=%s',
    (expectedStyles, isBigTitle, hasCtaText, titleStyle, noAlignment) => {
      const styles = getTitleClasses(isBigTitle, hasCtaText, titleStyle, noAlignment);
      expect(styles).toBe(expectedStyles);
    },
  );
});
