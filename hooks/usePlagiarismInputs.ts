'use client';

import { useEffect, useState } from 'react';

import { type ICalculationData, Uniqueness } from '../types';
import { getWorkType } from '../helpers';

export const usePlagiarismInputs = (calculationData: ICalculationData, isChecked: boolean) => {
  const [rangeValue, setRangeValue] = useState(Uniqueness.Zero);

  const { workType } = calculationData;

  useEffect(() => {
    const workTypeObject = getWorkType().find((work) => work.option === workType);

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
  }, [workType, isChecked]);

  const handleRangeChange = (value: number) => {
    setRangeValue(value);
  };

  return {
    isChecked,
    rangeValue,
    handleRangeChange,
  };
};
