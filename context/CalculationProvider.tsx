'use client';

import { createContext, useContext, useState, ReactNode, ChangeEvent } from 'react';

import {
  type ICalculationData,
  ExecutionTime,
  ExpertiseArea,
  Uniqueness,
  WorkType,
} from '../types';

interface ICalculationContext {
  calculationData: ICalculation;
  hasSubmitData: boolean;
  handleWorkTypeChange: (option: WorkType) => void;
  handleExpertiseAreaChange: (option: ExpertiseArea) => void;
  handleExecutionTimeChange: (option: ExecutionTime) => void;
  handleThemeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetCalculation: () => void;
  handleCostClick: () => void;
}

interface ICalculation extends ICalculationData {
  uniqueness?: number;
  theme?: string;
}

const CalculationContext = createContext<ICalculationContext | undefined>(undefined);

export const CalculationProvider = ({ children }: { children: ReactNode }) => {
  const [hasSubmitData, setHasSubmitData] = useState(false);
  const [calculationData, setCalculationData] = useState<ICalculation>({
    workType: WorkType.Default,
    expertiseArea: ExpertiseArea.Default,
    executionTime: ExecutionTime.Default,
    uniqueness: Uniqueness.Zero,
    theme: '',
  });

  const handleWorkTypeChange = (option: WorkType) => {
    setCalculationData((prevData) => ({ ...prevData, workType: option }));
  };

  const handleExpertiseAreaChange = (option: ExpertiseArea) => {
    setCalculationData((prevData) => ({ ...prevData, expertiseArea: option }));
  };

  const handleExecutionTimeChange = (option: ExecutionTime) => {
    setCalculationData((prevData) => ({ ...prevData, executionTime: option }));
  };

  const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value;
    setCalculationData((prevData) => ({ ...prevData, theme: newTheme }));
  };

  const resetCalculation = () => {
    setCalculationData({
      workType: WorkType.Default,
      expertiseArea: ExpertiseArea.Default,
      executionTime: ExecutionTime.Default,
      theme: '',
    });
  };

  const handleCostClick = () => {
    setHasSubmitData(true);
  };

  return (
    <CalculationContext.Provider
      value={{
        hasSubmitData,
        calculationData,
        handleWorkTypeChange,
        handleExpertiseAreaChange,
        handleExecutionTimeChange,
        handleThemeChange,
        resetCalculation,
        handleCostClick,
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
