'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export const useModalClose = () => {
  // const [changeModalState, setChangeModalState] = useState<'open' | 'close' | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleWindowClick = useCallback((event: MouseEvent): void => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
      document.body.style.overflow = 'auto';
      console.log('WEAREHERE', isModalOpen);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      setIsModalOpen(false);
      document.body.style.overflow = 'auto';
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousedown', handleWindowClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handleWindowClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, handleWindowClick]);

  const toggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  return {
    isModalOpen,
    modalRef,
    setIsModalOpen,
    toggleModal,
  };
};
