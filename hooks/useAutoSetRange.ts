'use client';

import { useEffect } from 'react';

import { Uniqueness } from '../types';
import { useCalculation } from 'context';
import { findSelectedObject, uniquenessMapping } from 'helpers';

export const useAutoSetRange = () => {
  const { calculationData, handleRangeValueChange, isChecked } = useCalculation();

  useEffect(() => {
    const workTypeObject = findSelectedObject(calculationData.workType);

    if (!workTypeObject) return;

    const { uniquenessPercentage: uniqueness } = workTypeObject;

    const newRangeValue =
      isChecked && uniqueness ? uniquenessMapping[uniqueness] ?? Uniqueness.Zero : Uniqueness.Zero;

    handleRangeValueChange(newRangeValue);
  }, [calculationData.workType, handleRangeValueChange, isChecked]);
};
