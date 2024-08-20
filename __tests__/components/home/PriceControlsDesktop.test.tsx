import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';

import { AriaDescription, AriaId, PopupID, PrimaryButtonLabel } from 'types';
import { useCalculationResult } from 'context';
import { usePricePopupControls } from 'hooks';
import { PriceControlsDesktop } from 'components/home/subcomponents';

jest.mock('context', () => ({
  useCalculationResult: jest.fn(),
}));

jest.mock('hooks', () => ({
  usePricePopupControls: jest.fn(),
}));

jest.mock('template', () => ({
  ModalTemplate: jest.fn(({ children, isOpen, id }) =>
    isOpen(id) ? <div data-testid='desktop-price-controls-popup'>{children}</div> : null,
  ),
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
  jest.fn(() => <div data-testid='price-calculator' />),
);

describe('PriceControlsDesktop Component', () => {
  const mockUseCalculationResult = useCalculationResult as jest.Mock;
  const mockUsePricePopupControls = usePricePopupControls as jest.Mock;
  const togglePopupMock = jest.fn();
  const mockOpenPopups: { [key: string]: boolean } = { [PopupID.CostSection]: false };
  const isPopupOpenMock = jest.fn((key: string) => !!mockOpenPopups[key]);
  const popupRefsMock = {
    current: { [PopupID.CostSection]: createRef<HTMLDivElement>() },
  };

  beforeEach(() => {
    mockUseCalculationResult.mockReturnValue({ hasSubmitData: false });
    mockUsePricePopupControls.mockReturnValue({
      popupId: PopupID.CostSection,
      popupRefs: popupRefsMock,
      togglePopup: togglePopupMock,
      isPopupOpen: isPopupOpenMock,
      openPopups: mockOpenPopups,
    });

    jest.clearAllMocks();
  });

  it('should render button with correct attributes and styles', () => {
    render(<PriceControlsDesktop />);

    const button = screen.getByRole('button', { name: PrimaryButtonLabel.CostCalculation });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-describedby', AriaId.CalculationModule);
    expect(button).toHaveClass('h-16');

    const ariaDescriptionElement = screen.getByTestId('aria-description-text');
    expect(ariaDescriptionElement).toHaveAttribute('id', AriaId.CalculationModule);
    expect(ariaDescriptionElement).toHaveTextContent(AriaDescription.CalculationModule);
  });

  it('should open popup when togglePopup is called', () => {
    render(<PriceControlsDesktop />);

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(togglePopupMock).toHaveBeenCalledWith(PopupID.CostSection);
  });

  it('should render ModalTemplate with PriceCalculator content when the popup is open', async () => {
    const { rerender } = render(<PriceControlsDesktop />);

    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(togglePopupMock).toHaveBeenCalledWith(PopupID.CostSection);

    act(() => {
      mockOpenPopups[PopupID.CostSection] = true;
      isPopupOpenMock.mockReturnValue(true);
    });

    rerender(<PriceControlsDesktop />);

    await waitFor(() => {
      const modal = screen.queryByTestId('desktop-price-controls-popup');
      expect(modal).toBeInTheDocument();
      const priceCalculator = screen.queryByTestId('price-calculator');
      expect(priceCalculator).toBeInTheDocument();
    });
  });

  it('should not render ModalTemplate when the popup is closed', async () => {
    const { rerender } = render(<PriceControlsDesktop />);

    act(() => {
      mockOpenPopups[PopupID.CostSection] = false;
      isPopupOpenMock.mockReturnValue(false);
    });

    rerender(<PriceControlsDesktop />);

    await waitFor(() => {
      const modal = screen.queryByTestId('desktop-price-controls-popup');
      expect(modal).toBeNull();
    });
  });
});
