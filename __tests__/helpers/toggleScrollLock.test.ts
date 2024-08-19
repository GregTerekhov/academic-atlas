/* eslint-disable jest/no-commented-out-tests */
import { hasScrollbar, toggleScrollLock } from 'helpers';

describe('Utility ScrollLock Functions', () => {
  beforeEach(() => {
    document.body.style.height = '';
    document.body.style.overflow = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.classList.remove('no-scroll');
    if (document.firstElementChild) {
      document.firstElementChild.classList.remove('no-scroll');
    }

    window.scrollTo = jest.fn();
  });

  // describe('getScrollBarWidth', () => {
  //   it('should return the correct scrollbar width', () => {
  //     const scrollbarWidth = getScrollBarWidth();
  //     console.log('Scrollbar Width:', scrollbarWidth);
  //     expect(scrollbarWidth).toBeGreaterThan(0);
  //   });
  // }); //FIXME

  describe('hasScrollbar', () => {
    beforeEach(() => {
      document.body.style.overflow = '';
    });

    // it('should return true if the body has a scrollbar', () => {
    //   document.body.style.height = '3000px';
    //   console.log('Body scrollHeight:', document.body.scrollHeight);
    //   console.log('Body clientHeight:', document.body.clientHeight);
    //   expect(hasScrollbar()).toBe(true);
    // }); //FIXME

    it('should return false if the body does not have a scrollbar', () => {
      document.body.style.height = '100px';
      expect(hasScrollbar()).toBe(false);
    });
  });

  describe('toggleScrollLock', () => {
    it('should lock the scroll when isLocked is true', () => {
      toggleScrollLock(true);
      expect(document.body.classList.contains('no-scroll')).toBe(true);
    });

    it('should unlock the scroll when isLocked is false', () => {
      toggleScrollLock(false);
      expect(document.body.classList.contains('no-scroll')).toBe(false);
    });
  });
});
