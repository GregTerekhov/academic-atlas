'use client';

import { createContext, useContext, useState, ChangeEvent } from 'react';

import { type ICalculationData, type IWithChildren, Uniqueness } from '../types';
import { isValidInput } from 'helpers';
import { useCalculationState, useRangeValue } from 'hooks';

interface IOptionSelectionContext {
  calculationData: ICalculation;
  isChecked: boolean;
  rangeValue: Uniqueness;
  handleOptionChange: <T extends keyof ICalculationData>(
    field: T,
    option: ICalculationData[T],
  ) => void;
  handleThemeInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (checked: boolean) => void;
  handleRangeValueChange: (value: number) => void;
  resetCalculation: () => void;
}

interface ICalculation extends ICalculationData {
  uniqueness?: number;
  theme?: string;
}

const OptionSelectionContext = createContext<IOptionSelectionContext | undefined>(undefined);

export const OptionSelectionProvider = ({ children }: IWithChildren) => {
  const [isChecked, setIsChecked] = useState(false);
  const {
    calculationData,
    handleOptionChange,
    handleThemeChange,
    handleRangeChange,
    resetCalculation,
  } = useCalculationState();
  const { rangeValue, updateRangeValue } = useRangeValue(calculationData, isChecked);

  const handleThemeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value;

    if (isValidInput(newTheme)) {
      handleThemeChange(newTheme);
    } else {
      console.warn('Недійсне введення');
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleRangeValueChange = (value: number) => {
    updateRangeValue(value);
    handleRangeChange(value);
  };

  return (
    <OptionSelectionContext.Provider
      value={{
        isChecked,
        rangeValue,
        calculationData,
        handleOptionChange,
        handleThemeInputChange,
        handleCheckboxChange,
        handleRangeValueChange,
        resetCalculation,
      }}
    >
      {children}
    </OptionSelectionContext.Provider>
  );
};

export const useCalculation = () => {
  const context = useContext(OptionSelectionContext);
  if (context === undefined) {
    throw new Error('useCalculation must be used within a OptionSelectionProvider');
  }
  return context;
};
