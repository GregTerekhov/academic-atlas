'use client';

import { createRef, useEffect } from 'react';

import { PopupID } from '../types';
import { usePopup } from 'context';
import { useHandleClickOutside } from './useHandleClickOutside';

export const usePricePopupControls = () => {
  const { isPopupOpen, popupRefs, closePopup, togglePopup } = usePopup();
  const popupId = PopupID.CostSection;

  useEffect(() => {
    if (!popupRefs.current[popupId]) {
      popupRefs.current[popupId] = createRef<HTMLDivElement>();
    }
  }, [popupId, popupRefs]);

  useHandleClickOutside(popupRefs.current[popupId], isPopupOpen(popupId), () =>
    closePopup(popupId),
  );

  return {
    popupId,
    popupRefs,
    isPopupOpen,
    togglePopup,
  };
};
