/* eslint-disable jest/no-conditional-expect */
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

  const setupMocks = () => {
    mockUseCalculationResult.mockReturnValue({ hasSubmitData: false });
    mockUsePricePopupControls.mockReturnValue({
      popupId: PopupID.CostSection,
      popupRefs: popupRefsMock,
      togglePopup: togglePopupMock,
      isPopupOpen: isPopupOpenMock,
      openPopups: mockOpenPopups,
    });
  };

  const togglePopup = (isOpen: boolean) => {
    act(() => {
      mockOpenPopups[PopupID.CostSection] = isOpen;
      isPopupOpenMock.mockReturnValue(isOpen);
    });
  };

  const renderComponent = () => render(<PriceControlsDesktop />);

  const clickButtonAndTogglePopup = async (isOpen: boolean) => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(togglePopupMock).toHaveBeenCalledWith(PopupID.CostSection);
    togglePopup(isOpen);
  };

  beforeEach(() => {
    setupMocks();
    jest.clearAllMocks();
  });

  it('should render button with correct attributes and styles', () => {
    renderComponent();

    const button = screen.getByRole('button', { name: PrimaryButtonLabel.CostCalculation });
    const ariaDescriptionElement = screen.getByTestId('aria-description-text');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-describedby', AriaId.CalculationModule);
    expect(button).toHaveClass('h-16');
    expect(ariaDescriptionElement).toHaveAttribute('id', AriaId.CalculationModule);
    expect(ariaDescriptionElement).toHaveTextContent(AriaDescription.CalculationModule);
  });

  it.each([
    { isOpen: true, shouldRender: true },
    { isOpen: false, shouldRender: false },
  ])(
    'should handle popup and ModalTemplate rendering correctly when togglePopup is called',
    async ({ isOpen, shouldRender }) => {
      const { rerender } = renderComponent();

      await clickButtonAndTogglePopup(isOpen);

      rerender(<PriceControlsDesktop />);

      await waitFor(() => {
        const modal = screen.queryByTestId('desktop-price-controls-popup');
        const priceCalculator = screen.queryByTestId('price-calculator');

        if (shouldRender) {
          expect(modal).toBeInTheDocument();
          expect(priceCalculator).toBeInTheDocument();
        } else {
          expect(modal).toBeNull();
          expect(priceCalculator).toBeNull();
        }

        console.info(
          `Popup is ${isOpen ? 'open' : 'closed'} and ModalTemplate ${shouldRender ? 'renders' : 'does not render'}`,
        );
      });
    },
  );
});
