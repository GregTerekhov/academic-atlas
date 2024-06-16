'use client';

import { ButtonType, MenuLinks, PositionInLayout } from 'types';

import { usePopup } from 'context';

import { MobileMenuTemplate, ModalTemplate } from 'template';
import { PriceCalculator } from 'components';

interface IMenuTriggerProps {
  position: PositionInLayout;
}

export default function CalculationModalTrigger({ position }: IMenuTriggerProps) {
  const { isPopupOpen, popupRef, togglePopup } = usePopup();
  return (
    <>
      <button
        type={ButtonType.Button}
        onClick={togglePopup}
        className={`${position === PositionInLayout.Footer ? 'text-sm md:text-base lg:text-big' : 'text-medium md:text-big'} hocus:text-accentPrimary dark:text-whiteBase dark:hocus:text-accentPrimary`}
      >
        {MenuLinks.Cost}
      </button>
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
      <div className='hidden max-lg:block'>
        <MobileMenuTemplate isOpen={isPopupOpen}>
          <PriceCalculator />
        </MobileMenuTemplate>
      </div>
    </>
  );
}
