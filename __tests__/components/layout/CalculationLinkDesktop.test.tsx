/* eslint-disable jest/no-conditional-expect */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';

import { AriaLabel, ButtonType, MenuLinks, PopupID } from 'types';
import { useCalculationResult } from 'context';
import { usePricePopupControls } from 'hooks';
import CalculationLinkDesktop from 'components/layout/subcomponents/calculation-link-desktop';

jest.mock('context', () => ({
  useCalculationResult: jest.fn(),
}));

jest.mock('hooks', () => ({
  usePricePopupControls: jest.fn(),
}));

jest.mock('template', () => ({
  ModalTemplate: jest.fn(({ children, isOpen, id, closeModal }) => {
    if (isOpen(id)) {
      closeModal();
      return <div data-testid='desktop-calculation-link-popup'>{children}</div>;
    }
    return null;
  }),
}));

jest.mock('components/calculation/product-price-calculator', () =>
  jest.fn(() => <div data-testid='price-calculator' />),
);

describe('CalculationLinkDesktop Component', () => {
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

  const renderLink = () => render(<CalculationLinkDesktop />);

  const clickButtonAndTogglePopup = (isOpen: boolean) => {
    const button = screen.getByText(MenuLinks.Cost);
    fireEvent.click(button);
    expect(togglePopupMock).toHaveBeenCalledWith(PopupID.CostSection);
    togglePopup(isOpen);
  };

  beforeEach(() => {
    setupMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render button with correct attributes and styles', () => {
    renderLink();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(MenuLinks.Cost);
    expect(button).toHaveAttribute('aria-label', AriaLabel.CalculationModule);
    expect(button).toHaveAttribute('type', ButtonType.Button);
    expect(button).toHaveClass(
      'hidden hocus:text-accentPrimary dark:text-whiteBase dark:hocus:text-accentSecondary',
    );
  });

  it.each([
    { isOpen: true, shouldRender: true },
    { isOpen: false, shouldRender: false },
  ])(
    'should handle popup and ModalTemplate rendering correctly when togglePopup is called',
    async ({ isOpen, shouldRender }) => {
      const { rerender } = renderLink();

      clickButtonAndTogglePopup(isOpen);
      rerender(<CalculationLinkDesktop />);

      await waitFor(() => {
        const modal = screen.queryByTestId('desktop-calculation-link-popup');
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
