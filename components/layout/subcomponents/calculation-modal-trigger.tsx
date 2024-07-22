'use client';

import { createRef } from 'react';

import { AriaLabel, ButtonType, MenuLinks, PopupID, PositionInLayout } from 'types';
import { useMenu, usePopup } from 'context';
import { useHandleClickOutside } from 'hooks';

import { ModalTemplate, MobileMenuTemplate } from 'template';
import PriceCalculator from '../../calculation/product-price-calculator';

interface IMenuTriggerProps {
  position: PositionInLayout;
}

export default function CalculationModalTrigger({ position }: IMenuTriggerProps) {
  const { isPopupOpen, popupRefs, closePopup, togglePopup } = usePopup();
  const { isCalcMenuOpen, toggleCalcMenu, changeMenuContent } = useMenu();
  const popupId = PopupID.FooterMenu;

  if (!popupRefs.current[popupId]) {
    popupRefs.current[popupId] = createRef();
  }

  useHandleClickOutside(popupRefs.current[popupId], isPopupOpen(popupId), () =>
    closePopup(popupId),
  );

  const onCostLinkClick = () => {
    if (position === PositionInLayout.Footer) {
      toggleCalcMenu();
    } else {
      changeMenuContent();
    }
  };

  const commonButtonStyles =
    'hidden hocus:text-accentPrimary dark:text-whiteBase dark:hocus:text-accentSecondary';

  return (
    <>
      <button
        type={ButtonType.Button}
        onClick={onCostLinkClick}
        className={`${position === PositionInLayout.Footer ? 'text-start text-sm max-sm:text-xs md:text-base' : 'text-medium md:text-big'} ${commonButtonStyles} max-lg:block`}
        aria-label={AriaLabel.CalculationModule}
      >
        {MenuLinks.Cost}
      </button>
      <button
        type={ButtonType.Button}
        onClick={() => togglePopup(popupId)}
        className={`${commonButtonStyles} lg:block lg:text-big`}
        aria-label={AriaLabel.CalculationModule}
      >
        {MenuLinks.Cost}
      </button>
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
