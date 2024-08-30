'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { DropdownOption, PopupID } from '../types';
import { useMenu, usePopup } from 'context';
import { useHandleClickOutside } from './useHandleClickOutside';

interface IUseDropdownProps {
  label: DropdownOption;
  onOptionSelect: (option: DropdownOption) => void;
}

export const useDropdown = ({ label: initialLabel, onOptionSelect }: IUseDropdownProps) => {
  const [selectedLabel, setSelectedLabel] = useState<DropdownOption>(initialLabel);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isCalcMenuOpen, isNavMenuOpen } = useMenu();
  const { isPopupOpen } = usePopup();
  const isOverlayOpen =
    isCalcMenuOpen ||
    isNavMenuOpen ||
    isPopupOpen(PopupID.FooterMenu) ||
    isPopupOpen(PopupID.CostSection);

  const resetSelectedLabel = useCallback(() => {
    setSelectedLabel(initialLabel);
    setIsOptionSelected(false);
  }, [initialLabel]);

  useEffect(() => {
    if (!isOverlayOpen) {
      resetSelectedLabel();
    }
  }, [isOverlayOpen, resetSelectedLabel]);

  const handleOptionClick = (option: DropdownOption) => {
    if (option !== selectedLabel) {
      setSelectedLabel(option);
      setIsOptionSelected(true);
      onOptionSelect(option);
      closeDropdown();
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (
      e.type === 'click' ||
      (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Enter') ||
      (e.type === 'keydown' && (e as React.KeyboardEvent).key === ' ')
    ) {
      setIsDropdownOpen((prevState) => !prevState);
    }
  };

  useHandleClickOutside(dropdownRef, isDropdownOpen, closeDropdown);

  return {
    isDropdownOpen,
    dropdownRef,
    selectedLabel,
    isOptionSelected,
    toggleDropdown,
    handleOptionClick,
    resetSelectedLabel,
  };
};
