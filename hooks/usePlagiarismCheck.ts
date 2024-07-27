'use client';

import { useMemo } from 'react';

import { type ICalculationData, WorkType } from '../types';
import { checkCalculationField } from '../helpers';

export const usePlagiarismCheck = (calculationData: ICalculationData) => {
  const shouldPlagiarismCheck = useMemo(() => {
    const necessaryWorkType = [
      WorkType.Diplomas,
      WorkType.TeamPapers,
      WorkType.BachelorTheses,
      WorkType.MasterTheses,
      WorkType.Abstracts,
    ];

    const isNotDefaultData = checkCalculationField(calculationData);

    return isNotDefaultData && necessaryWorkType.includes(calculationData.workType);
  }, [calculationData]);

  return {
    shouldPlagiarismCheck,
  };
};
