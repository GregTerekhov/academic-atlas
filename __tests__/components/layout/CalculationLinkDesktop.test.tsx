import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { AriaLabel, MenuLinks, PopupID } from 'types';
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
  ModalTemplate: jest.fn(({ children, isOpen, id }) =>
    isOpen(id) ? <div data-testid='desktop-calculation-link-popup'>{children}</div> : null,
  ),
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
    current: { [PopupID.CostSection]: { current: document.createElement('div') } },
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

    render(<CalculationLinkDesktop />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render button with correct text', () => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(MenuLinks.Cost);
    expect(button).toHaveAttribute('aria-label', AriaLabel.CalculationModule);
  });

  it('should open popup when togglePopup is called', () => {
    const button = screen.getByRole('button');

    fireEvent.click(button);
    screen.debug();
    expect(togglePopupMock).toHaveBeenCalledWith(PopupID.CostSection);
  });

  it('should render ModalTemplate with PriceCalculator content when the popup is open', async () => {
    mockUsePricePopupControls.mockReturnValueOnce(true);

    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(togglePopupMock).toHaveBeenCalledWith(PopupID.CostSection);

    await waitFor(() => {
      const modal = screen.queryByTestId('desktop-calculation-link-popup');
      expect(modal).toBeInTheDocument();

      const priceCalculator = screen.queryByTestId('price-calculator');
      expect(priceCalculator).toBeInTheDocument();
    });
  });

  it('should not render ModalTemplate when the popup is closed', () => {
    isPopupOpenMock.mockReturnValue(false);

    const modal = screen.queryByTestId('desktop-calculation-link-popup');
    expect(modal).toBeNull();
  });
});
