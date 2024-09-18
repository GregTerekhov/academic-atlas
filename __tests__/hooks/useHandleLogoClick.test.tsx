import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { Paths } from 'types';
import { useActiveLink, useMenu } from 'context';
import { useScrollResetTimeout } from 'hooks/useScrollResetTimeout';
import { LogoLink } from 'components/layout/subcomponents';

jest.mock('context', () => ({
  useMenu: jest.fn(),
  useActiveLink: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('hooks/useScrollResetTimeout', () => ({
  useScrollResetTimeout: jest.fn(),
}));

describe('useHandleLogoClick hook', () => {
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseMenu = useMenu as jest.Mock;
  const mockUseActiveLink = useActiveLink as jest.Mock;
  const mockUseScrollResetTimeout = useScrollResetTimeout as jest.Mock;

  const mockCloseMenu = jest.fn();
  const mockUpdateActiveLink = jest.fn();
  const mockStartTimeout = jest.fn();
  const mockScrollValue = jest.fn();

  const setupMocks = (path = Paths.Main, isOpen = false, scrollY = 0) => {
    mockUsePathname.mockReturnValue(path);
    mockUseMenu.mockReturnValue({
      isNavMenuOpen: isOpen,
      isCalcMenuOpen: false,
      closeMenu: mockCloseMenu,
    });
    mockUseActiveLink.mockReturnValue({
      updateActiveLink: mockUpdateActiveLink,
      updateScrollWithButtonState: jest.fn(),
    });
    mockUseScrollResetTimeout.mockReturnValue(mockStartTimeout);

    Object.defineProperty(window, 'scrollY', {
      value: scrollY,
      writable: true,
    });
  };

  const fireClickEvent = (element: HTMLElement) => {
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

    fireEvent(element, clickEvent);

    return clickEvent;
  };

  beforeAll(() => {
    Object.defineProperty(window, 'scrollTo', {
      value: mockScrollValue,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('scrolls to top and closes menu when link is clicked and scroll is needed', () => {
    setupMocks(Paths.Main, true, 100);

    render(<LogoLink />);

    const logoLink = screen.getByRole('link');
    fireClickEvent(logoLink);

    expect(mockScrollValue).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
    expect(mockStartTimeout).toHaveBeenCalled();
    expect(mockCloseMenu).toHaveBeenCalled();
  });

  it('does not scroll if window.scrollY is 0', () => {
    setupMocks(Paths.Main, true, 0);

    render(<LogoLink />);

    const logoLink = screen.getByRole('link');
    fireClickEvent(logoLink);

    expect(mockScrollValue).not.toHaveBeenCalled();
    expect(mockCloseMenu).toHaveBeenCalled();
  });

  it('prevents default navigation when scroll is needed', () => {
    setupMocks(Paths.Main, true, 100);

    render(<LogoLink />);

    const logoLink = screen.getByRole('link');
    const clickEvent = fireClickEvent(logoLink);

    fireEvent(logoLink, clickEvent);

    expect(clickEvent.defaultPrevented).toBe(true);
    expect(mockCloseMenu).toHaveBeenCalled();
  });

  it('calls updateActiveLink when pathname is not Main', () => {
    setupMocks(Paths.Offer);

    render(<LogoLink />);

    const logoLink = screen.getByRole('link');
    fireClickEvent(logoLink);

    expect(mockUpdateActiveLink).toHaveBeenCalledWith(Paths.Main);
  });

  it('does not prevent default if scroll is not needed', () => {
    setupMocks(Paths.Main, false, 0);

    render(<LogoLink />);

    const logoLink = screen.getByRole('link');
    const clickEvent = fireClickEvent(logoLink);

    fireEvent(logoLink, clickEvent);

    expect(clickEvent.defaultPrevented).toBe(false);
  });
});
