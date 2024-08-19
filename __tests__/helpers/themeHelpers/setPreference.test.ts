import { ThemeVariants } from 'types';
import { eraseCookie, setCookie } from 'helpers/cookiesHelper';
import { applyPreference, setPreference } from 'helpers/themeHelper';

jest.mock('helpers/cookiesHelper');
jest.mock('helpers/themeHelper');

describe('setPreference', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should erase existing cookie and set new cookie with theme', () => {
    setPreference('theme', ThemeVariants.DARK);

    expect(eraseCookie).toHaveBeenCalledWith('theme');
    expect(setCookie).toHaveBeenCalledWith('theme', ThemeVariants.DARK, 365);
    expect(applyPreference).toHaveBeenCalledWith(ThemeVariants.DARK);
  });

  it('should not set a cookie if theme is not provided', () => {
    setPreference('theme', '');

    expect(eraseCookie).toHaveBeenCalledWith('theme');
    expect(setCookie).not.toHaveBeenCalled();
    expect(applyPreference).not.toHaveBeenCalled();
  });
});
