import { getFiguresTextStyles } from 'styles';

describe('getFiguresTextStyles', () => {
  it.each([
    ['hidden md:flex', true, undefined, undefined],
    ['hidden max-lg:flex', undefined, true, undefined],
    ['hidden lg:flex', undefined, undefined, true],
    ['flex', undefined, undefined, undefined],
  ])(
    'should return %s when hideOnSmallScreen=%s, hideOnLargeScreen=%s, showOnLargeScreen=%s',
    (expected, hideOnSmallScreen, hideOnLargeScreen, showOnLargeScreen) => {
      expect(getFiguresTextStyles(hideOnSmallScreen, hideOnLargeScreen, showOnLargeScreen)).toBe(
        expected,
      );
    },
  );
});
