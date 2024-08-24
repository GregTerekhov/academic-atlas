import { getDropdownLabelStyles } from 'styles';

const setup = (expectedStyles: string, isOptionSelected: boolean) => {
  const styles = getDropdownLabelStyles(isOptionSelected);
  expect(styles).toContain(expectedStyles);
};

describe('getDropdownLabelStyles', () => {
  it('should return default styles when no parameters are passed', () => {
    setup(
      'text-sm max-md:leading-130 text-darkBase dark:text-whiteBase/60 md:text-base lg:text-big',
      false,
    );

    expect(true).toBe(true);
  });

  it('should return styles for selected label', () => {
    setup(
      'max-sm:text-sm max-sm:font-normal text-base font-bold text-whiteBase md:text-medium lg:text-lg text-left line-clamp-1',
      true,
    );

    expect(true).toBe(true);
  });
});
