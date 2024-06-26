'use client';

import { useEffect, useState } from 'react';

import { ICalculationData, Uniqueness } from '../types';
import { getWorkType } from '../helpers/calculationData';

export const usePlagiarismInputs = (calculationData: ICalculationData) => {
  const [isChecked, setIsChecked] = useState(false);
  const [rangeValue, setRangeValue] = useState(Uniqueness.Zero);

  useEffect(() => {
    const workTypeObject = getWorkType().find((work) => work.option === calculationData.workType);

    if (isChecked && workTypeObject) {
      const newRangeValue =
        workTypeObject.uniquenessPercentage === Uniqueness.Higher
          ? Uniqueness.Higher
          : Uniqueness.Standard;

      setRangeValue(newRangeValue);
    } else {
      setRangeValue(Uniqueness.Zero);
    }
  }, [calculationData.workType, isChecked]);

  const handleRangeChange = (value: number) => {
    setRangeValue(value);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  return {
    isChecked,
    rangeValue,
    handleRangeChange,
    handleCheckboxChange,
  };
};
