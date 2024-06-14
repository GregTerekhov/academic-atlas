'use client';

import { usePopUp } from 'helpers';
import { IconName, IconSize, ButtonType } from 'types';

import { SvgIconUI } from 'ui';
import Menu from './menu';
import { MobileMenuTemplate } from 'template';

export default function ToggleMenuTrigger() {
  const { isPopUpOpen, toggleModal } = usePopUp();

  return (
    <>
      <button
        type={ButtonType.Button}
        onClick={toggleModal}
        aria-label={isPopUpOpen ? 'Close Menu' : 'Open Menu'}
        className='group'
      >
        <SvgIconUI
          id={isPopUpOpen ? IconName.Close : IconName.Burger}
          size={{ width: IconSize.L, height: IconSize.L }}
          className='dark:fille-whiteBase fill-darkBase group-hover:fill-accentPrimary dark:fill-whiteBase'
        />
      </button>

      {isPopUpOpen && (
        <MobileMenuTemplate isOpen={isPopUpOpen}>
          <Menu />
        </MobileMenuTemplate>
      )}
    </>
  );
}
