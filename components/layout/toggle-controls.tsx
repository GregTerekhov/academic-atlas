'use client';

import { useState } from 'react';

import { ButtonType } from 'types';

import { MobileMenuTemplate } from 'template';
import { SvgIconUI } from 'ui';
import Menu from './menu';

export default function ToggleMenuTrigger() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button
        type={ButtonType.Button}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <SvgIconUI />
      </button>
      {isMenuOpen && (
        <MobileMenuTemplate>
          <Menu />
        </MobileMenuTemplate>
      )}
    </>
  );
}
