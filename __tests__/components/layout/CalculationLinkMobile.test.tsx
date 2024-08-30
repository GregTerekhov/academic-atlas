import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { AriaLabel, MenuLinks, PositionInLayout } from 'types';
import { useMenu } from 'context';

import { CalculationLinkMobile } from 'components/layout/subcomponents';

jest.mock('context', () => ({
  useMenu: jest.fn(),
}));

jest.mock('template', () => ({
  MobileMenuTemplate: jest.fn(({ children }) => {
    const { isCalcMenuOpen, showCalculationMenu } = useMenu();

    return isCalcMenuOpen || showCalculationMenu ? (
      <div data-testid='mobile-calculation-menu'>{children}</div>
    ) : null;
  }),
}));

jest.mock('components/calculation/product-price-calculator', () =>
  jest.fn(() => <div data-testid='price-calculator-mobile' />),
);

const mockUseMenu = useMenu as jest.Mock;
const mockToggleCalcMenu = jest.fn();
const mockChangeMenuContent = jest.fn();

const setup = (menuState: Partial<ReturnType<typeof useMenu>>) => {
  mockUseMenu.mockReturnValue({
    isCalcMenuOpen: menuState.isCalcMenuOpen ?? false,
    showCalculationMenu: menuState.showCalculationMenu ?? false,
    toggleCalcMenu: mockToggleCalcMenu,
    changeMenuContent: mockChangeMenuContent,
  });
};

const renderAndAssertButton = (position: PositionInLayout, className: string) => {
  render(<CalculationLinkMobile position={position} />);
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-label', AriaLabel.CalculationModule);
  expect(button).toHaveClass(className);
};

const assertMenuAndCalculatorPresence = async (shouldBePresent: boolean) => {
  await waitFor(
    () => {
      const menu = screen.queryByTestId('mobile-calculation-menu');
      const calculator = screen.queryByTestId('price-calculator-mobile');
      if (shouldBePresent) {
        expect(menu).toBeInTheDocument();
        expect(calculator).toBeInTheDocument();
      } else {
        expect(menu).not.toBeInTheDocument();
        expect(calculator).not.toBeInTheDocument();
      }
    },
    { timeout: 2000 },
  );
};

describe('CalculationLinkMobile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    [PositionInLayout.Header, 'text-medium md:text-big'],
    [PositionInLayout.Footer, 'text-start text-sm max-sm:text-xs md:text-base'],
  ])('should render button in the %s with correct aria-label and styles', (position, className) => {
    setup({ isCalcMenuOpen: false });
    renderAndAssertButton(position, className);
    expect(screen.getByRole('button')).toHaveTextContent(MenuLinks.Cost);
  });

  it("should render the component's default state correctly", () => {
    setup({ isCalcMenuOpen: false });
    render(<CalculationLinkMobile position={PositionInLayout.Header} />);
    expect(screen.queryByTestId('mobile-calculation-menu')).not.toBeInTheDocument();
    expect(screen.queryByTestId('price-calculator-mobile')).not.toBeInTheDocument();
  });

  it.each([
    [PositionInLayout.Footer, mockToggleCalcMenu],
    [PositionInLayout.Header, mockChangeMenuContent],
  ])(
    'should call the appropriate menu function when the button is clicked in the %s and update the menu state',
    async (position, mockFunction) => {
      setup({
        isCalcMenuOpen: false,
        showCalculationMenu: position === PositionInLayout.Header && false,
      });

      const { rerender } = render(<CalculationLinkMobile position={position} />);

      fireEvent.click(screen.getByRole('button'));
      expect(mockFunction).toHaveBeenCalled();

      setup({
        isCalcMenuOpen: position === PositionInLayout.Footer,
        showCalculationMenu: position === PositionInLayout.Header,
      });
      rerender(<CalculationLinkMobile position={position} />);
      await assertMenuAndCalculatorPresence(true);
    },
  );
});
