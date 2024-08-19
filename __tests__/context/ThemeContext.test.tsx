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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialise with the correct theme', () => {
    mockGetPreference.mockReturnValue(ThemeVariants.LIGHT);

    render(
      <ThemeProvider storageKey='test-theme'>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-display')).toHaveTextContent(ThemeVariants.LIGHT);
  });

  it('should toggle theme correctly', () => {
    mockGetPreference.mockReturnValue(ThemeVariants.LIGHT);

    render(
      <ThemeProvider storageKey='test-theme'>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId('theme-display')).toHaveTextContent(ThemeVariants.LIGHT);

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme-display')).toHaveTextContent(ThemeVariants.DARK);

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByTestId('theme-display')).toHaveTextContent(ThemeVariants.LIGHT);
  });

  it('should call setPreference on theme change', () => {
    mockGetPreference.mockReturnValue(ThemeVariants.LIGHT);

    render(
      <ThemeProvider storageKey='test-theme'>
        <TestComponent />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(mockSetPreference).toHaveBeenCalledWith('test-theme', ThemeVariants.DARK);

    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(mockSetPreference).toHaveBeenCalledWith('test-theme', ThemeVariants.LIGHT);
  });
});

//FIXME: add test for using useTheme without ThemeProvider
