'use client';

import { useMemo } from 'react';

import { type ICalculationData } from '../types';
import { checkCalculationField, checkValidWorkType } from '../helpers';

export const usePlagiarismCheck = (calculationData: ICalculationData) => {
  const shouldPlagiarismCheck = useMemo(() => {
    const isNotDefaultData = checkCalculationField(calculationData);
    const validType = checkValidWorkType(calculationData.workType);

    return isNotDefaultData && validType;
  }, [calculationData]);

  return {
    shouldPlagiarismCheck,
  };
};
