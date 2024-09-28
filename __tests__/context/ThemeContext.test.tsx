/* eslint-disable jest/no-conditional-expect */
import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeVariants } from 'types';
import { ThemeProvider, useTheme } from 'context';
import { getPreference, setPreference } from 'helpers';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <div data-testid='theme-display'>{theme}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

jest.mock('helpers', () => ({
  getPreference: jest.fn(),
  setPreference: jest.fn(),
}));

describe('ThemeProvider', () => {
  const mockGetPreference = getPreference as jest.Mock;
  const mockSetPreference = setPreference as jest.Mock;

  const renderWithProvider = (
    storageKey: string,
    storedTheme: ThemeVariants | undefined,
    startTheme?: ThemeVariants,
  ) => {
    mockGetPreference.mockReturnValue(storedTheme);

    return render(
      <ThemeProvider
        storageKey={storageKey}
        startTheme={startTheme}
      >
        <TestComponent />
      </ThemeProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    [ThemeVariants.LIGHT, undefined, ThemeVariants.LIGHT, true],
    [ThemeVariants.DARK, ThemeVariants.LIGHT, ThemeVariants.LIGHT, false],
    [ThemeVariants.DARK, undefined, ThemeVariants.DARK, true],
    [undefined, undefined, ThemeVariants.LIGHT, true],
  ])(
    'should initialise with the correct theme (getPreference return: %s, startTheme: %s, expected theme: %s, getPreference called: %s',
    (mockReturnValue, startTheme, expectedTheme, getPreferenceCalled) => {
      renderWithProvider('test-theme', mockReturnValue, startTheme);

      expect(screen.getByTestId('theme-display')).toHaveTextContent(expectedTheme);

      if (getPreferenceCalled) {
        expect(mockGetPreference).toHaveBeenCalledWith('test-theme');
      } else {
        expect(mockGetPreference).not.toHaveBeenCalled();
      }
    },
  );

  it('should toggle theme correctly', () => {
    renderWithProvider('test-theme', ThemeVariants.LIGHT);

    expect(screen.getByTestId('theme-display')).toHaveTextContent(ThemeVariants.LIGHT);

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme-display')).toHaveTextContent(ThemeVariants.DARK);

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme-display')).toHaveTextContent(ThemeVariants.LIGHT);
  });

  it('should call setPreference on theme change', () => {
    renderWithProvider('test-theme', ThemeVariants.LIGHT);

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(mockSetPreference).toHaveBeenCalledWith('test-theme', ThemeVariants.DARK);

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(mockSetPreference).toHaveBeenCalledWith('test-theme', ThemeVariants.LIGHT);
  });

  it('should handle undefined theme values gracefully', () => {
    renderWithProvider('test-theme', undefined);

    expect(screen.getByTestId('theme-display')).toHaveTextContent(ThemeVariants.LIGHT);

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme-display')).toHaveTextContent(ThemeVariants.DARK);
  });

  it('should not update theme when startTheme changes after initialisation', () => {
    const { rerender } = renderWithProvider('test-theme', ThemeVariants.LIGHT, ThemeVariants.LIGHT);

    expect(screen.getByTestId('theme-display')).toHaveTextContent(ThemeVariants.LIGHT);

    rerender(
      <ThemeProvider
        storageKey='test-theme'
        startTheme={ThemeVariants.DARK}
      >
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-display')).toHaveTextContent(ThemeVariants.LIGHT);
  });

  it('should throw an error when useTheme is used outside of ThemeProvider', () => {
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => render(<TestComponent />)).toThrow('useTheme must be used within a ThemeProvider');

    console.error = originalError;
  });
});
