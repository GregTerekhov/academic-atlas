'use client';

import { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react';

import { useHandleClickOutside, isCalculationDataValid } from 'helpers';
import { useCalculation } from './CalculationProvider';

interface IMenuContext {
  isCalcMenuOpen: boolean;
  isNavMenuOpen: boolean;
  showCalculationMenu: boolean;
  toggleCalcMenu: () => void;
  toggleNavMenu: () => void;
  closeMenu: () => void;
  changeMenuContent: () => void;
}

const MenuContext = createContext<IMenuContext | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isCalcMenuOpen, setIsCalcMenuOpen] = useState(false);
  const [showCalculationMenu, setShowCalculationMenu] = useState(false);
  const [isValidData, setIsValidData] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const { calculationData, resetCalculation } = useCalculation();

  useEffect(() => {
    if (isNavMenuOpen || isCalcMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isCalcMenuOpen, isNavMenuOpen]);

  useEffect(() => {
    const hasData = isCalculationDataValid(calculationData);

    setIsValidData(hasData);
  }, [calculationData]);

  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  const changeMenuContent = () => {
    setShowCalculationMenu(true);
  };

  const toggleCalcMenu = () => {
    setIsCalcMenuOpen(!isCalcMenuOpen);
    showCalculationMenu && setShowCalculationMenu(false);
    if (isValidData) {
      resetCalculation();
    }
  };

  const closeMenu = () => {
    setIsCalcMenuOpen(false);
    setIsNavMenuOpen(false);
    setShowCalculationMenu(false);
    if (isValidData) {
      resetCalculation();
    }
  };

  useHandleClickOutside(menuRef, isCalcMenuOpen, closeMenu);
  useHandleClickOutside(menuRef, isNavMenuOpen, closeMenu);

  return (
    <MenuContext.Provider
      value={{
        isCalcMenuOpen,
        isNavMenuOpen,
        showCalculationMenu,
        changeMenuContent,
        toggleCalcMenu,
        toggleNavMenu,
        closeMenu,
      }}
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
