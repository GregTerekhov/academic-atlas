'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export const usePopUp = () => {
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

  const popUpRef = useRef<HTMLDivElement>(null);

  const handleWindowClick = useCallback(
    (event: MouseEvent): void => {
      const isPopup = popUpRef.current && !popUpRef.current.contains(event.target as Node);

      if (isPopup) {
        if (isDropdownOpened) {
          setIsDropdownOpened(false);
        }

        if (isPopUpOpen) {
          setIsPopUpOpen(false);
          document.body.style.overflow = 'auto';
        }
      }
    },
    [isPopUpOpen, isDropdownOpened],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        if (isPopUpOpen) {
          setIsPopUpOpen(false);
          document.body.style.overflow = 'auto';
        }
      }
    },
    [isPopUpOpen],
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleWindowClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handleWindowClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, handleWindowClick]);

  const toggleDropdown = (): void => {
    setIsDropdownOpened(!isDropdownOpened);
  };

  const toggleModal = (): void => {
    setIsPopUpOpen(!isPopUpOpen);

    !isPopUpOpen // FIXME: --- Find an option to specify the appropriate value
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  };

  return {
    isDropdownOpened,
    popUpRef,
    isPopUpOpen,
    toggleDropdown,
    toggleModal,
  };
};
