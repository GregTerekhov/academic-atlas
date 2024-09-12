import { act, renderHook } from '@testing-library/react';

import { useActiveLink } from 'context';
import { useIntersectionObserver } from 'hooks';
import { useScrollController } from 'hooks/useScrollController';

jest.mock('context', () => ({
  useActiveLink: jest.fn(),
}));

jest.mock('hooks', () => ({
  useIntersectionObserver: jest.fn(),
}));

describe('useScrollController hook', () => {
  const mockUseIntersectionObserver = useIntersectionObserver as jest.Mock;
  const mockUseActiveLink = useActiveLink as jest.Mock;
  const mockUpdateScrollWithButtonState = jest.fn();

  beforeEach(() => {
    window.scrollTo = jest.fn();

    jest.clearAllMocks();

    mockUseIntersectionObserver.mockImplementation((elements, _, callback) => {
      const entries = elements.map((el: HTMLElement) => ({
        // const entries = elements.map((el: IntersectionObserverEntry) => ({
        isIntersecting: false,
        target: el,
      }));
      callback(entries);
      return {
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
      };
    });

    mockUseActiveLink.mockReturnValue({
      updateScrollWithButtonState: mockUpdateScrollWithButtonState,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should initialise refs and set isVisible to false by default', () => {
    const { result } = renderHook(() => useScrollController());

    expect(result.current.isVisible).toBe(false);
    expect(result.current.buttonRef.current).toBeNull();
  });

  it('should update isVisible based on scroll position', () => {
    const header = document.createElement('header');

    document.body.appendChild(header);
    Object.defineProperty(header, 'getBoundingClientRect', {
      value: () => ({ height: 120 }),
    });

    const { result } = renderHook(() => useScrollController());

    act(() => {
      window.scrollY = 1200;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isVisible).toBe(true);

    act(() => {
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isVisible).toBe(false);

    document.body.removeChild(header);
  });

  it('should position button as fixed by default', () => {
    jest.useFakeTimers();

    const button = document.createElement('button');
    const header = document.createElement('header');

    document.body.appendChild(header);
    Object.defineProperty(header, 'getBoundingClientRect', {
      value: () => ({ height: 120 }),
    });

    document.body.appendChild(button);

    const { result } = renderHook(() => useScrollController());

    act(() => {
      Object.defineProperty(result.current.buttonRef, 'current', {
        value: button,
        writable: true,
      });
    });

    act(() => {
      window.scrollY = 1200;
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      jest.runAllTimers();
      requestAnimationFrame(() => {
        expect(result.current.isVisible).toBe(true);
        expect(button.style.position).toBe('fixed');
        expect(button.style.bottom).toBe('16px');
      });
    });

    document.body.removeChild(header);
    document.body.removeChild(button);

    jest.useRealTimers();
  });

  it('should position button as absolute when footer is intersecting', () => {
    jest.useFakeTimers();

    const button = document.createElement('button');
    document.body.appendChild(button);

    const footer = document.createElement('footer');
    document.body.appendChild(footer);

    const { result } = renderHook(() => useScrollController());

    act(() => {
      Object.defineProperty(result.current.buttonRef, 'current', {
        value: button,
        writable: true,
      });
    });

    act(() => {
      const mockCall = mockUseIntersectionObserver.mock.calls[0];
      if (mockCall && mockCall[2]) {
        mockCall[2]([{ isIntersecting: true, target: footer }]);
      }
    });

    act(() => {
      jest.runAllTimers();
      requestAnimationFrame(() => {
        expect(button.style.position).toBe('absolute');
        expect(button.style.bottom).toBe('16px');
      });
    });

    document.body.removeChild(button);
    document.body.removeChild(footer);

    jest.useRealTimers();
  });

  it('should scroll to top when scrollTop is called', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useScrollController());

    const scrollToMock = jest.spyOn(window, 'scrollTo');

    act(() => {
      result.current.scrollToTop();
    });

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });

    expect(mockUpdateScrollWithButtonState).toHaveBeenCalledWith(true);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(mockUpdateScrollWithButtonState).toHaveBeenCalledWith(false);

    jest.useRealTimers();
  });

  it('should clear timeout when scrollToTop is called multiple items', () => {
    jest.useFakeTimers();
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    const { result } = renderHook(() => useScrollController());

    act(() => {
      result.current.scrollToTop();
      result.current.scrollToTop();
    });

    expect(mockUpdateScrollWithButtonState).toHaveBeenCalledWith(true);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(mockUpdateScrollWithButtonState).toHaveBeenCalledWith(false);
    clearTimeoutSpy.mockRestore();
    jest.useRealTimers();
  });
});
