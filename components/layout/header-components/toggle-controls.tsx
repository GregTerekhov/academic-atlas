'use client';

import { IconName, IconSize, ButtonType, AriaLabel } from 'types';
import { useMenu } from 'context';
import { getAriaLabelSwitcher } from 'helpers';

import { MobileMenuTemplate } from 'template';
import { SvgIconUI } from 'ui';
import Menu from '../menu';
import PriceCalculator from '../../calculation/product-price-calculator';

export default function ToggleMenuTrigger() {
  const { isNavMenuOpen, isCalcMenuOpen, showCalculationMenu, handleToggleMenu } = useMenu();

  const dynamicAriaLabel = getAriaLabelSwitcher(isNavMenuOpen, isCalcMenuOpen, showCalculationMenu);
  const isOpenMenu = showCalculationMenu || isNavMenuOpen || isCalcMenuOpen;

  return (
    <>
      <button
        type={ButtonType.Button}
        onClick={handleToggleMenu}
        aria-label={dynamicAriaLabel}
        className='group size-10'
      >
        <SvgIconUI
          id={
            isNavMenuOpen || isCalcMenuOpen || showCalculationMenu
              ? IconName.Close
              : IconName.Burger
          }
          size={{ width: IconSize.L, height: IconSize.L }}
          className='fill-darkBase/75 dark:fill-whiteBase lg:group-hover:fill-accentSecondary'
          ariaHidden={false}
          ariaLabel={isOpenMenu ? AriaLabel.CloseMenu : AriaLabel.Burger}
        />
      </button>

      <MobileMenuTemplate isOpen={isNavMenuOpen}>
        {showCalculationMenu ? <PriceCalculator /> : <Menu />}
      </MobileMenuTemplate>
    </>
  );
}
