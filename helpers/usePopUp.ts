'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export const usePopUp = () => {
  const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [closeSeparator, setCloseSeparator] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleWindowClick = useCallback((event: MouseEvent): void => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpened(false);
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        if (isModalOpen) {
          setIsModalOpen(false);
        }

        if (isDropdownOpened) {
          setIsDropdownOpened(false);
        }
      }
    },
    [isDropdownOpened, isModalOpen],
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
    setCloseSeparator(!closeSeparator);
  };

  const toggleModal = (): void => {
    setIsModalOpen(!isModalOpen);

    //Условие для отключения скролла. Из-за того, что состояние асинхронное отключать скролл нужно при !isModalOpen, иначе функция будет работать некорректно
    if (!isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return {
    isDropdownOpened,
    modalRef,
    isModalOpen,
    dropdownRef,
    toggleDropdown,
    toggleModal,
  };
};
