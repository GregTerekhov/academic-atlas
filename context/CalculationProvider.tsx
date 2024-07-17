'use client';

import { createContext, useContext, useState, ReactNode, ChangeEvent, useEffect } from 'react';

import {
  type ICalculationData,
  ExecutionTime,
  ExpertiseArea,
  Uniqueness,
  WorkType,
} from '../types';
import { getWorkType } from 'helpers';

interface ICalculationContext {
  calculationData: ICalculation;
  isChecked: boolean;
  rangeValue: Uniqueness;
  hasSubmitData: boolean;
  handleOptionChange: <T extends keyof ICalculationData>(
    field: T,
    option: ICalculationData[T],
  ) => void;
  handleThemeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetCalculation: () => void;
  handleShowCostResult: () => void;
  handleResetCostResult: () => void;
  handleCheckboxChange: (checked: boolean) => void;
  handleRangeChange: (value: number) => void;
}

interface ICalculation extends ICalculationData {
  uniqueness?: number;
  theme?: string;
}

const CalculationContext = createContext<ICalculationContext | undefined>(undefined);

export const CalculationProvider = ({ children }: { children: ReactNode }) => {
  const [hasSubmitData, setHasSubmitData] = useState(false);
  const [rangeValue, setRangeValue] = useState(Uniqueness.Zero);
  const [isChecked, setIsChecked] = useState(false);
  const [calculationData, setCalculationData] = useState<ICalculation>({
    workType: WorkType.Default,
    expertiseArea: ExpertiseArea.Default,
    executionTime: ExecutionTime.Default,
    uniqueness: Uniqueness.Zero,
    theme: '',
  });

  useEffect(() => {
    const workTypeObject = getWorkType().find((work) => work.option === calculationData.workType);

    const uniquenessMapping = {
      [Uniqueness.TeamPapers]: Uniqueness.TeamPapers,
      [Uniqueness.Standard]: Uniqueness.Standard,
      [Uniqueness.Higher]: Uniqueness.Higher,
      [Uniqueness.Highest]: Uniqueness.Highest,
    };

    const newRangeValue =
      isChecked && workTypeObject && workTypeObject.uniquenessPercentage
        ? uniquenessMapping[workTypeObject.uniquenessPercentage] ?? Uniqueness.Zero
        : Uniqueness.Zero;

    setRangeValue(newRangeValue);
  }, [calculationData.workType, isChecked]);

  const handleOptionChange = <T extends keyof ICalculationData>(
    field: T,
    option: ICalculationData[T],
  ) => {
    setCalculationData((prevData) => ({ ...prevData, [field]: option }));
  };

  const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value;
    setCalculationData((prevData) => ({ ...prevData, theme: newTheme }));
  };

  const handleRangeChange = (value: number) => {
    setCalculationData((prevData) => ({ ...prevData, uniqueness: value }));
    setRangeValue(value);
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

  const handleShowCostResult = () => {
    setHasSubmitData(true);
  };

  const handleResetCostResult = () => {
    setHasSubmitData(false);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <CalculationContext.Provider
      value={{
        hasSubmitData,
        isChecked,
        rangeValue,
        calculationData,
        handleOptionChange,
        handleThemeChange,
        resetCalculation,
        handleShowCostResult,
        handleResetCostResult,
        handleCheckboxChange,
        handleRangeChange,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
};

export const useCalculation = () => {
  const context = useContext(CalculationContext);
  if (context === undefined) {
    throw new Error('useCalculation must be used within a CalculationProvider');
  }
  return context;
};
