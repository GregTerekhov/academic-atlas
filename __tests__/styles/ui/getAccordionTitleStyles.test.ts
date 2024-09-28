import { getAccordionTitleStyles } from 'styles';

const setup = (expectedStyles: string, isOpen: boolean = false) => {
  const styles = getAccordionTitleStyles(isOpen);
  expect(styles).toContain(expectedStyles);
};

describe('getAccordionTitleStyles', () => {
  it('should return default styles when no parameters are passed', () => {
    setup(
      'mr-2 flex-1 text-left group-hover:bg-accent-lightGradient group-hover:bg-clip-text group-hover:text-transparent group-hover:[-webkit-background-clip:text] dark:group-hover:bg-accent-darkGradient max-sm:text-medium ',
    );
    expect(true).toBe(true);
  });

  it('should return styles for title when dropdown is opened', () => {
    setup('bg-none text-accentPrimary dark:text-accentSecondary', true);
    expect(true).toBe(true);
  });
});
