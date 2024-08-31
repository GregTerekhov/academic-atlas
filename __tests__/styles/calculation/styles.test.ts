import {
  getThemeInputStyles,
  getCheckboxStyles,
  getResultPriceStyles,
  getDisclaimerTextStyles,
  getDisclaimerCtaTextStyles,
  getDisabledRangeStyles,
} from 'styles';

type StyleFunction = (...args: boolean[]) => string;

describe.each([
  { func: getThemeInputStyles as StyleFunction, args: [true], expected: 'bg-accent-lightGradient' },
  { func: getThemeInputStyles as StyleFunction, args: [false], expected: 'border-accentPrimary' },
  { func: getCheckboxStyles as StyleFunction, args: [true], expected: 'bg-accent-lightGradient' },
  { func: getCheckboxStyles as StyleFunction, args: [false], expected: 'bg-transparent' },
  {
    func: getDisabledRangeStyles as StyleFunction,
    args: [true],
    expected: 'text-darkBase dark:text-whiteBase',
  },
  {
    func: getDisabledRangeStyles as StyleFunction,
    args: [false],
    expected: 'text-disabled-foreground',
  },
])('Testing style functions', ({ func, args, expected }) => {
  it(`should return correct styles when ${func.name} is called with ${args}`, () => {
    expect(func(...args)).toContain(expected);
  });
});

describe.each([
  { func: getResultPriceStyles, expected: 'font-philosopher' },
  { func: getDisclaimerTextStyles, expected: 'generalText' },
  {
    func: getDisclaimerCtaTextStyles,
    expected:
      'lg:text-bg mb-8 text-center text-sm text-darkBase dark:text-whiteBase max-md:leading-130 md:mb-10 md:text-medium',
  },
])('Testing static style functions', ({ func, expected }) => {
  it(`should return correct styles when ${func.name} is called`, () => {
    expect(func()).toContain(expected);
  });
});
