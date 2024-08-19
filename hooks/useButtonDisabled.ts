'use client';

import { useEffect, useState } from 'react';

import { type ICalculationData, Uniqueness } from '../types';
import { checkCalculationField, findSelectedObject } from '../helpers';

export const useButtonDisabled = (calculationData: ICalculationData, isChecked: boolean) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { workType, expertiseArea, executionTime } = calculationData;
  const validField = checkCalculationField(calculationData);

  const workTypeObject = findSelectedObject(workType);
  useEffect(() => {
    // Determine if the button should be enabled based on several conditions
    const liftedDisableState =
      (workTypeObject?.uniquenessPercentage === Uniqueness.Zero && validField) || isChecked;

    setIsButtonDisabled(!liftedDisableState);
  }, [
    executionTime,
    expertiseArea,
    workType,
    isChecked,
    validField,
    workTypeObject?.uniquenessPercentage,
  ]);

  return { isButtonDisabled };
};
