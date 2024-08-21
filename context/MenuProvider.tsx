'use client';

import { createContext, useContext, useState, useRef, useEffect } from 'react';

import { type IWithChildren } from 'types';
import { useCalculation } from './CalculationProvider';
import { useCalculationResult } from './CalculationResultProvider';
import { toggleScrollLock } from 'helpers';
import { useHandleClickOutside } from 'hooks';

interface IMenuContext {
  isCalcMenuOpen: boolean;
  isNavMenuOpen: boolean;
  showCalculationMenu: boolean;
  toggleCalcMenu: () => void;
  toggleNavMenu: () => void;
  closeMenu: () => void;
  changeMenuContent: () => void;
  handleToggleMenu: () => void;
}

const MenuContext = createContext<IMenuContext | undefined>(undefined);

export const MenuProvider = ({ children }: IWithChildren) => {
  const [menuState, setMenuState] = useState({
    isNavMenuOpen: false,
    isCalcMenuOpen: false,
    showCalculationMenu: false,
  });

  const menuRef = useRef<HTMLDivElement>(null);

  const { resetCalculation } = useCalculation();
  const { handleResetCostResult } = useCalculationResult();

  useEffect(() => {
    const { isNavMenuOpen, isCalcMenuOpen } = menuState;

    toggleScrollLock(isNavMenuOpen || isCalcMenuOpen);
  }, [menuState]);

  const resetValues = () => {
    handleResetCostResult();
    resetCalculation();
  };

  const toggleNavMenu = () => {
    setMenuState((prevState) => ({ ...prevState, isNavMenuOpen: !prevState.isNavMenuOpen }));
  };

  const changeMenuContent = () => {
    setMenuState((prevState) => ({ ...prevState, showCalculationMenu: true }));
  };

  const toggleCalcMenu = () => {
    setMenuState((prevState) => ({
      ...prevState,
      isCalcMenuOpen: !prevState.isCalcMenuOpen,
      showCalculationMenu: prevState.isCalcMenuOpen ? false : prevState.showCalculationMenu,
    }));
    resetValues();
  };

  const closeMenu = () => {
    setMenuState({ isNavMenuOpen: false, isCalcMenuOpen: false, showCalculationMenu: false });
    resetValues();
  };

  useHandleClickOutside(menuRef, menuState.isCalcMenuOpen || menuState.isNavMenuOpen, closeMenu);

  const handleToggleMenu = (): void => {
    if (menuState.isCalcMenuOpen) {
      toggleCalcMenu();
    } else if (menuState.showCalculationMenu) {
      closeMenu();
    } else {
      toggleNavMenu();
    }
  };

  return (
    <MenuContext.Provider
      value={{
        ...menuState,
        changeMenuContent,
        toggleCalcMenu,
        toggleNavMenu,
        closeMenu,
        handleToggleMenu,
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
