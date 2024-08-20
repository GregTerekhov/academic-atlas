import { ChangeEvent, createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

import {
  type ICalculationData,
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
  setCalculationData: Dispatch<SetStateAction<ICalculation>>;
  handleOptionChange: <T extends keyof ICalculationData>(
    field: T,
    option: ICalculationData[T],
  ) => void;
  handleThemeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRangeValueChange: (value: number) => void;
  handleCheckboxChange: (checked: boolean) => void;
  resetCalculation: () => void;
}

interface ICalculation extends ICalculationData {
  uniqueness?: number;
  theme?: string;
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

  const handleThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value;

    if (isValidInput(newTheme)) {
      setCalculationData((prevData) => ({ ...prevData, theme: newTheme }));
    } else {
      console.warn('Недійсне введення');
    }
  };

  const handleRangeValueChange = (value: number) => {
    setCalculationData((prevData) => ({ ...prevData, uniqueness: value }));
  };

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
    setCalculationData,
    handleOptionChange,
    handleThemeChange,
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
