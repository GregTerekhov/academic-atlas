'use client';

import { useRef, useState } from 'react';

import { useHandleClickOutside } from './useHandleClickOutside';

export const useDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useHandleClickOutside(dropdownRef, isDropdownOpen, () => setIsDropdownOpen(false));

  return {
    isDropdownOpen,
    dropdownRef,
    toggleDropdown,
  };
};
