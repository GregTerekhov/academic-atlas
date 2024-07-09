'use client';

import { IconName, IconSize, ButtonType } from 'types';

import { useMenu } from 'context';
import { getAriaLabelSwitcher } from 'helpers';

import { MobileMenuTemplate } from 'template';
import { SvgIconUI } from 'ui';
import Menu from './menu';
import PriceCalculator from '../calculation/product-price-calculator';

export default function ToggleMenuTrigger() {
  const { isNavMenuOpen, isCalcMenuOpen, showCalculationMenu, handleToggleMenu } = useMenu();

  const dynamicAriaLabel = getAriaLabelSwitcher(isNavMenuOpen, isCalcMenuOpen);

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
          className='fill-darkBase/75 dark:fill-whiteBase lg:group-hover:fill-accentSecondary'
        />
      </button>

      <MobileMenuTemplate isOpen={isNavMenuOpen}>
        {showCalculationMenu ? <PriceCalculator /> : <Menu />}
      </MobileMenuTemplate>
    </>
  );
}
