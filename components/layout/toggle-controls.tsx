'use client';

import { IconName, IconSize, ButtonType } from 'types';

import { useMenu } from 'context';

import { MobileMenuTemplate } from 'template';
import { SvgIconUI } from 'ui';
import Menu from './menu';

export default function ToggleMenuTrigger() {
  const { isNavMenuOpen, isCalcMenuOpen, toggleNavMenu, toggleCalcMenu } = useMenu();

  return (
    <>
      <button
        type={ButtonType.Button}
        onClick={isCalcMenuOpen ? toggleCalcMenu : toggleNavMenu}
        aria-label={isNavMenuOpen || isCalcMenuOpen ? 'Close Menu' : 'Open Menu'}
        className='group size-10'
      >
        <SvgIconUI
          id={isNavMenuOpen || isCalcMenuOpen ? IconName.Close : IconName.Burger}
          size={{ width: IconSize.L, height: IconSize.L }}
          className='dark:fille-whiteBase fill-darkBase group-hover:fill-accentPrimary dark:fill-whiteBase'
        />
      </button>

      <MobileMenuTemplate isOpen={isNavMenuOpen}>
        <Menu />
      </MobileMenuTemplate>
    </>
  );
}
