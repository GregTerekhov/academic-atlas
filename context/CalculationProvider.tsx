'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

import { ExecutionTime, ExpertiseArea, ICalculationData, WorkType } from '../types';

interface ICalculationContext {
  calculationData: ICalculationData;
  handleWorkTypeChange: (option: WorkType) => void;
  handleExpertiseAreaChange: (option: ExpertiseArea) => void;
  handleExecutionTimeChange: (option: ExecutionTime) => void;
  resetCalculation: () => void;
}

const CalculationContext = createContext<ICalculationContext | undefined>(undefined);

export const CalculationProvider = ({ children }: { children: ReactNode }) => {
  const [calculationData, setCalculationData] = useState<ICalculationData>({
    workType: WorkType.Default,
    expertiseArea: ExpertiseArea.Default,
    executionTime: ExecutionTime.Default,
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

  const resetCalculation = () => {
    setCalculationData({
      workType: WorkType.Default,
      expertiseArea: ExpertiseArea.Default,
      executionTime: ExecutionTime.Default,
    });
  };

  return (
    <CalculationContext.Provider
      value={{
        calculationData,
        handleWorkTypeChange,
        handleExpertiseAreaChange,
        handleExecutionTimeChange,
        resetCalculation,
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
