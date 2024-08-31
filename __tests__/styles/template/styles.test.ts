import {
  getModalContainerStyles,
  getBackdropStyles,
  getModalCloseIconStyles,
  getMobileMenuContainerStyles,
} from 'styles';

describe.each([
  { func: getBackdropStyles, expectedParts: ['fixed left-0 top-0 z-50'] },
  {
    func: getModalContainerStyles,
    expectedParts: ['bg-background-light-gradient', 'dark:bg-background-dark-gradient'],
  },
  {
    func: getModalCloseIconStyles,
    expectedParts: ['fill-darkBase', 'dark:fill-whiteBase'],
  },
])('Testing static style functions for template components', ({ func, expectedParts }) => {
  it(`should return correct styles when ${func.name} is called`, () => {
    const styles = func();

    if (Array.isArray(expectedParts)) {
      expectedParts.forEach((expectedPart) => {
        if (expectedPart) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(styles).toContain(expectedPart);
        } else {
          throw new Error(`Expected part is undefined for ${func.name}`);
        }
      });
    } else {
      if (expectedParts) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(styles).toContain(expectedParts);
      } else {
        throw new Error(`Expected parts are undefined for ${func.name}`);
      }
    }
  });
});

describe('getMobileMenuContainerStyles', () => {
  it.each([
    [
      true,
      'left-0 fixed top-20 z-40 h-full w-full overflow-auto bg-whiteBase bg-background-light-gradient pb-52 pt-10 transition-[left] duration-500 before:fixed before:left-0 before:top-0 before:w-full before:content-[""] dark:bg-background-dark-gradient md:top-24 max-h-mobileMenu md:max-h-tabletMenu',
    ],
    [
      false,
      '-left-full fixed top-20 z-40 h-full w-full overflow-auto bg-whiteBase bg-background-light-gradient pb-52 pt-10 transition-[left] duration-500 before:fixed before:left-0 before:top-0 before:w-full before:content-[""] dark:bg-background-dark-gradient md:top-24 max-h-mobileMenu md:max-h-tabletMenu',
    ],
  ])('should return correct styles when isOpen is %s', (isOpen, expectedStyles) => {
    const styles = getMobileMenuContainerStyles(isOpen);
    expect(styles).toBe(expectedStyles);
  });
});
