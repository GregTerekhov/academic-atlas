'use client';

import {
  // MobileMenuTemplate,
  ModalTemplate,
} from 'template';
import { PrimaryButtonUI } from 'ui';
import PriceCalculator from '../product-price-calculator';
import { usePopUp } from 'helpers/usePopUp';

export default function PriceControls() {
  const { isPopUpOpen, popUpRef, toggleModal } = usePopUp();

  return (
    <>
      <p>PriceControls</p>
      <PrimaryButtonUI handleClick={toggleModal}>Розрахувати вартість</PrimaryButtonUI>
      {/* {isOpenPrice && (
        <MobileMenuTemplate>
          <PriceCalculator />
        </MobileMenuTemplate>
      )} */}

      <ModalTemplate
        closeModal={toggleModal}
        title='MODAL TITLE'
        modalRef={popUpRef}
        isOpen={isPopUpOpen}
      >
        <PriceCalculator />
      </ModalTemplate>
    </>
  );
}
