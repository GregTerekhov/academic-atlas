'use client';

import { ChangeEvent, createContext, useCallback, useContext, useState } from 'react';

import {
  type ICalculationData,
  type ICalculation,
  type IWithChildren,
  ExecutionTime,
  ExpertiseArea,
  Uniqueness,
  WorkType,
} from 'types';
import { isValidInput } from 'helpers';

interface ICalculationContext {
  calculationData: ICalculation;
  isChecked: boolean;
  handleOptionChange: <T extends keyof ICalculationData>(
    field: T,
    option: ICalculationData[T],
  ) => void;
  handleThemeInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRangeValueChange: (value: number) => void;
  handleCheckboxChange: (checked: boolean) => void;
  resetCalculation: () => void;
}

const CalculationContext = createContext<ICalculationContext | undefined>(undefined);

export const CalculationProvider = ({ children }: IWithChildren) => {
  const [calculationData, setCalculationData] = useState<ICalculation>({
    workType: WorkType.Default,
    expertiseArea: ExpertiseArea.Default,
    executionTime: ExecutionTime.Default,
    uniqueness: Uniqueness.Zero,
    theme: '',
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleOptionChange = <T extends keyof ICalculationData>(
    field: T,
    option: ICalculationData[T],
  ) => {
    setCalculationData((prevData) => ({ ...prevData, [field]: option }));
  };

  const handleThemeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value;

    if (isValidInput(newTheme)) {
      setCalculationData((prevData) => ({ ...prevData, theme: newTheme }));
    } else {
      console.warn('Недійсне введення');
    }
  };

  const handleRangeValueChange = useCallback((value: number) => {
    setCalculationData((prevData) => ({ ...prevData, uniqueness: value }));
  }, []);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const resetCalculation = () => {
    setCalculationData({
      workType: WorkType.Default,
      expertiseArea: ExpertiseArea.Default,
      executionTime: ExecutionTime.Default,
      uniqueness: Uniqueness.Zero,
      theme: '',
    });
    setIsChecked(false);
  };

  const contextValue = {
    isChecked,
    calculationData,
    handleOptionChange,
    handleThemeInputChange,
    handleRangeValueChange,
    handleCheckboxChange,
    resetCalculation,
  };

  return <CalculationContext.Provider value={contextValue}>{children}</CalculationContext.Provider>;
};

export const useCalculation = () => {
  const context = useContext(CalculationContext);

  if (context === undefined) {
    throw new Error('useCalculation must be used within an CalculationProvider');
  }
  return context;
};
