import { ThemeVariants } from 'types';
import { getPreference } from 'helpers';
import { getCookie } from 'helpers/cookiesHelper';

jest.mock('helpers/cookiesHelper');

describe('getPreference', () => {
  const mockGetCookie = getCookie as jest.Mock;

  it('should return theme from cookie if present', () => {
    mockGetCookie.mockReturnValue(ThemeVariants.DARK);

    const preference = getPreference('theme');
    expect(preference).toBe(ThemeVariants.DARK);
  });

  it('should return DARK theme if no cookie and media query prefers dark mode', () => {
    mockGetCookie.mockReturnValue(null);
    window.matchMedia = jest.fn().mockReturnValue({ matches: true });

    const preference = getPreference('theme');
    expect(preference).toBe(ThemeVariants.DARK);
  });

  it('should return LIGHT theme if no cookie and media query does not prefer dark mode', () => {
    mockGetCookie.mockReturnValue(null);
    window.matchMedia = jest.fn().mockReturnValue({ matches: false });

    const preference = getPreference('theme');
    expect(preference).toBe(ThemeVariants.LIGHT);
  });
});
