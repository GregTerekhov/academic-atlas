'use client';

import { createContext, useContext, useState, useRef, ReactNode, useEffect } from 'react';

import { type IDropdownRef } from '../types';

import { useCalculation } from './CalculationProvider';
import { checkCalculationField } from 'helpers';
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
  registerDropdownRefs: (refs: Record<string, IDropdownRef | null>) => void;
}

const MenuContext = createContext<IMenuContext | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [dropdownRefs, setDropdownRefs] = useState<Record<string, IDropdownRef | null>>({});
  const [menuState, setMenuState] = useState({
    isNavMenuOpen: false,
    isCalcMenuOpen: false,
    showCalculationMenu: false,
  });
  const [isValidData, setIsValidData] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const { calculationData, resetCalculation, handleResetCostResult, handleCheckboxChange } =
    useCalculation();

  useEffect(() => {
    const { isNavMenuOpen, isCalcMenuOpen } = menuState;
    document.body.style.overflow = isNavMenuOpen || isCalcMenuOpen ? 'hidden' : 'auto';
  }, [menuState]);

  useEffect(() => {
    const isNotDefaultData = checkCalculationField(calculationData);

    setIsValidData(isNotDefaultData);
  }, [calculationData]);

  const registerDropdownRefs = (refs: Record<string, IDropdownRef | null>) => {
    setDropdownRefs((prevRefs) => {
      if (JSON.stringify(prevRefs) === JSON.stringify(refs)) {
        return prevRefs;
      }
      return refs;
    });
  };

  const resetAllDropdownLabels = () => {
    Object.values(dropdownRefs).forEach((ref) => {
      if (ref) {
        ref.resetSelectedLabel();
      }
    });
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
    handleResetCostResult();
    resetAllDropdownLabels();
    handleCheckboxChange(false);

    if (isValidData) {
      resetCalculation();
    }
  };

  const closeMenu = () => {
    setMenuState({ isNavMenuOpen: false, isCalcMenuOpen: false, showCalculationMenu: false });
    if (menuState.isCalcMenuOpen || menuState.showCalculationMenu) {
      handleResetCostResult();
      resetAllDropdownLabels();
      handleCheckboxChange(false);
    }

    if (isValidData) {
      resetCalculation();
    }
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
        registerDropdownRefs,
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
