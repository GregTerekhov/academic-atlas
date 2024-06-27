'use client';

import { ButtonType, MenuLinks, PositionInLayout } from 'types';

import { useMenu, usePopup } from 'context';

import { ModalTemplate } from 'template';
import PriceCalculator from '../../calculation/product-price-calculator';

interface IMenuTriggerProps {
  position: PositionInLayout;
}

export default function CalculationModalTrigger({ position }: IMenuTriggerProps) {
  const { isPopupOpen, popupRef, togglePopup } = usePopup();
  const { toggleCalcMenu, changeMenuContent } = useMenu();

  const onCostLinkClick = () => {
    if (position === PositionInLayout.Footer) {
      toggleCalcMenu();
    } else {
      changeMenuContent();
    }
  };

  const commonButtonStyles =
    'hidden hocus:text-accentPrimary dark:text-whiteBase dark:hocus:text-accentPrimary';

  return (
    <>
      <button
        type={ButtonType.Button}
        onClick={onCostLinkClick}
        className={`${position === PositionInLayout.Footer ? 'text-sm md:text-base' : 'text-medium md:text-big'} ${commonButtonStyles} max-lg:block`}
      >
        {MenuLinks.Cost}
      </button>
      <button
        type={ButtonType.Button}
        onClick={togglePopup}
        className={`${commonButtonStyles} lg:block lg:text-big`}
      >
        {MenuLinks.Cost}
      </button>
      {/* check the need to use a template for the menu */}
      <div className='hidden lg:block'>
        <ModalTemplate
          closeModal={togglePopup}
          modalRef={popupRef}
          isOpen={isPopupOpen}
        >
          <PriceCalculator />
        </ModalTemplate>
      </div>
    </>
  );
}
