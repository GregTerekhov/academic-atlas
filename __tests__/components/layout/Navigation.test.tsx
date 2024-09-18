import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { AriaCurrent, AriaLabel, MenuLinks, Paths, PositionInLayout } from 'types';
import { useActiveLink } from 'context';
import { getAdaptedLinks } from 'data';
import { getMenuAriaCurrent } from 'helpers';

import Navigation from 'components/layout/subcomponents/header-navigation';
import CalculationLinkMobile from 'components/layout/subcomponents/calculation-link-mobile';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('context', () => ({
  useActiveLink: jest.fn(),
}));

jest.mock('data', () => ({
  getAdaptedLinks: jest.fn(),
}));

jest.mock('helpers', () => ({
  getMenuAriaCurrent: jest.fn(),
  mapArray: jest.fn((arrayData, mapFunction) => arrayData.map(mapFunction)),
}));

jest.mock('components/layout/subcomponents/calculation-link-mobile', () =>
  jest.fn(() => <div data-testid='link-mobile'></div>),
);

jest.mock('styles', () => ({
  getNavigationLinkStyles: jest.fn((isActive) =>
    isActive ? 'mock-active-link-styles' : 'mock-link-styles',
  ),
}));

describe('Navigation Component', () => {
  const mockHeaderLinks = [
    { id: 'home', path: '/', label: MenuLinks.Main },
    { id: 'about', path: '/#about', label: MenuLinks.AboutUs },
  ];

  const mockUsePathname = usePathname as jest.Mock;
  const mockUseActiveLink = useActiveLink as jest.Mock;
  const mockGetHeaderLinks = getAdaptedLinks as jest.Mock;
  const mockGetMenuAriaCurrent = getMenuAriaCurrent as jest.Mock;
  const mockHandleActivateLink = jest.fn();

  const setupMocks = (activePath = Paths.Main) => {
    mockUsePathname.mockReturnValue(activePath);
    mockUseActiveLink.mockReturnValue({
      activatedLink: activePath,
      handleActivateLink: mockHandleActivateLink,
    });
    mockGetHeaderLinks.mockReturnValue(mockHeaderLinks);
    mockGetMenuAriaCurrent.mockReturnValue(AriaCurrent.Page);

    render(<Navigation />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    setupMocks();
    expect(screen.getByTestId('link-mobile')).toBeInTheDocument();
  });

  it('applies correct class to active and inactive links', () => {
    setupMocks();

    const activeLink = screen.getByText(MenuLinks.Main);
    const inactiveLink = screen.getByText(MenuLinks.AboutUs);

    expect(activeLink).toHaveClass('mock-active-link-styles');
    expect(inactiveLink).toHaveClass('mock-link-styles');
  });

  it('calls handleActivateLink for each link click', () => {
    setupMocks();

    mockHeaderLinks.forEach(({ label, path }) => {
      const linkElement = screen.getByText(label);
      fireEvent.click(linkElement);

      expect(mockHandleActivateLink).toHaveBeenCalledWith(path);
    });
  });

  it('calls handleActivateLink on link click', () => {
    setupMocks();

    const homeLink = screen.getByText(MenuLinks.Main);

    fireEvent.click(homeLink);

    expect(mockHandleActivateLink).toHaveBeenCalledWith('/');
  });

  it('renders nav with correct aria-label', () => {
    setupMocks();

    const navElement = screen.getByRole('navigation');
    expect(navElement).toHaveAttribute('aria-label', AriaLabel.Navigation);
  });

  it('sets aria-current correctly for active links', () => {
    setupMocks();

    const activeLink = screen.getByText(MenuLinks.Main);

    expect(activeLink).toHaveAttribute('aria-current', AriaCurrent.Page);
  });

  it('renders CalculationLinkMobile with correct position prop', () => {
    setupMocks();

    expect(CalculationLinkMobile).toHaveBeenCalledWith(
      expect.objectContaining({
        position: PositionInLayout.Header,
      }),
      {},
    );
  });
});
