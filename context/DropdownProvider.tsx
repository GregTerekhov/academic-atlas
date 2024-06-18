'use client';

import { createContext, ReactNode, useContext, useState, useRef } from 'react';
import { useHandleClickOutside } from 'helpers';

interface IDropdownContext {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const DropdownContext = createContext<IDropdownContext | undefined>(undefined);

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useHandleClickOutside(dropdownRef, isDropdownOpen, () => setIsDropdownOpen(false));

  return (
    <DropdownContext.Provider value={{ isDropdownOpen, toggleDropdown, dropdownRef }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};
