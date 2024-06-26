export const getCookie = (name: string): string | null => {
  const matches = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`);
  return matches ? matches[1] : null;
};

export const setCookie = (name: string, value: string, days: number): void => {
  let expires = '';

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value}${expires}; path=/`;
};

export const eraseCookie = (name: string): void => {
  setCookie(name, '', -1);
};
