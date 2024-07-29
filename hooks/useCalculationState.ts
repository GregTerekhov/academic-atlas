'use client';

import { useState } from 'react';

import {
  type ICalculationData,
  ExecutionTime,
  ExpertiseArea,
  Uniqueness,
  WorkType,
} from '../types';

interface ICalculation extends ICalculationData {
  uniqueness?: number;
  theme?: string;
}

export const useCalculationState = () => {
  const [calculationData, setCalculationData] = useState<ICalculation>({
    workType: WorkType.Default,
    expertiseArea: ExpertiseArea.Default,
    executionTime: ExecutionTime.Default,
    uniqueness: Uniqueness.Zero,
    theme: '',
  });

  const handleOptionChange = <T extends keyof ICalculationData>(
    field: T,
    option: ICalculationData[T],
  ) => {
    setCalculationData((prevData) => ({ ...prevData, [field]: option }));
  };

  const handleThemeChange = (newTheme: string) => {
    setCalculationData((prevData) => ({ ...prevData, theme: newTheme }));
  };

  const handleRangeChange = (value: number) => {
    setCalculationData((prevData) => ({ ...prevData, uniqueness: value }));
  };

  const resetCalculation = () => {
    setCalculationData({
      workType: WorkType.Default,
      expertiseArea: ExpertiseArea.Default,
      executionTime: ExecutionTime.Default,
      uniqueness: Uniqueness.Zero,
      theme: '',
    });
  };

  return {
    calculationData,
    handleOptionChange,
    handleThemeChange,
    handleRangeChange,
    resetCalculation,
  };
};
