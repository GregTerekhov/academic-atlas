import { AriaLabel, ButtonType, MenuLinks } from 'types';
import { useCalculationResult } from 'context';
import { usePricePopupControls } from 'hooks';

import { ModalTemplate } from 'template';
import PriceCalculator from '../../calculation/product-price-calculator';

export default function CalculationLinkDesktop() {
  const { popupId, popupRefs, togglePopup, isPopupOpen } = usePricePopupControls();
  const { hasSubmitData } = useCalculationResult();

  const commonButtonStyles =
    'hidden hocus:text-accentPrimary dark:text-whiteBase dark:hocus:text-accentSecondary';
  return (
    <>
      <button
        type={ButtonType.Button}
        onClick={() => togglePopup(popupId)}
        className={`${commonButtonStyles} lg:block lg:text-big`}
        aria-label={AriaLabel.CalculationModule}
      >
        {MenuLinks.Cost}
      </button>
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
