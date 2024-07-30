'use client';

import { type IWithChildren } from '../types';
import { CalculationResultProvider } from './CalculationResultProvider';
import { OptionSelectionProvider } from './OptionSelectionProvider';

export const CalculationProvider = ({ children }: IWithChildren) => {
  return (
    <OptionSelectionProvider>
      <CalculationResultProvider>{children}</CalculationResultProvider>
    </OptionSelectionProvider>
  );
};
