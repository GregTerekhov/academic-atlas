import { render, screen, fireEvent } from '@testing-library/react';

import { useMenu, useActiveLink } from 'context';
import { Paths, PositionInLayout, AriaLabel, AriaDescription } from 'types';
import { usePathname } from 'next/navigation';
import { Logo } from 'components';

jest.mock('context', () => ({
  useMenu: jest.fn(),
  useActiveLink: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockPushState = jest.fn();
const mockScrollTo = jest.fn();

describe('Logo component', () => {
  const closeMenuMock = jest.fn();
  const handleActivateLinkMock = jest.fn();
  const useMenuMock = useMenu as jest.Mock;
  const useActiveLinkMock = useActiveLink as jest.Mock;
  const usePathnameMock = usePathname as jest.Mock;

  beforeEach(() => {
    useMenuMock.mockReturnValue({
      isNavMenuOpen: false,
      isCalcMenuOpen: false,
      closeMenu: closeMenuMock,
    });
    useActiveLinkMock.mockReturnValue({
      handleActivateLink: handleActivateLinkMock,
    });
    usePathnameMock.mockReturnValue(Paths.Main);

    Object.defineProperty(window, 'history', {
      value: { pushState: mockPushState },
    });
    Object.defineProperty(window, 'scrollTo', {
      value: mockScrollTo,
    });
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo link when position is header', () => {
    render(<Logo position={PositionInLayout.Header} />);

    const logoLink = screen.getByRole('link', { name: AriaLabel.Logo });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');

    const ariaDescription = screen.getByText(AriaDescription.ComeHome);
    expect(ariaDescription).toBeInTheDocument();
  });

  it('renders the logo icon when position is not header', () => {
    render(<Logo position={PositionInLayout.Footer} />);

    const logoIcon = screen.getByLabelText(AriaLabel.Logo);
    expect(logoIcon).toBeInTheDocument();
  });

  it('prevents default behavior, pushes state, and scrolls to top if conditions are met', () => {
    render(<Logo position={PositionInLayout.Header} />);

    const logoLink = screen.getByRole('link', { name: AriaLabel.Logo });

    const preventDefaultMock = jest.fn();

    logoLink.addEventListener('click', (e) => (e.preventDefault = preventDefaultMock));

    fireEvent.click(logoLink);

    expect(preventDefaultMock).toHaveBeenCalled();

    expect(mockPushState).toHaveBeenCalledWith(null, '', '/');

    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('closes the menu if it is open', () => {
    useMenuMock.mockReturnValueOnce({
      isNavMenuOpen: true,
      isCalcMenuOpen: false,
      closeMenu: closeMenuMock,
    });

    render(<Logo position={PositionInLayout.Header} />);

    const logoLink = screen.getByRole('link', { name: AriaLabel.Logo });
    fireEvent.click(logoLink);

    expect(closeMenuMock).toHaveBeenCalled();
  });

  it('activates the link if pathname is not main', () => {
    usePathnameMock.mockReturnValueOnce('/other-page');

    render(<Logo position={PositionInLayout.Header} />);

    const logoLink = screen.getByRole('link', { name: AriaLabel.Logo });
    fireEvent.click(logoLink);

    expect(handleActivateLinkMock).toHaveBeenCalledWith(Paths.Main);
  });
});
