import { fireEvent, render, screen } from '@testing-library/react';

import {
  AriaDescription,
  AriaId,
  CalculationTitle,
  ExecutionTime,
  ExpertiseArea,
  IWithChildren,
  PrimaryButtonLabel,
  Uniqueness,
  WorkType,
} from 'types';
import { CalculationProvider, PopupProvider } from 'context';
import {
  useButtonDisabled,
  useCalculationState,
  useDropdownList,
  usePlagiarismCheck,
  usePricePopupControls,
} from 'hooks';

import { PriceControlsDesktop } from 'components/home/subcomponents';

interface IPrimaryButtonProps extends IWithChildren {
  ariaDescription: AriaDescription;
  ariaId: AriaId;
  handleClick?: () => void;
  isDisabled?: boolean;
  isOnLightBackground?: boolean;
}

jest.mock('hooks', () => ({
  usePricePopupControls: jest.fn(),
  useCalculationState: jest.fn(() => ({
    calculationData: {
      workType: WorkType.Default,
      expertiseArea: ExpertiseArea.Default,
      executionTime: ExecutionTime.Default,
      uniqueness: Uniqueness.Zero,
      theme: '',
    },
    handleOptionChange: jest.fn(),
    handleThemeChange: jest.fn(),
    handleRangeChange: jest.fn(),
    resetCalculation: jest.fn(),
  })),
  usePlagiarismCheck: jest.fn(),
  useButtonDisabled: jest.fn(),
  useDropdownList: jest.fn(),
  useRangeValue: jest.fn(() => ({
    rangeValue: Uniqueness.Zero,
    updateRangeValue: jest.fn(),
    handleClearRangeValue: jest.fn(),
  })),
}));

jest.mock('ui', () => ({
  PrimaryButtonUI: jest.fn(
    ({ handleClick, ariaId, ariaDescription, children }: IPrimaryButtonProps) => (
      <>
        <button
          data-testid='price-controls-desktop'
          onClick={handleClick}
          aria-describedby={ariaId}
        >
          {children}
        </button>
        <span className='sr-only'>{ariaDescription}</span>
      </>
    ),
  ),
}));

jest.mock('template', () => ({
  ModalTemplate: jest.fn(({ isOpen, children }) => (
    <div
      data-testid='modal-template'
      className={isOpen ? 'is-open-class' : ''}
    >
      {children}
    </div>
  )),
}));

describe('PriceControlsDesktop', () => {
  const mockTogglePopup = jest.fn();
  const mockIsPopupOpen = jest.fn();
  const mockUseCalculationState = useCalculationState as jest.Mock;
  const mockUsePlagiarismCheck = usePlagiarismCheck as jest.Mock;
  const mockUseButtonDisabled = useButtonDisabled as jest.Mock;
  const mockUseDropdownList = useDropdownList as jest.Mock;

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

    mockUsePlagiarismCheck.mockReturnValue({
      shouldPlagiarismCheck: false,
    });

    mockUseButtonDisabled.mockReturnValue({
      isButtonDisabled: true,
    });

    mockUseDropdownList.mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders PrimaryButtonUI and ModalTemplate', () => {
    const mockCalculationData = {
      workType: WorkType.Default,
      expertiseArea: ExpertiseArea.Default,
      executionTime: ExecutionTime.Default,
      uniqueness: Uniqueness.Zero,
      theme: '',
    };

    mockUseCalculationState.mockReturnValue({
      calculationData: mockCalculationData,
      handleOptionChange: jest.fn(),
      handleThemeChange: jest.fn(),
      handleRangeChange: jest.fn(),
      resetCalculation: jest.fn(),
    });

    mockIsPopupOpen.mockReturnValue(false);
    render(
      <CalculationProvider>
        <PopupProvider>
          <PriceControlsDesktop />
        </PopupProvider>
      </CalculationProvider>,
    );

    const button = screen.getByTestId('price-controls-desktop');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(PrimaryButtonLabel.CostCalculation);

    expect(screen.queryByTestId('modal-template')).toBeNull();
  });

  it('calls togglePopup when PrimaryButtonUI is clicked', () => {
    mockIsPopupOpen.mockReturnValue(false);
    render(
      <CalculationProvider>
        <PopupProvider>
          <PriceControlsDesktop />
        </PopupProvider>
      </CalculationProvider>,
    );

    const button = screen.getByTestId('price-controls-desktop');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(PrimaryButtonLabel.CostCalculation);
    fireEvent.click(button);

    expect(mockTogglePopup).toHaveBeenCalledWith('CostSection');
  });

  it('renders PriceCalculator within ModalTemplate', () => {
    mockIsPopupOpen.mockReturnValue(true);
    render(
      <CalculationProvider>
        <PopupProvider>
          <PriceControlsDesktop />
        </PopupProvider>
      </CalculationProvider>,
    );

    const modal = screen.getByTestId('modal-template');
    expect(modal).toBeInTheDocument();

    expect(modal).toContainElement(screen.getByText(CalculationTitle.CalculationForm));
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

    expect(screen.getByTestId('modal-template')).toHaveClass('is-open-class');
    expect(screen.getByTestId('modal-template')).toBeInTheDocument();

    mockIsPopupOpen.mockReturnValue(false);
    render(
      <CalculationProvider>
        <PopupProvider>
          <PriceControlsDesktop />
        </PopupProvider>
      </CalculationProvider>,
    );

    expect(screen.queryByTestId('modal-template')).toBeNull();
  });
});
