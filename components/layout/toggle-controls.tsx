'use client';

import { IconName, IconSize, ButtonType, AriaLabelTrigger } from 'types';

import { useMenu } from 'context';

import { MobileMenuTemplate } from 'template';
import { SvgIconUI } from 'ui';
import Menu from './menu';
import PriceCalculator from '../calculation/product-price-calculator';

export default function ToggleMenuTrigger() {
  const {
    isNavMenuOpen,
    isCalcMenuOpen,
    showCalculationMenu,
    toggleNavMenu,
    toggleCalcMenu,
    closeMenu,
  } = useMenu();

  const handleToggleMenu = (): void => {
    if (isCalcMenuOpen) {
      toggleCalcMenu();
    } else if (showCalculationMenu) {
      closeMenu();
    } else {
      toggleNavMenu();
    }
  };

  const getAriaLabel = (): AriaLabelTrigger => {
    switch (true) {
      case isNavMenuOpen:
        return AriaLabelTrigger.CloseNavigation;
      case isCalcMenuOpen:
        return AriaLabelTrigger.CloseCalculation;

      default:
        return AriaLabelTrigger.Default;
    }
  };

  const dynamicAriaLabel = getAriaLabel();

  return (
    <>
      <button
        type={ButtonType.Button}
        onClick={handleToggleMenu}
        aria-label={dynamicAriaLabel}
        className='group size-10'
      >
        <SvgIconUI
          id={isNavMenuOpen || isCalcMenuOpen ? IconName.Close : IconName.Burger}
          size={{ width: IconSize.L, height: IconSize.L }}
          className='dark:fille-whiteBase fill-darkBase group-hover:fill-accentPrimary dark:fill-whiteBase'
        />
      </button>

      <MobileMenuTemplate isOpen={isNavMenuOpen}>
        {showCalculationMenu ? <PriceCalculator /> : <Menu />}
      </MobileMenuTemplate>
    </>
  );
}
