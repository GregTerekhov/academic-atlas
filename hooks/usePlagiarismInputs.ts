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
    let newRangeValue: number = Uniqueness.Zero;

    if (isChecked && workTypeObject) {
      if (workTypeObject.uniquenessPercentage === Uniqueness.TeamPapers) {
        newRangeValue = Uniqueness.TeamPapers;
      } else if (workTypeObject.uniquenessPercentage === Uniqueness.Standard) {
        newRangeValue = Uniqueness.Standard;
      } else if (workTypeObject.uniquenessPercentage === Uniqueness.Higher) {
        newRangeValue = Uniqueness.Higher;
      } else {
        newRangeValue = Uniqueness.Highest;
      }
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
