'use client';

import { usePathname } from 'next/navigation';

import { Paths } from '../types';
import { useActiveLink, useMenu } from '../context';
import { useScrollResetTimeout } from './useScrollResetTimeout';

export const useHandleLogoClick = () => {
  const pathname = usePathname();
  const { isNavMenuOpen, isCalcMenuOpen, closeMenu } = useMenu();
  const { updateActiveLink, updateScrollWithButtonState } = useActiveLink();
  const startTimeout = useScrollResetTimeout();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const doesNeedScroll = pathname === Paths.Main && (!isNavMenuOpen || !isCalcMenuOpen);
    const isOpenMenu = isCalcMenuOpen || isNavMenuOpen;

    if (doesNeedScroll && window.scrollY !== 0) {
      e.preventDefault();
      window.history.pushState(null, '', '/');

      updateScrollWithButtonState(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      startTimeout();
    }

    if (isOpenMenu) {
      closeMenu();
    }
    if (pathname !== Paths.Main) {
      updateActiveLink(Paths.Main);
    }
  };

  return handleClick;
};
