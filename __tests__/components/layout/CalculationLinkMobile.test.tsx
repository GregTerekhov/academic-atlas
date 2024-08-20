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

describe('CalculationLinkMobile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render button in the header with correct aria-label and styles', () => {
    setup({ isCalcMenuOpen: false });
    render(<CalculationLinkMobile position={PositionInLayout.Header} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', AriaLabel.CalculationModule);
    expect(button).toHaveClass('text-medium md:text-big');
    expect(button).toHaveTextContent(MenuLinks.Cost);
  });

  it('should render button in the footer with correct styles', () => {
    setup({ isCalcMenuOpen: false });
    render(<CalculationLinkMobile position={PositionInLayout.Footer} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-start text-sm max-sm:text-xs md:text-base');
  });

  it('should render the components default state', () => {
    setup({ isCalcMenuOpen: false });
    render(<CalculationLinkMobile position={PositionInLayout.Header} />);

    expect(screen.queryByTestId('mobile-calculation-menu')).not.toBeInTheDocument();
    expect(screen.queryByTestId('price-calculator-mobile')).not.toBeInTheDocument();
  });

  it('should call toggleCalcMenu when the position is in the Footer and the button is clicked', async () => {
    setup({ isCalcMenuOpen: false });
    const { rerender } = render(<CalculationLinkMobile position={PositionInLayout.Footer} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockToggleCalcMenu).toHaveBeenCalled();

    setup({ isCalcMenuOpen: true });

    rerender(<CalculationLinkMobile position={PositionInLayout.Footer} />);

    await waitFor(
      () => {
        expect(screen.queryByTestId('mobile-calculation-menu')).toBeInTheDocument();
        expect(screen.queryByTestId('price-calculator-mobile')).toBeInTheDocument();
      },
      { timeout: 2000 },
    );
  });

  it('should call changeMenuContent when the position is in the Header, isNavMenuOpen is true, and the button is clicked', async () => {
    setup({ isNavMenuOpen: true, showCalculationMenu: false });
    const { rerender } = render(<CalculationLinkMobile position={PositionInLayout.Header} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockChangeMenuContent).toHaveBeenCalled();

    setup({ showCalculationMenu: true });

    rerender(<CalculationLinkMobile position={PositionInLayout.Header} />);

    await waitFor(() => {
      expect(screen.queryByTestId('mobile-calculation-menu')).toBeInTheDocument();
      expect(screen.queryByTestId('price-calculator-mobile')).toBeInTheDocument();
    });
  });
});
