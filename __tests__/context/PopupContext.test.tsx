import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef, ReactNode } from 'react';

import { CalculationProvider } from 'context/CalculationProvider';
import { CalculationResultProvider } from 'context/CalculationResultProvider';
import { usePopup, PopupProvider } from 'context/PopupProvider';

jest.mock('context/PopupProvider', () => {
  const actual = jest.requireActual('context/PopupProvider');
  return {
    __esModule: true,
    ...actual,
    usePopup: jest.fn(),
  };
});

const mockUsePopup = usePopup as jest.Mock;
const mockSetBodyOverflow = jest.fn((isHidden: boolean) => {
  document.body.style.overflow = isHidden ? 'hidden' : 'auto';
});
const mockResetValues = jest.fn(() => {
  mockResetCalculation();
  mockHandleResetCostResult();
});
const mockTogglePopup = jest.fn((id: string) => {
  const newOpenState = !mockOpenPopups[id];
  mockOpenPopups = { ...mockOpenPopups, [id]: newOpenState };

  mockSetBodyOverflow(newOpenState);

  if (!newOpenState) {
    mockResetValues();
  }
});
const mockClosePopup = jest.fn((id: string) => {
  mockOpenPopups = { ...mockOpenPopups, [id]: false };

  mockSetBodyOverflow(false);
  mockResetValues();
});
// const mockResetValues = jest.fn();
// const mockTogglePopup = jest.fn();
// const mockClosePopup = jest.fn();
let mockOpenPopups: { [key: string]: boolean } = { 'test-popup': false };
const mockIsPopupOpen = jest.fn((key: string) => !!mockOpenPopups[key]);

const mockResetCalculation = jest.fn();
const mockHandleResetCostResult = jest.fn();

mockUsePopup.mockReturnValue({
  isPopupOpen: mockIsPopupOpen,
  togglePopup: mockTogglePopup,
  closePopup: mockClosePopup,
  setBodyOverflow: mockSetBodyOverflow,
  resetValues: mockResetValues,
  popupRefs: { current: {} },
  openPopups: mockOpenPopups,
});

const MockPopupContext = () => {
  const {
    isPopupOpen,
    togglePopup,
    closePopup,
    setBodyOverflow,
    resetValues,
    popupRefs,
    openPopups,
  } = usePopup();

  return (
    <div>
      <div data-testid='popup-status'>
        {Object.keys(openPopups).map((key) => (
          <div
            key={key}
            data-testid={`popup-${key}`}
          >
            {key}: {isPopupOpen(key) ? 'Open' : 'Closed'}
          </div>
        ))}
      </div>
      <button onClick={() => togglePopup('test-popup')}>Toggle Popup</button>
      <button onClick={() => closePopup('test-popup')}>Close Popup</button>
      <button onClick={() => setBodyOverflow(true)}>Set Body Overflow Hidden</button>
      <button onClick={() => setBodyOverflow(false)}>Reset Body Overflow</button>
      <button onClick={resetValues}>Reset Values</button>

      <div data-testid='popup-refs'>
        {Object.keys(popupRefs.current).map((key) => (
          <div
            key={key}
            data-testid={`popup-ref-${key}`}
          >
            {key}: {popupRefs.current[key]?.current ? 'Exists' : 'Does not exist'}
          </div>
        ))}
      </div>
    </div>
  );
};

const Wrapper = ({ children }: { children: ReactNode }) => (
  <CalculationProvider>
    <CalculationResultProvider>
      <PopupProvider>{children}</PopupProvider>
    </CalculationResultProvider>
  </CalculationProvider>
);

