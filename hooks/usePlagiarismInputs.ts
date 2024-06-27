'use client';

import { useEffect, useState } from 'react';

import { type ICalculationData, Uniqueness } from '../types';
import { getWorkType } from '../helpers';

export const usePlagiarismInputs = (calculationData: ICalculationData) => {
  const [isChecked, setIsChecked] = useState(false);
  const [rangeValue, setRangeValue] = useState(Uniqueness.Zero);

  const { workType } = calculationData;

  useEffect(() => {
    const workTypeObject = getWorkType().find((work) => work.option === workType);

    if (isChecked && workTypeObject) {
      const newRangeValue =
        workTypeObject.uniquenessPercentage === Uniqueness.Higher
          ? Uniqueness.Higher
          : Uniqueness.Standard;

      setRangeValue(newRangeValue);
    } else {
      setRangeValue(Uniqueness.Zero);
    }
  }, [workType, isChecked]);

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
