import { fireEvent, render, screen } from '@testing-library/react';

import { CalculationTitle, PrimaryButtonLabel, Uniqueness } from 'types';
import { CalculationProvider, PopupProvider } from 'context';
import { useCalculationState, usePricePopupControls } from 'hooks';

import { PriceControlsDesktop } from 'components/home/subcomponents';

jest.mock('hooks', () => ({
  usePricePopupControls: jest.fn(),
  useCalculationState: jest.fn(),
  useRangeValue: jest.fn(() => ({
    rangeValue: Uniqueness.Zero,
    updateRangeValue: jest.fn(),
    handleClearRangeValue: jest.fn(),
  })),
}));

describe('PriceControlsDesktop', () => {
  const mockTogglePopup = jest.fn();
  const mockIsPopupOpen = jest.fn();
  const mockUseCalculationState = useCalculationState as jest.Mock;

  beforeEach(() => {
    mockUseCalculationState.mockReturnValue({
      handleRangeChange: jest.fn(),
      resetCalculation: jest.fn(),
    });

    (usePricePopupControls as jest.Mock).mockReturnValue({
      popupId: 'CostSection',
      popupRefs: { current: { CostSection: { current: null } } },
      hasSubmitData: false,
      togglePopup: mockTogglePopup,
      isPopupOpen: mockIsPopupOpen,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders PrimaryButtonUI and ModalTemplate', () => {
    render(
      <CalculationProvider>
        <PopupProvider>
          <PriceControlsDesktop />
        </PopupProvider>
      </CalculationProvider>,
    );

    expect(
      screen.getByRole('button', { name: PrimaryButtonLabel.CostCalculation }),
    ).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls togglePopup when PrimaryButtonUI is clicked', () => {
    render(
      <CalculationProvider>
        <PopupProvider>
          <PriceControlsDesktop />
        </PopupProvider>
      </CalculationProvider>,
    );

    const button = screen.getByRole('button', { name: PrimaryButtonLabel.CostCalculation });
    fireEvent.click(button);

    expect(mockTogglePopup).toHaveBeenCalledWith('CostSection');
  });

  it('renders PriceCalculator within ModalTemplate', () => {
    render(
      <CalculationProvider>
        <PopupProvider>
          <PriceControlsDesktop />
        </PopupProvider>
      </CalculationProvider>,
    );

    expect(screen.getByRole('dialog')).toContainElement(
      screen.getByText(CalculationTitle.CalculationForm),
    );
  });

  it('checks if modal is open or closed based on isPopupOpen state', () => {
    mockIsPopupOpen.mockReturnValue(true);
    render(
      <CalculationProvider>
        <PopupProvider>
          <PriceControlsDesktop />
        </PopupProvider>
      </CalculationProvider>,
    );

    expect(screen.getByRole('dialog')).toHaveClass('is-open-class');

    mockIsPopupOpen.mockReturnValue(false);
    render(
      <CalculationProvider>
        <PopupProvider>
          <PriceControlsDesktop />
        </PopupProvider>
      </CalculationProvider>,
    );

    expect(screen.getByRole('dialog')).not.toHaveClass('is-open-class');
  });
});
