import { getAccordionExpandIconStyles } from 'styles';

const setup = (expectedStyles: string, isOpen: boolean = false) => {
  const styles = getAccordionExpandIconStyles(isOpen);
  expect(styles).toContain(expectedStyles);
};

describe('getAccordionExpandIconStyles', () => {
  it('should return default styles when no parameters are passed', () => {
    setup(
      'fill-darkBase dark:fill-whiteBase mx-auto transition-transform duration-200 group-hover:fill-accentPrimary-darker dark:group-hover:fill-accentSecondary-darker md:size-8',
    );

    expect(true).toBe(true);
  });

  it('should return styles for icon when dropdown is opened', () => {
    setup('rotate-180 transform fill-accentPrimary dark:fill-accentSecondary', true);

    expect(true).toBe(true);
  });
});
