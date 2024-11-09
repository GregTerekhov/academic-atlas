'use client';

const HOURS = 24;
const MINUTES = 60;
const SECONDS = 60;
const MILLISECONDS = 1000;

export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const matches = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`);
  return matches ? matches[1] : null;
};

export const setCookie = (name: string, value: string, days: number): void => {
  let expires = '';

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * HOURS * MINUTES * SECONDS * MILLISECONDS);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = typeof document !== 'undefined' ? `${name}=${value}${expires}; path=/` : '';
};

export const eraseCookie = (name: string): void => {
  setCookie(name, '', -1);
};
