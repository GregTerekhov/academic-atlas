'use client';

import { useCallback, useEffect, useState } from 'react';

import { ThemeVariants } from '../types';
import { useCalculation, useTheme } from '../context';
import { couldChooseUniqueness, getMinimalUniqueness } from '../helpers';

export const useRangeSettings = () => {
  const [showMinimalText, setShowMinimalText] = useState(false);
  const { isChecked, calculationData, handleRangeValueChange } = useCalculation();
  const couldChooseHigherUniqueness = couldChooseUniqueness(calculationData.workType);
  const minimalUniqueness = getMinimalUniqueness(calculationData.workType);

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
    handleRangeValueChange(newValue);
    setShowMinimalText(newValue <= minimalUniqueness);
  };

  const rangeInputClass = theme === ThemeVariants.DARK ? 'range-input-dark' : 'range-input-light';

  return { showMinimalText, rangeInputClass, handleChange, updateThumbColor };
};
