import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { AriaDescription, AriaId, PrimaryButtonLabel } from 'types';
import { useMenu } from 'context';
import { PriceControlsMobile } from 'components/home/subcomponents';

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

jest.mock('ui', () => ({
  PrimaryButtonUI: jest.fn(({ children, ariaId, handleClick, ariaDescription }) => (
    <>
      <button
        aria-describedby={ariaId}
        onClick={handleClick}
        className='h-16'
      >
        {children}
      </button>
      <span
        id={ariaId}
        data-testid='aria-description-text'
      >
        {ariaDescription}
      </span>
    </>
  )),
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

describe('PriceControlsMobile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render button with correct aria-label and styles', () => {
    setup({ isCalcMenuOpen: false });
    render(<PriceControlsMobile />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-describedby', AriaId.CalculationModule);
    expect(button).toHaveClass('h-16');
    expect(button).toHaveTextContent(PrimaryButtonLabel.CostCalculation);

    const ariaDescriptionElement = screen.getByTestId('aria-description-text');
    expect(ariaDescriptionElement).toHaveAttribute('id', AriaId.CalculationModule);
    expect(ariaDescriptionElement).toHaveTextContent(AriaDescription.CalculationModule);
  });

  it('should render the components default state', () => {
    setup({ isCalcMenuOpen: false });
    render(<PriceControlsMobile />);

    expect(screen.queryByTestId('mobile-calculation-menu')).not.toBeInTheDocument();
    expect(screen.queryByTestId('price-calculator-mobile')).not.toBeInTheDocument();
  });

  it('should call toggleCalcMenu when the the button is clicked', async () => {
    setup({ isCalcMenuOpen: false });
    const { rerender } = render(<PriceControlsMobile />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockToggleCalcMenu).toHaveBeenCalled();

    setup({ isCalcMenuOpen: true });

    rerender(<PriceControlsMobile />);

    await waitFor(
      () => {
        expect(screen.queryByTestId('mobile-calculation-menu')).toBeInTheDocument();
        expect(screen.queryByTestId('price-calculator-mobile')).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });
});
