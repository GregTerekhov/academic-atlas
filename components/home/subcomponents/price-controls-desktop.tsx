'use client';

import { AriaDescription, AriaId, PrimaryButtonLabel } from 'types';
import { usePricePopupControls } from 'hooks';

import { ModalTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import PriceCalculator from '../../calculation/product-price-calculator';

export default function PriceControlsDesktop() {
  const { popupId, popupRefs, hasSubmitData, togglePopup, isPopupOpen } = usePricePopupControls();

  return (
    <>
      <div className='hidden items-center justify-center lg:flex'>
        <PrimaryButtonUI
          handleClick={() => togglePopup(popupId)}
          ariaId={AriaId.CalculationModule}
          ariaDescription={AriaDescription.CalculationModule}
        >
          {PrimaryButtonLabel.CostCalculation}
        </PrimaryButtonUI>
      </div>
      <ModalTemplate
        id={popupId}
        closeModal={() => togglePopup(popupId)}
        modalRef={popupRefs.current[popupId]}
        isOpen={() => isPopupOpen(popupId)}
        hasSubmitData={hasSubmitData}
      >
        <PriceCalculator />
      </ModalTemplate>
    </>
  );
}