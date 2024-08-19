import { renderHook } from '@testing-library/react';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';

describe('useIntersectionObserver hook', () => {
  let observeMock: jest.Mock;
  let unobserveMock: jest.Mock;
  let disconnectMock: jest.Mock;

  beforeEach(() => {
    observeMock = jest.fn();
    unobserveMock = jest.fn();
    disconnectMock = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).IntersectionObserver = jest.fn(() => ({
      observe: observeMock,
      unobserve: unobserveMock,
      disconnect: disconnectMock,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should observe each target element on mount', () => {
    const mockElements = [document.createElement('div'), document.createElement('div')];
    const mockCallback = jest.fn();
    const options = {};

    renderHook(() => useIntersectionObserver(mockElements, options, mockCallback));

    expect(observeMock).toHaveBeenCalledTimes(2);
    expect(observeMock).toHaveBeenCalledWith(mockElements[0]);
    expect(observeMock).toHaveBeenCalledWith(mockElements[1]);
  });

  it('should unobserve all target elements and disconnect on unmount', () => {
    const mockElements = [document.createElement('div'), document.createElement('div')];
    const mockCallback = jest.fn();
    const options = {};

    const { unmount } = renderHook(() =>
      useIntersectionObserver(mockElements, options, mockCallback),
    );

    unmount();

    expect(unobserveMock).toHaveBeenCalledTimes(2);
    expect(unobserveMock).toHaveBeenCalledWith(mockElements[0]);
    expect(unobserveMock).toHaveBeenCalledWith(mockElements[1]);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it('should not create observer if no targets are provided', () => {
    const mockCallback = jest.fn();
    const options = {};

    renderHook(() => useIntersectionObserver([], options, mockCallback));

    expect(observeMock).not.toHaveBeenCalled();
    expect(disconnectMock).not.toHaveBeenCalled();
  });
});