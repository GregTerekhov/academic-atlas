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

  it.each([
    {
      description: 'clicking outside the ref',
      isPopupOpen: true,
      event: new MouseEvent('mousedown', { bubbles: true }),
      target: document.body,
      shouldCallOnClose: true,
    },
    {
      description: 'clicking inside the ref',
      isPopupOpen: true,
      event: new MouseEvent('mousedown', { bubbles: true }),
      target: document.createElement('div'),
      shouldCallOnClose: false,
    },
    {
      description: 'pressing Escape key',
      isPopupOpen: true,
      event: new KeyboardEvent('keydown', { key: 'Escape' }),
      target: window,
      shouldCallOnClose: true,
    },
    {
      description: 'pressing Escape key',
      isPopupOpen: false,
      event: new KeyboardEvent('keydown', { key: 'Escape' }),
      target: window,
      shouldCallOnClose: false,
    },
  ])('should handle case of $description', ({ isPopupOpen, event, target, shouldCallOnClose }) => {
    renderHook(() => useHandleClickOutside(ref, isPopupOpen, onClose));

    act(() => {
      target.dispatchEvent(event);
    });

    if (shouldCallOnClose) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(onClose).toHaveBeenCalled();
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(onClose).not.toHaveBeenCalled();
    }
  });

  it('should not call onClose if isOpen changes is false', () => {
    const { rerender } = renderHook(({ isOpen }) => useHandleClickOutside(ref, isOpen, onClose), {
      initialProps: { isOpen: true },
    });

    act(() => {
      const outsideClickEvent = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(outsideClickEvent);
    });

    expect(onClose).toHaveBeenCalled();

    rerender({ isOpen: false });

    act(() => {
      const outsideClickEvent = new MouseEvent('mousedown', { bubbles: true });
      document.body.dispatchEvent(outsideClickEvent);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
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