describe('PopupProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockOpenPopups = { 'test-popup': false };
  });

  it('should initialise with no popups open', () => {
    render(<MockPopupContext />, { wrapper: Wrapper });

    expect(screen.getByTestId('popup-status')).toHaveTextContent('test-popup: Closed');
  });

  it('should call setBodyOverflow and reset when toggling popup', async () => {
    // mockTogglePopup.mockImplementation((id: string) => {
    //   const newOpenState = !mockOpenPopups[id];
    //   mockOpenPopups = { ...mockOpenPopups, [id]: newOpenState };

    //   mockSetBodyOverflow(newOpenState);
    //   if (newOpenState) {
    //     mockResetValues();
    //   }
    // });

    // mockClosePopup.mockImplementation((id: string) => {
    //   mockOpenPopups = { ...mockOpenPopups, [id]: false };

    //   mockSetBodyOverflow(false);
    // });

    const { rerender } = render(<MockPopupContext />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Toggle Popup'));
    expect(mockTogglePopup).toHaveBeenCalledWith('test-popup');
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(true);
    expect(mockResetValues).not.toHaveBeenCalled();

    mockOpenPopups = { 'test-popup': true };
    rerender(<MockPopupContext />);

    await waitFor(() =>
      expect(screen.getByTestId('popup-status')).toHaveTextContent('test-popup: Open'),
    );

    fireEvent.click(screen.getByText('Close Popup'));
    expect(mockClosePopup).toHaveBeenCalledWith('test-popup');
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(false);
    expect(mockResetValues).toHaveBeenCalled();

    mockOpenPopups = { 'test-popup': false };
    rerender(<MockPopupContext />);

    await waitFor(() => {
      expect(screen.getByTestId('popup-status')).toHaveTextContent('test-popup: Closed');
    });
  });

  it('should call setBodyOverflow and not call resetValues when opening popup, but call resetValues when closing', async () => {
    const { rerender } = render(<MockPopupContext />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Toggle Popup'));
    expect(mockTogglePopup).toHaveBeenCalledWith('test-popup');
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(true);
    expect(mockResetValues).not.toHaveBeenCalled();

    mockOpenPopups = { 'test-popup': true };
    rerender(<MockPopupContext />);

    await waitFor(() =>
      expect(screen.getByTestId('popup-status')).toHaveTextContent('test-popup: Open'),
    );

    fireEvent.click(screen.getByText('Close Popup'));
    expect(mockClosePopup).toHaveBeenCalledWith('test-popup');
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(false);
    expect(mockResetValues).toHaveBeenCalled();
  });

  it('should call resetCalculation and handleResetCostResult inside resetValues', () => {
    render(<MockPopupContext />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Reset Values'));
    expect(mockResetValues).toHaveBeenCalled();
    expect(mockResetCalculation).toHaveBeenCalled();
    expect(mockHandleResetCostResult).toHaveBeenCalled();
  });

  it('should correctly handle non-existing popups in isPopupOpen', () => {
    render(<MockPopupContext />, { wrapper: Wrapper });

    expect(mockIsPopupOpen('non-existing-popup')).toBe(false);
    expect(screen.queryByTestId('popup-non-existing-popup')).not.toBeInTheDocument();
  });

  it('should correctly update body overflow style when setBodyOverflow is called', () => {
    render(<MockPopupContext />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Set Body Overflow Hidden'));
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(screen.getByText('Reset Body Overflow'));
    expect(document.body.style.overflow).toBe('auto');
  });

  it('should handle popupRefs correctly', () => {
    const { rerender } = render(<MockPopupContext />, { wrapper: Wrapper });

    const popupRefKey = 'test-popup';
    const testRef = createRef<HTMLDivElement>();

    mockUsePopup.mockReturnValue({
      ...mockUsePopup(),
      popupRefs: { current: { [popupRefKey]: testRef } },
    });

    rerender(<MockPopupContext />);

    expect(screen.getByTestId(`popup-ref-${popupRefKey}`)).toHaveTextContent(
      `${popupRefKey}: ${testRef.current ? 'Exists' : 'Does not exist'}`,
    );
  });

  it('should throw error when usePopup is used outside of PopupProvider', () => {
    mockUsePopup.mockImplementation(() => {
      const actual = jest.requireActual('context/PopupProvider');
      return actual.usePopup();
    });

    expect(() =>
      render(<MockPopupContext />, { wrapper: ({ children }) => <>{children}</> }),
    ).toThrow('usePopup must be used within a PopupProvider');
  });
});
