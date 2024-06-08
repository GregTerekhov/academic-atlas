'use client';
import { useEffect, useState } from 'react';
import { IconName, IconSize } from 'types/ui';

import { SvgIconUI, SwitchUI } from 'ui';

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
      <SwitchUI onClick={handleSwitchTheme}>
        <SvgIconUI
          id={enabled ? IconName.Sun : IconName.Moon}
          size={{ width: IconSize.XS, height: IconSize.XS }}
          className='fill-whiteBase'
        />
      </SwitchUI>
    </>
  );
}
