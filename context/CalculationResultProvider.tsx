'use client';

import { createContext, useContext, useState } from 'react';

import { type IWithChildren } from '../types';

interface ICalculationResultContext {
  hasSubmitData: boolean;
  handleShowCostResult: () => void;
  handleResetCostResult: () => void;
}

const CalculationResultContext = createContext<ICalculationResultContext | undefined>(undefined);

export const CalculationResultProvider = ({ children }: IWithChildren) => {
  const [hasSubmitData, setHasSubmitData] = useState(false);

  const handleShowCostResult = () => {
    setHasSubmitData(true);
  };

  const handleResetCostResult = () => {
    setHasSubmitData(false);
  };

  return (
    <CalculationResultContext.Provider
      value={{
        hasSubmitData,
        handleShowCostResult,
        handleResetCostResult,
      }}
    >
      {children}
    </CalculationResultContext.Provider>
  );
};

export const useCalculationResult = () => {
  const context = useContext(CalculationResultContext);
  if (context === undefined) {
    throw new Error('useCalculationResult must be used within a CalculationResultProvider');
  }
  return context;
};
