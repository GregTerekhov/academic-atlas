import { act, renderHook } from '@testing-library/react';

import { useActiveLink } from 'context';
import { useScrollResetTimeout } from 'hooks';

jest.mock('context', () => ({
  useActiveLink: jest.fn(),
}));

describe('useScrollResetTimeout', () => {
  const mockUseActiveLink = useActiveLink as jest.Mock;
  const mockUpdateScrollWithButtonState = jest.fn();

  beforeEach(() => {
    mockUseActiveLink.mockReturnValue({
      updateScrollWithButtonState: mockUpdateScrollWithButtonState,
    });
  });

  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('calls updateScrollWithButtonState after timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    const { result } = renderHook(() => useScrollResetTimeout());

    act(() => {
      result.current();
    });
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);

    expect(mockUpdateScrollWithButtonState).not.toHaveBeenCalled();

    act(() => {
      jest.runAllTimers();
    });

    expect(mockUpdateScrollWithButtonState).toHaveBeenCalledWith(false);

    setTimeoutSpy.mockRestore();
  });

  it('clears previous timeout if a new one is started', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

    const { result } = renderHook(() => useScrollResetTimeout());

    act(() => {
      result.current();
    });

    act(() => {
      result.current();
    });

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    expect(setTimeoutSpy).toHaveBeenCalledTimes(2);

    act(() => {
      jest.runAllTimers();
    });

    setTimeoutSpy.mockRestore();
    clearTimeoutSpy.mockRestore();
  });
});
