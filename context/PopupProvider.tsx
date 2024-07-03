'use client';

import {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';

import { useCalculation } from './CalculationProvider';
import { checkCalculationField } from 'helpers';

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
  const [isValidData, setIsValidData] = useState(false);

  const { calculationData, resetCalculation, handleResetCostResult, handleCheckboxChange } =
    useCalculation();

  const popupRefs = useRef<IPopupRefs>({});

  useEffect(() => {
    const isNotDefaultData = checkCalculationField(calculationData);

    setIsValidData(isNotDefaultData);
  }, [calculationData]);

  const togglePopup = useCallback(
    (id: string) => {
      setOpenPopups((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));

      const isPopupOpen = !openPopups[id];

      if (isPopupOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
        handleResetCostResult();
        handleCheckboxChange(false);
        if (isValidData) {
          resetCalculation();
        }
      }
    },
    [handleCheckboxChange, handleResetCostResult, isValidData, openPopups, resetCalculation],
  );

  const closePopup = useCallback(
    (id: string) => {
      handleResetCostResult();
      handleCheckboxChange(false);
      setOpenPopups((prev) => ({
        ...prev,
        [id]: false,
      }));
      document.body.style.overflow = 'auto';
      if (isValidData) {
        resetCalculation();
      }
    },
    [handleCheckboxChange, handleResetCostResult, isValidData, resetCalculation],
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
