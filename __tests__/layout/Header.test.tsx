import { render, screen } from '@testing-library/react';
import { Header } from 'layout';
import { getHeaderStyles } from 'styles/layouts';

jest.mock('components', () => ({
  Logo: jest.fn(({ position }) => <div>Logo - {position}</div>),
  Menu: jest.fn(() => <div>Menu</div>),
  ThemeSwitcher: jest.fn(() => <div>ThemeSwitcher</div>),
  Contacts: jest.fn(({ variant }) => <div>Contacts - {variant}</div>),
  ToggleMenuTrigger: jest.fn(() => <div>ToggleMenuTrigger</div>),
}));

jest.mock('styles', () => ({
  getHeaderStyles: jest.fn(
    () =>
      'fixed left-0 top-0 z-30 max-h-20 w-screen border-b-[0.5px] border-accentPrimary bg-whiteBase bg-background-light-gradient py-2 dark:bg-background-dark-gradient md:max-h-24 md:py-4 lg:max-h-28',
  ),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all components with correct styles', () => {
    render(<Header />);

    const headerClass = getHeaderStyles();

    const headerElement = screen.getByRole('banner');

    expect(headerElement).toHaveClass(headerClass);

    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Logo - header')).toBeInTheDocument();
    expect(screen.getByText('ToggleMenuTrigger')).toBeInTheDocument();

    const themeSwitchers = screen.getAllByText('ThemeSwitcher');
    expect(themeSwitchers).toHaveLength(2);
    themeSwitchers.forEach((switcher) => {
      expect(switcher).toBeInTheDocument();
    });
    expect(screen.getByText('Contacts - header')).toBeVisible();
  });
});
