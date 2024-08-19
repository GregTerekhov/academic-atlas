import { fireEvent, render, screen } from '@testing-library/react';

import { IconName, ThemeVariants } from 'types';
import { useTheme } from 'context';
import { ThemeSwitcher } from 'components';

jest.mock('context', () => ({
  useTheme: jest.fn(),
}));

jest.mock('ui', () => ({
  SwitchUI: jest.fn(({ children, props, onClick }) => (
    <div
      data-testid='switch-button'
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )),
  SvgIconUI: jest.fn(({ ariaHidden, ariaLabel, id, props }) => (
    <svg
      id={id}
      {...props}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      data-testid='theme-switcher-icon'
    ></svg>
  )),
}));

describe('ThemeSwitcher Component', () => {
  const mockUseTheme = useTheme as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Sun icon when theme is light', () => {
    mockUseTheme.mockReturnValue({
      theme: ThemeVariants.LIGHT,
      toggleTheme: jest.fn(),
    });

    render(<ThemeSwitcher />);

    const icon = screen.getByTestId('theme-switcher-icon');
    expect(icon).toHaveAttribute('id', IconName.Sun);
  });

  it('renderrs the Moon icon when theme is dark', () => {
    mockUseTheme.mockReturnValue({
      theme: ThemeVariants.DARK,
      toggleTheme: jest.fn(),
    });

    render(<ThemeSwitcher />);

    const icon = screen.getByTestId('theme-switcher-icon');
    expect(icon).toHaveAttribute('id', IconName.Moon);
  });

  it('calls toggleTheme when the switch is clicked', () => {
    const toggleThemeMock = jest.fn();

    mockUseTheme.mockReturnValue({
      theme: ThemeVariants.LIGHT,
      toggleTheme: toggleThemeMock,
    });

    render(<ThemeSwitcher />);

    const switchButton = screen.getByTestId('switch-button');
    fireEvent.click(switchButton);

    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
