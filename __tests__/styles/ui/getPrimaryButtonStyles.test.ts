import { getPrimaryButtonStyles } from 'styles';

const setup = (expectedStyles: string, isLightBackground?: boolean, isDisabled?: boolean) => {
  const styles = getPrimaryButtonStyles(isLightBackground, isDisabled);
  expect(styles).toContain(expectedStyles);
};

describe('getPrimaryButtonStyles', () => {
  it('should return default styles when no parameters are passed', () => {
    setup(
      ' bg-accent-lightGradient dark:bg-accent-darkGradient hocus:bg-none dark:hocus:bg-none dark:hocus:bg-whiteBase/10 hocus:bg-accentPrimary/10 hocus:outline-none hocus:ring-[2px] dark:hocus:ring-accentSecondary hocus:ring-accentPrimary text-whiteBase flex items-center justify-center rounded-[20px] max-sm:text-medium text-big font-bold w-full md:w-80 lg:text-xl',
    );
    expect(true).toBe(true);
  });

  it('should return styles for light background', () => {
    setup('hocus:text-accentPrimary dark:hocus:text-whiteBase', true);
    expect(true).toBe(true);
  });

  it('should return styles for disabled button', () => {
    setup('bg-none text-whiteBase dark:text-disabled-foreground', false, true);
    expect(true).toBe(true);
  });

  it('should return styles for active button', () => {
    setup('bg-accent-lightGradient dark:bg-accent-darkGradient', false, false);
    expect(true).toBe(true);
  });
});
