/* eslint-disable jest/no-commented-out-tests */
import { getScrollBarWidth, hasScrollbar, toggleScrollLock } from 'helpers';

describe('Utility ScrollLock Functions', () => {
  const resetDocumentStyles = () => {
    document.body.style.height = '';
    document.body.style.overflow = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.classList.remove('no-scroll');
    document.firstElementChild?.classList.remove('no-scroll');
    sessionStorage.clear();
    window.scrollTo = jest.fn();
  };

  const setBodyDimensions = (scrollHeight: number, clientHeight: number) => {
    Object.defineProperty(document.body, 'scrollHeight', {
      value: scrollHeight,
      configurable: true,
    });
    Object.defineProperty(document.body, 'clientHeight', {
      value: clientHeight,
      configurable: true,
    });
  };

  beforeEach(resetDocumentStyles);

  describe('getScrollBarWidth', () => {
    it('should return the correct scrollbar width', () => {
      const originalAppendChild = document.body.appendChild;
      document.body.appendChild = jest.fn();

      const scrollbarWidth = getScrollBarWidth();
      expect(scrollbarWidth).toBeGreaterThanOrEqual(0);

      document.body.appendChild = originalAppendChild;
    });
  });

  describe('hasScrollbar', () => {
    it('should return true if the body has a scrollbar', () => {
      setBodyDimensions(3000, 800);
      expect(hasScrollbar()).toBe(true);
    });

    it('should return false if the body does not have a scrollbar', () => {
      setBodyDimensions(800, 800);
      expect(hasScrollbar()).toBe(false);
    });
  });

  describe('toggleScrollLock', () => {
    it('should lock the scroll when isLocked is true', () => {
      const mockScrollY = 100;
      window.scrollY = mockScrollY;
      toggleScrollLock(true);

      expect(document.body.classList.contains('no-scroll')).toBe(true);
      expect(sessionStorage.getItem('scrollPosition')).toBe(mockScrollY.toString());
      expect(document.body.style.top).toBe(`-${mockScrollY}px`);

      const preventDefaultMock = jest.fn();
      const touch = {
        clientX: 0,
        clientY: 0,
        identifier: 0,
        target: document.body,
        pageX: 0,
        pageY: 0,
        screenX: 0,
        screenY: 0,
        radiusX: 0,
        radiusY: 0,
        rotationAngle: 0,
        force: 0,
      } as Touch;

      const touchMoveEvent = new TouchEvent('touchmove', {
        bubbles: true,
        cancelable: true,
        touches: [touch],
      });

      Object.defineProperty(touchMoveEvent, 'preventDefault', { value: preventDefaultMock });

      document.body.ontouchmove && document.body.ontouchmove(touchMoveEvent);
      expect(preventDefaultMock).toHaveBeenCalled();
    });

    it('should unlock the scroll when isLocked is false', () => {
      toggleScrollLock(true);
      toggleScrollLock(false);

      expect(document.body.classList.contains('no-scroll')).toBe(false);
      expect(document.body.style.top).toBe('');
      expect(window.scrollTo).toHaveBeenCalledWith(0, expect.any(Number));
    });

    it('should adjust body width when scrollbar is present', () => {
      setBodyDimensions(3000, 800);
      toggleScrollLock(true);
      expect(document.body.style.width).toBe(`calc(100% - ${getScrollBarWidth()}px)`);
    });

    it('should set body width to 100% when there is no scrollbar', () => {
      setBodyDimensions(800, 800);
      toggleScrollLock(true);
      expect(document.body.style.width).toBe('100%');
    });

    it('should clear the stored scroll position when unlocking scroll', () => {
      sessionStorage.setItem('scrollPosition', '200');
      toggleScrollLock(false);
      expect(sessionStorage.getItem('scrollPosition')).toBeNull();
    });
  });
});
