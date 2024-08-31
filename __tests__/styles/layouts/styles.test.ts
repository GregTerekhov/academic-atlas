import { PositionInLayout } from 'types';
import { getNavigationLinkStyles, getContactListStyles } from 'styles';

describe('getNavigationLinkStyles', () => {
  it.each([
    [
      true,
      'text-accentPrimary dark:text-accentSecondary text-medium hocus:text-accentPrimary dark:hocus:text-accentSecondary md:text-big',
    ],
    [
      false,
      'dark:text-whiteBase text-medium hocus:text-accentPrimary dark:hocus:text-accentSecondary md:text-big',
    ],
  ])('should return correct styles for isActive=%s', (isActive, expected) => {
    expect(getNavigationLinkStyles(isActive)).toBe(expected);
  });
});

describe('getContactListStyles', () => {
  it.each([
    [PositionInLayout.Header, 'block max-lg:space-y-6 lg:flex lg:flex-row-reverse lg:gap-x-5'],
    [
      PositionInLayout.Footer,
      'max-md:flex max-md:items-center max-sm:gap-x-3 max-md:gap-x-4 md:space-y-4 lg:w-[304px]',
    ],
  ])('should return correct styles for variant=%s', (variant, expected) => {
    expect(getContactListStyles(variant)).toBe(expected);
  });
});
