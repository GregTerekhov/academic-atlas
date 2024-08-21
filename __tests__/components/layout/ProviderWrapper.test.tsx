import { render, screen } from '@testing-library/react';

import { ThemeProvider } from 'context';
import { ProviderWrapper } from 'components';

jest.mock('context', () => ({
  ThemeProvider: jest.fn(({ children }) => <div>{children}</div>),
  CalculationProvider: jest.fn(({ children }) => <div>{children}</div>),
  CalculationResultProvider: jest.fn(({ children }) => <div>{children}</div>),
  MenuProvider: jest.fn(({ children }) => <div>{children}</div>),
  PopupProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

describe('ProviderWrapper', () => {
  const TestChild = () => <div data-testid='child-providers'>Test Child</div>;

  beforeEach(() => {
    jest.clearAllMocks();

    const theme = 'dark';
    const storageKey = 'themeKey';

    render(
      <ProviderWrapper
        theme={theme}
        storageKey={storageKey}
      >
        <TestChild />
      </ProviderWrapper>,
    );
  });

  it('renders the child component within the providers', () => {
    const childElement = screen.getByTestId('child-providers');
    expect(childElement).toBeInTheDocument();
  });

  it('passes the correct props to ThemeProvider', () => {
    const theme = 'dark';
    const storageKey = 'themeKey';

    expect(ThemeProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        storageKey,
        startTheme: theme,
      }),
      {},
    );
    expect.anything();
  });
});
