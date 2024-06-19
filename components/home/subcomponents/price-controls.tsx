'use client';

import { PrimaryButtonLabel } from 'types';

import { useMenu, usePopup } from 'context';

import { MobileMenuTemplate, ModalTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import PriceCalculator from '../../product-price-calculator';

export default function PriceControls() {
  const { isPopupOpen, popupRef, togglePopup } = usePopup();
  const { isCalcMenuOpen, toggleCalcMenu } = useMenu();

  return (
    <>
      <div className='hidden items-center justify-center lg:flex'>
        <PrimaryButtonUI handleClick={togglePopup}>
          {PrimaryButtonLabel.CostCalculation}
        </PrimaryButtonUI>
      </div>
      <div className='hidden items-center justify-center max-lg:flex'>
        <PrimaryButtonUI handleClick={toggleCalcMenu}>
          {PrimaryButtonLabel.CostCalculation}
        </PrimaryButtonUI>
      </div>
      <div className='hidden max-lg:block'>
        <MobileMenuTemplate isOpen={isCalcMenuOpen}>
          <PriceCalculator />
        </MobileMenuTemplate>
      </div>
      <div className='hidden lg:block'>
        <ModalTemplate
          closeModal={togglePopup}
          title='MODAL TITLE'
          modalRef={popupRef}
          isOpen={isPopupOpen}
        >
          <PriceCalculator />
        </ModalTemplate>
      </div>
    </>
  );
}
