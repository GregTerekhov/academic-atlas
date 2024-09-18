import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { AriaCurrent, PositionInLayout } from 'types';
import { useActiveLink } from 'context';
import { getFooterLinks } from 'data';
import { getMenuAriaCurrent } from 'helpers';

import { FooterMenu } from 'components';
import { CalculationLinkMobile } from 'components/layout/subcomponents';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('context', () => ({
  useActiveLink: jest.fn(),
}));

jest.mock('data', () => ({
  getFooterLinks: jest.fn(),
}));

jest.mock('helpers', () => ({
  getMenuAriaCurrent: jest.fn(),
  mapArray: jest.fn((arrayData, mapFunction) => arrayData.map(mapFunction)),
}));

jest.mock('components/layout/subcomponents', () => ({
  CalculationLinkDesktop: jest.fn(() => <div data-testid='link-desktop'></div>),
  CalculationLinkMobile: jest.fn(() => <div data-testid='link-mobile'></div>),
}));

describe('FooterMenu Component', () => {
  const mockFooterLinks = [
    { id: 'home', path: '/', label: 'Головна' },
    { id: 'about', path: '/about', label: 'Про нас' },
  ];
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseActiveLink = useActiveLink as jest.Mock;
  const mockGetFooterLinks = getFooterLinks as jest.Mock;
  const mockGetMenuAriaCurrent = getMenuAriaCurrent as jest.Mock;
  const mockHandleActivateLink = jest.fn();

  const setupMocks = () => {
    mockUsePathname.mockReturnValue('/');
    mockUseActiveLink.mockReturnValue({ handleActivateLink: mockHandleActivateLink });
    mockGetFooterLinks.mockReturnValue(mockFooterLinks);
    mockGetMenuAriaCurrent.mockReturnValue(AriaCurrent.Page);

    render(<FooterMenu />);
  };

  beforeEach(() => {
    setupMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    expect(screen.getByTestId('link-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('link-mobile')).toBeInTheDocument();
  });

  it('renders the correct footer links and styles', () => {
    mockFooterLinks.forEach(({ label }) => {
      const linkElement = screen.getByText(label);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveClass('generalText');
    });
  });

  it('should call handleActivateLink on link click', () => {
    const homeLink = screen.getByText('Головна');

    fireEvent.click(homeLink);

    expect(mockHandleActivateLink).toHaveBeenCalledWith('/');
  });

  it('sets aria-current attribute correctly', () => {
    const homeLink = screen.getByText('Головна');

    expect(homeLink).toHaveAttribute('aria-current', AriaCurrent.Page);
  });

  it('renders CalculationLinkMobile with correct position prop', () => {
    expect(CalculationLinkMobile).toHaveBeenCalledWith(
      expect.objectContaining({
        position: PositionInLayout.Footer,
      }),
      {},
    );
  });
});
