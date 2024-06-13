'use client';

import {
  // MobileMenuTemplate,
  ModalTemplate,
} from 'template';
import { PrimaryButtonUI } from 'ui';
import PriceCalculator from '../product-price-calculator';
import { usePopUp } from 'helpers/usePopUp';

export default function PriceControls() {
  const {
    isModalOpen,
    // modalRef,
    toggleModal,
  } = usePopUp();

  return (
    <>
      <p>PriceControls</p>
      <PrimaryButtonUI handleClick={toggleModal}>Розрахувати вартість</PrimaryButtonUI>
      {/* {isOpenPrice && (
        <MobileMenuTemplate>
          <PriceCalculator />
        </MobileMenuTemplate>
      )} */}
      {isModalOpen && (
        <ModalTemplate
          closeModal={toggleModal}
          title='MODAL TITLE'
          // ref={modalRef}
        >
          <PriceCalculator />
        </ModalTemplate>
      )}
    </>
  );
}
