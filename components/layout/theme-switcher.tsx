'use client';

import { IconName, IconSize, ThemeVariants } from 'types';

import { useTheme } from 'helpers';

import { SvgIconUI, SwitchUI } from 'ui';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <SwitchUI onClick={toggleTheme}>
      <SvgIconUI
        id={theme === ThemeVariants.LIGHT ? IconName.Sun : IconName.Moon}
        size={{ width: IconSize.BG, height: IconSize.BG }}
        className='rotate-90 fill-whiteBase transition-transform hover:fill-darkBase-light'
      />
    </SwitchUI>
  );
}
