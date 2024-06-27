'use client';

import { useEffect, useState } from 'react';

import { type ICalculationData, WorkType } from '../types';
import { checkCalculationField } from '../helpers';

export const usePlagiarismCheck = (calculationData: ICalculationData) => {
  const [shouldPlagiarismCheck, setShouldPlagiarismCheck] = useState(false);

  useEffect(() => {
    const necessaryWorkType = [
      WorkType.Diplomas,
      WorkType.TeamPapers,
      WorkType.BachelorTheses,
      WorkType.Abstracts,
    ];

    const isNotDefaultData = checkCalculationField(calculationData);

    const showInputs = isNotDefaultData && necessaryWorkType.includes(calculationData.workType);

    setShouldPlagiarismCheck(showInputs ? true : false);
  }, [calculationData]);

  return {
    shouldPlagiarismCheck,
  };
};
