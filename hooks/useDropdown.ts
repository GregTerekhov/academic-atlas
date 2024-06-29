'use client';

import { useRef, useState } from 'react';

import { DropdownOption } from '../types';

import { useHandleClickOutside } from './useHandleClickOutside';

interface IUseDropdown {
  label: DropdownOption;
  onOptionSelect: (option: DropdownOption) => void;
}

export const useDropdown = ({ label: initialLabel, onOptionSelect }: IUseDropdown) => {
  // const [selectedLabel, setSelectedLabel] = useState<T>(label);
  const [selectedLabel, setSelectedLabel] = useState<DropdownOption>(initialLabel);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const resetSelectedLabel = () => {
    setSelectedLabel(initialLabel);
    setIsOptionSelected(false);
  };

  // const handleOptionClick = (option: T) => {
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
    resetSelectedLabel,
    handleOptionClick,
  };
};
