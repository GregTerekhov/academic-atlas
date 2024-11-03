import { act, renderHook } from '@testing-library/react';

import { useActiveLink } from 'context';
import { useIntersectionObserver, useScrollResetTimeout } from 'hooks';
import { useScrollController } from 'hooks/useScrollController';

const CHANGED_SCROLL_POSITION = 1200;
const DEFAULT_SCROLL_POSITION = 0;
const MARGIN_BOTTOM = '16px';

jest.mock('context', () => ({
  useActiveLink: jest.fn(),
}));

jest.mock('hooks', () => ({
  useIntersectionObserver: jest.fn(),
  useScrollResetTimeout: jest.fn(),
}));

describe('useScrollController hook', () => {
  const mockUseIntersectionObserver = useIntersectionObserver as jest.Mock;
  const mockUseScrollResetTimeout = useScrollResetTimeout as jest.Mock;
  const mockUseActiveLink = useActiveLink as jest.Mock;

  const mockUpdateScrollWithButtonState = jest.fn();
  const mockStartTimeout = jest.fn();

  beforeEach(() => {
    window.scrollTo = jest.fn();

    jest.clearAllMocks();

    mockUseIntersectionObserver.mockImplementation((elements, _, callback) => {
      const entries = elements.map((el: HTMLElement) => ({
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

    mockUseScrollResetTimeout.mockReturnValue(mockStartTimeout);
  });

  const createHeaderAndButton = () => {
    const header = document.createElement('header');
    const button = document.createElement('button');

    document.body.appendChild(header);
    document.body.appendChild(button);
    Object.defineProperty(header, 'getBoundingClientRect', {
      value: () => ({ height: 120 }),
    });

    return { header, button };
  };

  const updateScrollPosition = (scrollY: number) => {
    act(() => {
      window.scrollY = scrollY;
      window.dispatchEvent(new Event('scroll'));
    });
  };

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should initialise refs and set isVisible to false by default', () => {
    const { result } = renderHook(() => useScrollController());

    expect(result.current.isVisible).toBe(false);
    expect(result.current.buttonRef.current).toBeNull();
  });

  it('should update isVisible based on scroll position', () => {
    createHeaderAndButton();

    const { result } = renderHook(() => useScrollController());

    updateScrollPosition(CHANGED_SCROLL_POSITION);
    expect(result.current.isVisible).toBe(true);

    updateScrollPosition(DEFAULT_SCROLL_POSITION);
    expect(result.current.isVisible).toBe(false);
  });

  it('should position button as fixed by default', () => {
    jest.useFakeTimers();

    const { button } = createHeaderAndButton();

    const { result } = renderHook(() => useScrollController());

    act(() => {
      Object.defineProperty(result.current.buttonRef, 'current', {
        value: button,
        writable: true,
      });
    });

    updateScrollPosition(CHANGED_SCROLL_POSITION);

    act(() => {
      jest.runAllTimers();
      requestAnimationFrame(() => {
        expect(result.current.isVisible).toBe(true);
        expect(button.style.position).toBe('fixed');
        expect(button.style.bottom).toBe(MARGIN_BOTTOM);
      });
    });

    jest.useRealTimers();
  });

  it('should position button as absolute when footer is intersecting', () => {
    const { button } = createHeaderAndButton();
    const { result } = renderHook(() => useScrollController());

    Object.defineProperty(result.current.buttonRef, 'current', {
      value: button,
      writable: true,
    });

    act(() => {
      const mockCall = mockUseIntersectionObserver.mock.calls[0];
      if (mockCall && mockCall[2]) {
        mockCall[2]([{ isIntersecting: true, target: document.createElement('footer') }]);
      }
    });

    act(() => {
      requestAnimationFrame(() => {
        expect(button.style.position).toBe('absolute');
        expect(button.style.bottom).toBe(MARGIN_BOTTOM);
      });
    });
  });

  it('should scroll to top when scrollTop is called', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useScrollController());

    const scrollToMock = jest.spyOn(window, 'scrollTo');

    act(() => {
      result.current.scrollToTop();
    });

    expect(scrollToMock).toHaveBeenCalledWith({
      top: DEFAULT_SCROLL_POSITION,
      behavior: 'smooth',
    });

    expect(mockUpdateScrollWithButtonState).toHaveBeenCalledWith(true);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(mockUpdateScrollWithButtonState).toHaveBeenCalledWith(false);

    scrollToMock.mockRestore();

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
