'use client';

import { useMemo } from 'react';

import { type ICalculationData } from '../types';
import { checkCalculationField, necessaryWorkType } from '../helpers';

export const usePlagiarismCheck = (calculationData: ICalculationData) => {
  const shouldPlagiarismCheck = useMemo(() => {
    const isNotDefaultData = checkCalculationField(calculationData);

    return isNotDefaultData && necessaryWorkType.includes(calculationData.workType);
  }, [calculationData]);

  return {
    shouldPlagiarismCheck,
  };
};
