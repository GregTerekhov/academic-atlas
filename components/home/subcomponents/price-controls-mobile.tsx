'use client';

import { AriaDescription, AriaId, PrimaryButtonLabel } from 'types';
import { useMenu } from 'context';

import { MobileMenuTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import PriceCalculator from '../../calculation/product-price-calculator';

export default function PriceControlsMobile() {
  const { isCalcMenuOpen, toggleCalcMenu } = useMenu();

  return (
    <>
      <div className='hidden items-center justify-center max-lg:flex'>
        <PrimaryButtonUI
          handleClick={toggleCalcMenu}
          ariaId={AriaId.CalculationModule}
          ariaDescription={AriaDescription.CalculationModule}
        >
          {PrimaryButtonLabel.CostCalculation}
        </PrimaryButtonUI>
      </div>
      <MobileMenuTemplate isOpen={isCalcMenuOpen}>
        <PriceCalculator />
      </MobileMenuTemplate>
    </>
  );
}
