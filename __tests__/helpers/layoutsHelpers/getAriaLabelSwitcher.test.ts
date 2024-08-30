import { getAriaLabelSwitcher } from 'helpers';
import { AriaLabelTrigger } from 'types';

describe('getAriaLabelSwitcher', () => {
  it.each([
    [AriaLabelTrigger.CloseCalculation, false, false, true],
    [AriaLabelTrigger.CloseNavigation, true, false, false],
    [AriaLabelTrigger.CloseCalculation, false, true, false],
    [AriaLabelTrigger.Default, false, false, false],
  ])(
    'returns %s when isNavMenuOpen is %s, isCalcMenuOpen is %s, and showCalculationMenu is %s',
    (expected, isNavMenuOpen, isCalcMenuOpen, showCalculationMenu) => {
      expect(getAriaLabelSwitcher(isNavMenuOpen, isCalcMenuOpen, showCalculationMenu)).toBe(
        expected,
      );
    },
  );
});
