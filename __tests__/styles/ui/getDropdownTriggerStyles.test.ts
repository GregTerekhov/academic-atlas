import { getDropdownTriggerStyles } from 'styles';

const setup = (
  expectedStyles: string,
  isOptionSelected: boolean = false,
  isDropdownOpen: boolean = false,
) => {
  const styles = getDropdownTriggerStyles(isOptionSelected, isDropdownOpen);
  expect(styles).toContain(expectedStyles);
};

describe('getDropdownTriggerStyles', () => {
  it('should return default styles when no parameters are passed', () => {
    setup(
      'bg-none border-accentPrimary dark:border-accentSecondary-darker bg-whiteBase dark:bg-darkBase border rounded-lg flex h-10 w-full items-center justify-between border-solid px-2 hover:border-transparent dark:hover:border-transparent hocus:outline-none hocus:ring-[2px] hocus:ring-accentPrimary dark:hocus:ring-accentSecondary md:h-12 md:px-4',
    );
    expect(true).toBe(true);
  });

  it('should return styles for selected button', () => {
    setup('border-none bg-accent-lightGradient dark:bg-accent-darkGradient', true);
    expect(true).toBe(true);
  });

  it('should return styles for button when dropdown is opened', () => {
    setup('rounded-t-lg', false, true);
    expect(true).toBe(true);
  });
});
