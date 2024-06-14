'use client';

import { usePopUp } from 'helpers';

import {
  // MobileMenuTemplate,
  ModalTemplate,
} from 'template';
import { PrimaryButtonUI } from 'ui';
import PriceCalculator from '../product-price-calculator';

export default function PriceControls() {
  const { isPopUpOpen, popUpRef, toggleModal } = usePopUp();

  return (
    <>
      <div className='mt-8 flex items-center justify-center lg:mt-20'>
        <PrimaryButtonUI handleClick={toggleModal}>Розрахувати вартість</PrimaryButtonUI>
        {/* {isOpenPrice && (
        <MobileMenuTemplate>
          <PriceCalculator />
        </MobileMenuTemplate>
      )} */}
      </div>
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
