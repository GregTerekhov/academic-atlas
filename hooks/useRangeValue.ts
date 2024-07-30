'use client';

import { useState, useEffect } from 'react';

import { type ICalculationData, Uniqueness } from '../types';
import { findSelectedObject } from 'helpers';

export const useRangeValue = (calculationData: ICalculationData, isChecked: boolean) => {
  const [rangeValue, setRangeValue] = useState(Uniqueness.Zero);

  useEffect(() => {
    const workTypeObject = findSelectedObject(calculationData.workType);

    const uniquenessMapping = {
      [Uniqueness.TeamPapers]: Uniqueness.TeamPapers,
      [Uniqueness.Standard]: Uniqueness.Standard,
      [Uniqueness.Higher]: Uniqueness.Higher,
      [Uniqueness.Highest]: Uniqueness.Highest,
    };

    const newRangeValue =
      isChecked && workTypeObject && workTypeObject.uniquenessPercentage
        ? uniquenessMapping[workTypeObject.uniquenessPercentage] ?? Uniqueness.Zero
        : Uniqueness.Zero;

    setRangeValue(newRangeValue);
  }, [calculationData.workType, isChecked]);

  const updateRangeValue = (value: number) => {
    setRangeValue(value);
  };

  const handleClearRangeValue = () => {
    setRangeValue(Uniqueness.Zero);
  };

  return { rangeValue, updateRangeValue, handleClearRangeValue };
};
