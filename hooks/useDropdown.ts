'use client';

import { useEffect, useRef, useState } from 'react';

import { DropdownOption } from '../types';
import { useMenu } from 'context';
import { useHandleClickOutside } from './useHandleClickOutside';

interface IUseDropdown {
  label: DropdownOption;
  onOptionSelect: (option: DropdownOption) => void;
}

export const useDropdown = ({ label: initialLabel, onOptionSelect }: IUseDropdown) => {
  const [selectedLabel, setSelectedLabel] = useState<DropdownOption>(initialLabel);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isCalcMenuOpen, isNavMenuOpen } = useMenu();
  const isMenuOpen = isCalcMenuOpen || isNavMenuOpen;

  useEffect(() => {
    const resetSelectedLabel = () => {
      setSelectedLabel(initialLabel);
      setIsOptionSelected(false);
    };

    if (!isMenuOpen) {
      resetSelectedLabel();
    }
  }, [initialLabel, isMenuOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedLabel(option);
    setIsOptionSelected(true);
    onOptionSelect(option);
    toggleDropdown();
  };

  useHandleClickOutside(dropdownRef, isDropdownOpen, () => setIsDropdownOpen(false));

  return {
    isDropdownOpen,
    dropdownRef,
    selectedLabel,
    isOptionSelected,
    toggleDropdown,
    handleOptionClick,
  };
};
