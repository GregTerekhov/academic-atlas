'use client';

import { createContext, useContext, useState, useRef, useCallback } from 'react';

import { type IWithChildren } from 'types';
import { useCalculation } from './CalculationProvider';
import { useCalculationResult } from './CalculationResultProvider';

interface IPopupRefs {
  [key: string]: React.RefObject<HTMLDivElement>;
}

interface IPopupContext {
  isPopupOpen: (id: string) => boolean;
  togglePopup: (id: string) => void;
  closePopup: (id: string) => void;
  popupRefs: React.MutableRefObject<IPopupRefs>;
  openPopups: { [key: string]: boolean };
  setBodyOverflow: (isHidden: boolean) => void;
  resetValues: () => void;
}

const PopupContext = createContext<IPopupContext | undefined>(undefined);

export const PopupProvider = ({ children }: IWithChildren) => {
  const [openPopups, setOpenPopups] = useState<{ [key: string]: boolean }>({});

  const { resetCalculation } = useCalculation();
  const { handleResetCostResult } = useCalculationResult();

  const popupRefs = useRef<IPopupRefs>({});

  const resetValues = useCallback(() => {
    handleResetCostResult();
    resetCalculation();
  }, [handleResetCostResult, resetCalculation]);

  const setBodyOverflow = useCallback((isHidden: boolean) => {
    document.body.style.overflow = isHidden ? 'hidden' : 'auto';
  }, []);

  const togglePopup = useCallback(
    (id: string) => {
      setOpenPopups((prev) => {
        const isPopupOpen = !prev[id];

        setBodyOverflow(isPopupOpen);

        if (!isPopupOpen) {
          resetValues();
        }

        return {
          ...prev,
          [id]: isPopupOpen,
        };
      });
    },
    [resetValues, setBodyOverflow],
  );

  const closePopup = useCallback(
    (id: string) => {
      resetValues();

      setOpenPopups((prev) => ({
        ...prev,
        [id]: false,
      }));
      setBodyOverflow(false);
    },
    [resetValues, setBodyOverflow],
  );

  const isPopupOpen = useCallback((id: string) => !!openPopups[id], [openPopups]);

  return (
    <PopupContext.Provider
      value={{
        isPopupOpen,
        togglePopup,
        closePopup,
        popupRefs,
        openPopups,
        setBodyOverflow,
        resetValues,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};
