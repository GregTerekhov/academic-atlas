import { createRef } from 'react';

import { PopupID } from '../types';
import { useCalculationResult, usePopup } from 'context';
import { useHandleClickOutside } from './useHandleClickOutside';

export const usePricePopupControls = () => {
  const { isPopupOpen, popupRefs, closePopup, togglePopup } = usePopup();
  const { hasSubmitData } = useCalculationResult();
  const popupId = PopupID.CostSection;

  if (!popupRefs.current[popupId]) {
    popupRefs.current[popupId] = createRef();
  }

  useHandleClickOutside(popupRefs.current[popupId], isPopupOpen(popupId), () =>
    closePopup(popupId),
  );

  return {
    popupId,
    popupRefs,
    hasSubmitData,
    isPopupOpen,
    togglePopup,
  };
};
