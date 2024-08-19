'use client';

import { useCallback, useEffect, useState } from 'react';

import { ThemeVariants, WorkType } from '../types';
import { useTheme } from '../context';
import { couldChooseUniqueness, getMinimalUniqueness } from '../helpers';

export const useRangeSettings = (
  workType: WorkType,
  isChecked: boolean,
  onChange: (value: number) => void,
) => {
  const [showMinimalText, setShowMinimalText] = useState(false);
  const couldChooseHigherUniqueness = couldChooseUniqueness(workType);
  const minimalUniqueness = getMinimalUniqueness(workType);

  const { theme } = useTheme();

  const updateThumbColor = useCallback(() => {
    const thumbColor = !isChecked
      ? 'var(--thumb-color-disabled)'
      : theme === ThemeVariants.DARK
        ? 'var(--thumb-color-dark)'
        : 'var(--thumb-color-light)';

    document.documentElement.style.setProperty('--thumb-color', thumbColor);
  }, [isChecked, theme]);

  useEffect(() => {
    setShowMinimalText(isChecked && couldChooseHigherUniqueness);

    updateThumbColor();
  }, [isChecked, couldChooseHigherUniqueness, updateThumbColor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
    setShowMinimalText(newValue <= minimalUniqueness);
  };

  const rangeInputClass = theme === ThemeVariants.DARK ? 'range-input-dark' : 'range-input-light';

  return { showMinimalText, rangeInputClass, handleChange, updateThumbColor };
};
