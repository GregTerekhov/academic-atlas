'use client';

import { ButtonType, MenuLinks, PositionInLayout } from 'types';

import { useMenu, usePopup } from 'context';

import { ModalTemplate } from 'template';
import PriceCalculator from '../../product-price-calculator';

interface IMenuTriggerProps {
  position: PositionInLayout;
}

export default function CalculationModalTrigger({ position }: IMenuTriggerProps) {
  const { isPopupOpen, popupRef, togglePopup } = usePopup();
  const { toggleCalcMenu, changeMenuContent } = useMenu();

  return (
    <>
      <button
        type={ButtonType.Button}
        onClick={position === PositionInLayout.Footer ? toggleCalcMenu : changeMenuContent}
        className={`${position === PositionInLayout.Footer ? 'text-sm md:text-base' : 'text-medium md:text-big'} hidden hocus:text-accentPrimary dark:text-whiteBase dark:hocus:text-accentPrimary max-lg:block`}
      >
        {MenuLinks.Cost}
      </button>
      <button
        type={ButtonType.Button}
        onClick={togglePopup}
        className='hidden hocus:text-accentPrimary dark:text-whiteBase dark:hocus:text-accentPrimary lg:block lg:text-big'
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
    </>
  );
}
