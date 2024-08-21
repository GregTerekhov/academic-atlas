'use client';

import { useMemo } from 'react';

import { useCalculation } from 'context';
import { checkCalculationField, checkValidWorkType } from '../helpers';

export const usePlagiarismCheck = () => {
  const { calculationData } = useCalculation();

  const shouldPlagiarismCheck = useMemo(() => {
    const isNotDefaultData = checkCalculationField(calculationData);
    const validType = checkValidWorkType(calculationData.workType);

    return isNotDefaultData && validType;
  }, [calculationData]);

  return {
    shouldPlagiarismCheck,
  };
};
