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

  const setup = (theme: ThemeVariants, toggleThemeMock: jest.Mock = jest.fn()) => {
    mockUseTheme.mockReturnValue({
      theme,
      toggleTheme: toggleThemeMock,
    });

    render(<ThemeSwitcher />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    [ThemeVariants.LIGHT, IconName.Sun],
    [ThemeVariants.DARK, IconName.Moon],
  ])('renders the correct icon for theme %s', (theme, expectedIconId) => {
    setup(theme);

    const icon = screen.getByTestId('theme-switcher-icon');
    expect(icon).toHaveAttribute('id', expectedIconId);
  });

  it('calls toggleTheme when the switch is clicked', () => {
    const toggleThemeMock = jest.fn();

    setup(ThemeVariants.LIGHT, toggleThemeMock);

    const switchButton = screen.getByTestId('switch-button');
    fireEvent.click(switchButton);

    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
