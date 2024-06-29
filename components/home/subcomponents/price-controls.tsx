'use client';

import { createRef } from 'react';

import { PopupID, PrimaryButtonLabel } from 'types';

import { useMenu, usePopup } from 'context';
import { useHandleClickOutside } from 'hooks';

import { MobileMenuTemplate, ModalTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import PriceCalculator from '../../calculation/product-price-calculator';

export default function PriceControls() {
  const { isPopupOpen, popupRefs, closePopup, togglePopup } = usePopup();
  const { isCalcMenuOpen, toggleCalcMenu } = useMenu();
  const popupId = PopupID.CostSection;

  if (!popupRefs.current[popupId]) {
    popupRefs.current[popupId] = createRef();
  }

  useHandleClickOutside(popupRefs.current[popupId], isPopupOpen(popupId), () =>
    closePopup(popupId),
  );

  return (
    <>
      <div className='hidden items-center justify-center lg:flex'>
        <PrimaryButtonUI handleClick={() => togglePopup(popupId)}>
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
          id={popupId}
          closeModal={() => togglePopup(popupId)}
          modalRef={popupRefs.current[popupId]}
          isOpen={() => isPopupOpen(popupId)}
        >
          <PriceCalculator />
        </ModalTemplate>
      </div>
    </>
  );
}
