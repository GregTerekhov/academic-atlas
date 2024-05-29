'use client';
import { useEffect, useState } from 'react';

import { SvgIconUI } from 'ui';

export default function ThemeSwitcher() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [enabled]);

  const handleSwitchTheme = () => {
    setEnabled(!enabled);

    if (enabled) {
      localStorage.theme = 'dark';
    } else {
      localStorage.theme = 'light';
    }
  };
  return (
    <>
      <p>ThemeSwitcher</p>
      <SvgIconUI />
      <button
        type='button'
        onClick={handleSwitchTheme}
      >
        Switch theme
      </button>
    </>
  );
}
