'use client';

import { createContext, useContext, useState, useRef, ReactNode } from 'react';

import { useHandleClickOutside } from 'helpers';

interface IPopupContext {
  isPopupOpen: boolean;
  togglePopup: () => void;
  popupRef: React.RefObject<HTMLDivElement>;
}

const PopupContext = createContext<IPopupContext | undefined>(undefined);

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);

    if (!isPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = 'auto';
  };

  useHandleClickOutside(popupRef, isPopupOpen, closePopup);

  return (
    <PopupContext.Provider value={{ isPopupOpen, togglePopup, popupRef }}>
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
