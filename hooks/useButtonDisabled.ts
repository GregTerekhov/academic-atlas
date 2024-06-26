'use client';

import { useEffect, useState } from 'react';

import { ICalculationData, Uniqueness } from '../types';
import { getWorkType } from '../helpers/calculationData';

export const useButtonDisabled = (calculationData: ICalculationData, isChecked: boolean) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { workType, expertiseArea, executionTime } = calculationData;

  useEffect(() => {
    const workTypeObject = getWorkType().find((work) => work.option === workType);

    const liftedDisableState =
      (workTypeObject &&
        workTypeObject.uniquenessPercentage === Uniqueness.Zero &&
        expertiseArea &&
        executionTime) ||
      isChecked;

    setIsButtonDisabled(!liftedDisableState);
  }, [executionTime, expertiseArea, workType, isChecked]);

  return { isButtonDisabled };
};
