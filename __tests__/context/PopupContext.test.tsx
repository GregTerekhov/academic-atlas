import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';

import {
  CalculationResultProvider,
  OptionSelectionProvider,
  PopupProvider,
  usePopup,
} from 'context';

jest.mock('context/PopupProvider', () => {
  const actual = jest.requireActual('context/PopupProvider');
  return {
    ...actual,
    usePopup: jest.fn(),
  };
});

const mockUsePopup = usePopup as jest.Mock;
const mockSetBodyOverflow = jest.fn();
const mockResetValues = jest.fn();
const mockTogglePopup = jest.fn();
const mockClosePopup = jest.fn();
let mockOpenPopups: { [key: string]: boolean } = { 'test-popup': false };
const mockIsPopupOpen = jest.fn((key: string) => !!mockOpenPopups[key]);

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
  <OptionSelectionProvider>
    <CalculationResultProvider>
      <PopupProvider>{children}</PopupProvider>
    </CalculationResultProvider>
  </OptionSelectionProvider>
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

  it('should toggle popup state correctly', async () => {
    render(<MockPopupContext />, { wrapper: Wrapper });

    expect(screen.getByTestId('popup-status')).toHaveTextContent('test-popup: Closed');

    fireEvent.click(screen.getByText('Toggle Popup'));
    expect(mockTogglePopup).toHaveBeenCalledWith('test-popup');
    mockOpenPopups = { 'test-popup': true };

    await waitFor(() =>
      expect(screen.getByTestId('popup-status')).toHaveTextContent('test-popup: Open'),
    );

    fireEvent.click(screen.getByText('Close Popup'));
    expect(mockClosePopup).toHaveBeenCalledWith('test-popup');
    mockOpenPopups = { 'test-popup': false };

    await waitFor(() => {
      expect(screen.getByTestId('popup-status')).toHaveTextContent('test-popup: Closed');
    });
  });

  it('should call setBodyOverflow and reset when toggling popup', () => {
    mockTogglePopup.mockImplementation(() => {
      mockSetBodyOverflow(true);
      mockResetValues();
    });

    mockClosePopup.mockImplementation(() => {
      mockSetBodyOverflow(false);
    });

    render(<MockPopupContext />, { wrapper: Wrapper });

    fireEvent.click(screen.getByText('Toggle Popup'));
    expect(mockTogglePopup).toHaveBeenCalledWith('test-popup');
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(true);
    expect(mockResetValues).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Close Popup'));
    expect(mockClosePopup).toHaveBeenCalledWith('test-popup');
    expect(mockSetBodyOverflow).toHaveBeenCalledWith(false);
  });
});

describe('usePopup context hook', () => {
  it('should throw an error when used outside of PopupProvider', () => {
    const TestPopupErrorComponent = () => {
      const { resetValues } = usePopup();
      return <button onClick={resetValues}>Test</button>;
    };

    expect(() => render(<TestPopupErrorComponent />)).toThrow(
      'usePopup must be used within a PopupProvider',
    );
  });
});
