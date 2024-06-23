'use client';

import { useEffect, useState } from 'react';

import { ICalculationData, Uniqueness } from '../types';
import { getWorkType } from './calculationData';

export const useButtonDisabled = (calculationData: ICalculationData, isChecked: boolean) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const workTypeObject = getWorkType().find((work) => work.option === calculationData.workType);

    const liftedDisableState =
      (workTypeObject &&
        workTypeObject.uniquenessPercentage === Uniqueness.Zero &&
        calculationData.expertiseArea &&
        calculationData.executionTime) ||
      isChecked;

    setIsButtonDisabled(!liftedDisableState);
  }, [
    calculationData.executionTime,
    calculationData.expertiseArea,
    calculationData.workType,
    isChecked,
  ]);

  return { isButtonDisabled };
};
