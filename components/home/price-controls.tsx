'use client';

import {
  // MobileMenuTemplate,
  ModalTemplate,
} from 'template';
import { PrimaryButtonUI } from 'ui';
import PriceCalculator from '../product-price-calculator';
import { useModalClose } from 'helpers/useModalClose';

export default function PriceControls() {
  const { isModalOpen, setIsModalOpen } = useModalClose();

  const handleModalOpen = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <p>PriceControls</p>
      <PrimaryButtonUI handleClick={handleModalOpen}>Розрахувати вартість</PrimaryButtonUI>
      {/* {isOpenPrice && (
        <MobileMenuTemplate>
          <PriceCalculator />
        </MobileMenuTemplate>
      )} */}
      {isModalOpen && (
        <ModalTemplate
          closeModal={handleModalClose}
          title='MODAL TITLE'
        >
          <PriceCalculator />
        </ModalTemplate>
      )}
    </>
  );
}
