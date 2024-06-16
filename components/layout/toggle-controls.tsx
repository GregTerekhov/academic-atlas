'use client';

import { usePopup } from 'context';
import { IconName, IconSize, ButtonType } from 'types';

import { SvgIconUI } from 'ui';
import Menu from './menu';
import { MobileMenuTemplate } from 'template';

export default function ToggleMenuTrigger() {
  const { isPopupOpen, togglePopup } = usePopup();

  return (
    <>
      <button
        type={ButtonType.Button}
        onClick={togglePopup}
        aria-label={isPopupOpen ? 'Close Menu' : 'Open Menu'}
        className='group'
      >
        <SvgIconUI
          id={isPopupOpen ? IconName.Close : IconName.Burger}
          size={{ width: IconSize.L, height: IconSize.L }}
          className='dark:fille-whiteBase fill-darkBase group-hover:fill-accentPrimary dark:fill-whiteBase'
        />
      </button>

      <MobileMenuTemplate isOpen={isPopupOpen}>
        <Menu />
      </MobileMenuTemplate>
    </>
  );
}
