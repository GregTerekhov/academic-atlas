import { eraseCookie, getCookie, setCookie } from 'helpers';

describe('Cookie utility functions', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('should get a cookie value', () => {
    setCookie('testCookie', 'testValue', 1);

    const value = getCookie('testCookie');

    expect(value).toBe('testValue');
  });

  it('should return null if cookie does not exist', () => {
    const value = getCookie('nonexisitingCookie');
    expect(value).toBeNull();
  });

  it('should set a cookie with correct parameters', () => {
    setCookie('testCookie', 'testValue', 1);

    const cookieValue = getCookie('testCookie');
    expect(cookieValue).toBe('testValue');
  });

  it('should erase a cookie', () => {
    setCookie('testCookie', 'testValue', 1);
    eraseCookie('testCookie');

    const cookieValue = getCookie('testCookie');

    expect(cookieValue).toBeNull();
  });

  it('should return null if document is undefined (mocked)', () => {
    const getCookieSpy = jest
      .spyOn(globalThis, 'document', 'get')
      .mockImplementation(() => undefined as unknown as Document);

    expect(getCookie('anyCookie')).toBeNull();
    expect(() => setCookie('anyCookie', 'anyValue', 1)).not.toThrow();

    getCookieSpy.mockRestore();
  });
});
