/* eslint-disable jest/no-conditional-expect */
import { fireEvent, render, screen } from '@testing-library/react';

import { AriaLabelTrigger, IconName } from 'types';
import { getAriaLabelSwitcher } from 'helpers';
import { useMenu } from 'context';

import ToggleMenuTrigger from 'components/layout/header-components/toggle-controls';

jest.mock('context', () => ({
  useMenu: jest.fn(),
}));

jest.mock('helpers', () => ({
  getAriaLabelSwitcher: jest.fn(),
}));

jest.mock('template', () => ({
  MobileMenuTemplate: jest.fn(({ children }) => {
    const { isNavMenuOpen, isCalcMenuOpen, showCalculationMenu } = useMenu();
    const isMenuOpen = isNavMenuOpen || isCalcMenuOpen || showCalculationMenu;

    return isMenuOpen ? <div data-testid='mobile-menu-trigger'>{children}</div> : null;
  }),
}));

jest.mock('ui', () => ({
  SvgIconUI: jest.fn(({ id }) => (
    <svg
      data-testid='svg-icon'
      id={id}
    ></svg>
  )),
}));

jest.mock('components/layout/menu', () => jest.fn(() => <div data-testid='menu' />));

jest.mock('components/calculation/product-price-calculator', () =>
  jest.fn(() => <div data-testid='price-calculator' />),
);

const mockUseMenu = useMenu as jest.Mock;
const mockGetAriaLabelSwitcher = getAriaLabelSwitcher as jest.Mock;

const setup = (menuState: Partial<ReturnType<typeof useMenu>>) => {
  mockUseMenu.mockReturnValue({
    isNavMenuOpen: menuState.isNavMenuOpen ?? false,
    isCalcMenuOpen: menuState.isCalcMenuOpen ?? false,
    showCalculationMenu: menuState.showCalculationMenu ?? false,
    handleToggleMenu: jest.fn(),
  });

  mockGetAriaLabelSwitcher.mockImplementation((isNavMenuOpen, isCalcMenuOpen) => {
    if (isNavMenuOpen) return AriaLabelTrigger.CloseNavigation;
    if (isCalcMenuOpen) return AriaLabelTrigger.CloseCalculation;
    return AriaLabelTrigger.Default;
  });

  render(<ToggleMenuTrigger />);
};

describe('ToggleMenuTrigger Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testCases = [
    {
      menuState: { isNavMenuOpen: false, isCalcMenuOpen: false },
      expectedIconId: IconName.Burger,
      expectedAriaLabel: AriaLabelTrigger.Default,
      shouldShowMobileMenu: false,
      shouldShowMobileMenuContent: false,
      shouldShowPriceCalculator: false,
    },
    {
      menuState: { isNavMenuOpen: true, isCalcMenuOpen: false },
      expectedIconId: IconName.Close,
      expectedAriaLabel: AriaLabelTrigger.CloseNavigation,
      shouldShowMobileMenu: true,
      shouldShowMobileMenuContent: true,
      shouldShowPriceCalculator: false,
    },
    {
      menuState: { isNavMenuOpen: true, isCalcMenuOpen: false, showCalculationMenu: true },
      expectedIconId: IconName.Close,
      expectedAriaLabel: AriaLabelTrigger.CloseNavigation, // FIXME: fix ariaLabel in getAriaLabelSwitcher
      shouldShowMobileMenu: true,
      shouldShowMobileMenuContent: false,
      shouldShowPriceCalculator: true,
    },
  ];

  it.each(testCases)(
    'should render the correct icon ($expectedIconId) and aria-label ($expectedAriaLabel) based on menu state: $menuState',
    ({
      menuState,
      expectedIconId,
      expectedAriaLabel,
      shouldShowMobileMenu,
      shouldShowMobileMenuContent,
      shouldShowPriceCalculator,
    }) => {
      setup(menuState);

      const iconElement = screen.getByTestId('svg-icon');
      expect(iconElement).toHaveAttribute('id', expectedIconId);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', expectedAriaLabel);

      const menuWrapper = screen.queryByTestId('mobile-menu-trigger');
      const priceCalculator = screen.queryByTestId('price-calculator');
      const menuContent = screen.queryByTestId('menu');

      if (shouldShowMobileMenu) {
        expect(menuWrapper).toBeInTheDocument();
      } else {
        expect(menuWrapper).not.toBeInTheDocument();
      }

      if (shouldShowPriceCalculator) {
        expect(priceCalculator).toBeInTheDocument();
      } else {
        expect(priceCalculator).not.toBeInTheDocument();
      }

      if (shouldShowMobileMenuContent) {
        expect(menuContent).toBeInTheDocument();
      } else {
        expect(menuContent).not.toBeInTheDocument();
      }
    },
  );

  it('should call handleToggleMenu when the button is clicked', () => {
    const mockHandleToggleMenu = jest.fn();

    mockUseMenu.mockReturnValue({
      isNavMenuOpen: false,
      isCalcMenuOpen: false,
      showCalculationMenu: false,
      handleToggleMenu: mockHandleToggleMenu,
    });

    render(<ToggleMenuTrigger />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockHandleToggleMenu).toHaveBeenCalled();
  });
});
