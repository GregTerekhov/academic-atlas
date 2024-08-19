import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { useHandleClickOutside } from 'hooks';

describe('useHandleClickOutside hook', () => {
  let ref: React.RefObject<HTMLDivElement>;
  let onClose: jest.Mock;

  beforeEach(() => {
    ref = { current: document.createElement('div') };
    onClose = jest.fn();

    jest.spyOn(window, 'addEventListener');
    jest.spyOn(window, 'removeEventListener');

    if (ref.current) {
      document.body.appendChild(ref.current);
    }
  });

  afterEach(() => {
    jest.restoreAllMocks();

    if (ref.current) {
      document.body.removeChild(ref.current);
    }
  });

  it('should call onClose when clicking outside the ref and isOpen is true', () => {
    renderHook(() => useHandleClickOutside(ref, true, onClose));

    act(() => {
      const outsideClickEvent = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(outsideClickEvent);
    });

    expect(onClose).toHaveBeenCalled();
  });

  it('should not call onClose when clicking inside the ref and isOpen is true', () => {
    renderHook(() => useHandleClickOutside(ref, true, onClose));

    act(() => {
      const insideClickEvent = new MouseEvent('mousedown', { bubbles: true });
      ref.current?.dispatchEvent(insideClickEvent);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should call onClose when pressing Escape and isOpen is true', () => {
    renderHook(() => useHandleClickOutside(ref, true, onClose));

    act(() => {
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(escapeEvent);
    });

    expect(onClose).toHaveBeenCalled();
  });

  it('should not call onClose when pressing Escape and isOpen is false', () => {
    renderHook(() => useHandleClickOutside(ref, false, onClose));

    act(() => {
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(escapeEvent);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should add and remove event listeners on mount and unmount', () => {
    const { unmount } = renderHook(() => useHandleClickOutside(ref, true, onClose));

    expect(window.addEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(window.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));

    act(() => {
      const outsideClickEvent = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(outsideClickEvent);

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.body.dispatchEvent(escapeEvent);
    });

    unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(window.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  });
});
