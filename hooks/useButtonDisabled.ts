'use client';

import { useEffect, useState } from 'react';

import {
  ExecutionTime,
  ExpertiseArea,
  type ICalculationData,
  Uniqueness,
  WorkType,
} from '../types';
import { findSelectedObject } from '../helpers';

export const useButtonDisabled = (calculationData: ICalculationData, isChecked: boolean) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { workType, expertiseArea, executionTime } = calculationData;

  useEffect(() => {
    const workTypeObject = findSelectedObject(workType);

    const liftedDisableState =
      (workTypeObject?.uniquenessPercentage === Uniqueness.Zero &&
        workType !== WorkType.Default &&
        expertiseArea !== ExpertiseArea.Default &&
        executionTime !== ExecutionTime.Default) ||
      isChecked;

    setIsButtonDisabled(!liftedDisableState);
  }, [executionTime, expertiseArea, workType, isChecked]);

  return { isButtonDisabled };
};
