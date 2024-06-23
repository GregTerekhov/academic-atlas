'use client';

import { useEffect, useState } from 'react';

import { ICalculationData, WorkType } from '../types';
import { isCalculationDataValid } from './calculationHelper';

export const usePlagiarismCheck = (calculationData: ICalculationData) => {
  const [shouldPlagiarismCheck, setShouldPlagiarismCheck] = useState(false);

  useEffect(() => {
    const necessaryWorkType = [
      WorkType.Diplomas,
      WorkType.TeamPapers,
      WorkType.BachelorTheses,
      WorkType.Abstracts,
    ];

    const hasData = isCalculationDataValid(calculationData);

    const showInputs = hasData && necessaryWorkType.includes(calculationData.workType);

    setShouldPlagiarismCheck(showInputs ? true : false);
  }, [calculationData]);

  return {
    shouldPlagiarismCheck,
  };
};
