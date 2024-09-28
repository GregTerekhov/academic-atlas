import { ThemeVariants } from 'types';
import { eraseCookie, setCookie } from 'helpers/cookiesHelper';
import * as themeHelper from 'helpers/themeHelper';

jest.mock('helpers/cookiesHelper', () => ({
  eraseCookie: jest.fn(),
  setCookie: jest.fn(),
}));

jest.mock('helpers/themeHelper', () => ({
  ...jest.requireActual('helpers/themeHelper'),
  applyPreference: jest.fn(),
}));

describe('setPreference', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should erase existing cookie and set new cookie with theme', () => {
    themeHelper.applyPreference(ThemeVariants.DARK);
    themeHelper.setPreference('theme', ThemeVariants.DARK);

    expect(eraseCookie).toHaveBeenCalledWith('theme');
    expect(setCookie).toHaveBeenCalledWith('theme', ThemeVariants.DARK, 365);

    expect(themeHelper.applyPreference).toHaveBeenCalledTimes(1);
    expect(themeHelper.applyPreference).toHaveBeenCalledWith(ThemeVariants.DARK);
  });

  it('should not set a cookie if theme is not provided', () => {
    themeHelper.setPreference('theme', '');

    expect(eraseCookie).toHaveBeenCalledWith('theme');
    expect(setCookie).not.toHaveBeenCalled();
    expect(themeHelper.applyPreference).not.toHaveBeenCalled();
  });
});
