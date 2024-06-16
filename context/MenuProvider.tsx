'use client';

import { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react';

import { useHandleClickOutside } from 'helpers';

interface IMenuContext {
  isCalcMenuOpen: boolean;
  isNavMenuOpen: boolean;
  toggleCalcMenu: () => void;
  toggleNavMenu: () => void;
  closeMenu: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
}

const MenuContext = createContext<IMenuContext | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isCalcMenuOpen, setIsCalcMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNavMenuOpen || isCalcMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isCalcMenuOpen, isNavMenuOpen]);

  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  const toggleCalcMenu = () => {
    setIsCalcMenuOpen(!isCalcMenuOpen);
  };

  const closeMenu = () => {
    isCalcMenuOpen && setIsCalcMenuOpen(false);
    isNavMenuOpen && setIsNavMenuOpen(false);
  };

  useHandleClickOutside(menuRef, isCalcMenuOpen, closeMenu);
  useHandleClickOutside(menuRef, isNavMenuOpen, closeMenu);

  return (
    <MenuContext.Provider
      value={{ isCalcMenuOpen, isNavMenuOpen, toggleCalcMenu, toggleNavMenu, menuRef, closeMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
