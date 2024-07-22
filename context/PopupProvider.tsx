'use client';

import { createContext, useContext, useState, useRef, ReactNode, useCallback } from 'react';

import { useCalculation } from './CalculationProvider';

interface IPopupRefs {
  [key: string]: React.RefObject<HTMLDivElement>;
}

interface IPopupContext {
  isPopupOpen: (id: string) => boolean;
  togglePopup: (id: string) => void;
  closePopup: (id: string) => void;
  popupRefs: React.MutableRefObject<IPopupRefs>;
}

const PopupContext = createContext<IPopupContext | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [openPopups, setOpenPopups] = useState<{ [key: string]: boolean }>({});

  const { resetCalculation, handleResetCostResult, handleCheckboxChange } = useCalculation();

  const popupRefs = useRef<IPopupRefs>({});

  const resetValues = useCallback(() => {
    handleResetCostResult();
    handleCheckboxChange(false);
    resetCalculation();
  }, [handleCheckboxChange, handleResetCostResult, resetCalculation]);

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
    <PopupContext.Provider value={{ isPopupOpen, togglePopup, closePopup, popupRefs }}>
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
