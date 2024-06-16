'use client';

import { useCallback, useEffect } from 'react';

export const useHandleClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  isOpen: boolean,
  onClose: () => void,
) => {
  const handleWindowClick = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose, ref],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    window.addEventListener('mousedown', handleWindowClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handleWindowClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, handleWindowClick]);
};
