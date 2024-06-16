'use client';

import { usePopup } from 'context';

import { MobileMenuTemplate, ModalTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import PriceCalculator from '../product-price-calculator';

export default function PriceControls() {
  const { isPopupOpen, popupRef, togglePopup } = usePopup();

  return (
    <>
      <div className='mt-8 flex items-center justify-center lg:mt-20'>
        <PrimaryButtonUI handleClick={togglePopup}>Розрахувати вартість</PrimaryButtonUI>
      </div>

      <div className='hidden max-lg:block'>
        <MobileMenuTemplate isOpen={isPopupOpen}>
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
