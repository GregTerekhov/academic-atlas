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

  it('should render the burger icon and aria-label when no menu is open', () => {
    setup({ isNavMenuOpen: false, isCalcMenuOpen: false });

    const iconElement = screen.getByTestId('svg-icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('id', IconName.Burger);

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', AriaLabelTrigger.Default);
    expect(screen.queryByTestId('mobile-menu-trigger')).not.toBeInTheDocument();
    expect(screen.queryByTestId('price-calculator')).not.toBeInTheDocument();
    expect(screen.queryByTestId('menu')).not.toBeInTheDocument();
  });

  it('should render the close icon and aria-label when nav menu is open', () => {
    setup({ isNavMenuOpen: true, isCalcMenuOpen: false });

    const iconElement = screen.getByTestId('svg-icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('id', IconName.Close);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', AriaLabelTrigger.CloseNavigation);

    expect(screen.queryByTestId('mobile-menu-trigger')).toBeInTheDocument();
    expect(screen.queryByTestId('price-calculator')).not.toBeInTheDocument();
    expect(screen.queryByTestId('menu')).toBeInTheDocument();
  });

  it('should render the close icon and aria-label when calc menu is open after click on calculation button into the nav menu', () => {
    setup({ isNavMenuOpen: true, isCalcMenuOpen: false, showCalculationMenu: true });

    const iconElement = screen.getByTestId('svg-icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('id', IconName.Close);

    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      AriaLabelTrigger.CloseNavigation, //FIXME: fix ariaLabel in getAriaLabelSwitcher
    );
    expect(screen.queryByTestId('mobile-menu-trigger')).toBeInTheDocument();
    expect(screen.queryByTestId('price-calculator')).toBeInTheDocument();
    expect(screen.queryByTestId('menu')).not.toBeInTheDocument();
  });

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
