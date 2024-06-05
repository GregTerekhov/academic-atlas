import { useCallback, useEffect, useRef, useState } from 'react';

export const useDropdown = () => {
  const [isOpened, setIsOpened] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleWindowClick = useCallback((event: MouseEvent): void => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpened(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      setIsOpened(false);
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

  const toggleDropdown = (): void => {
    setIsOpened(!isOpened);
  };

  return { isOpened, dropdownRef, toggleDropdown };
};
