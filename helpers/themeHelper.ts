import { ThemeVariants } from '../types';
import { eraseCookie, getCookie, setCookie } from './cookiesHelper';

export const applyPreference = (theme: string) => {
  const root = document.firstElementChild;
  root?.classList.remove(ThemeVariants.DARK, ThemeVariants.LIGHT);
  root?.classList.add(theme);
};

export const getPreference = (storageKey: string): string => {
  const cookie = getCookie(storageKey);

  if (cookie) {
    return cookie;
  }

  return window.matchMedia(`(prefers-color-scheme: ${ThemeVariants.DARK})`).matches
    ? ThemeVariants.DARK
    : ThemeVariants.LIGHT;
};

export const setPreference = (storageKey: string, theme: string) => {
  eraseCookie(storageKey);

  if (theme) {
    setCookie(storageKey, theme, 365);
    applyPreference(theme);
  }
};
