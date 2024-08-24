import { getDropdownIconStyles } from 'styles';

const setup = (
  expectedStyles: string,
  isOptionSelected: boolean = false,
  isDropdownOpen: boolean = false,
) => {
  const styles = getDropdownIconStyles(isOptionSelected, isDropdownOpen);
  expect(styles).toContain(expectedStyles);
};

describe('getDropdownIconStyles', () => {
  it('should return default styles when no parameters are passed', () => {
    setup(' fill-darkBase dark:fill-whiteBase transition-transform');
    expect(true).toBe(true);
  });

  it('should return styles for icon when option is selected', () => {
    setup('fill-whiteBase', true);
    expect(true).toBe(true);
  });

  it('should return styles for icon when dropdown is opened', () => {
    setup('rotate-180', false, true);
    expect(true).toBe(true);
  });
});
