'use client';

import { AriaDescription, AriaId, PrimaryButtonLabel } from 'types';
import { useCalculationResult } from 'context';

import { PrimaryButtonUI } from 'ui';

interface ICalculationButtonProps {
  isDisabled: boolean;
}

export default function CalculationButton({ isDisabled }: ICalculationButtonProps) {
  const { handleShowCostResult } = useCalculationResult();

  return (
    <div className='md:flex md:items-center md:justify-center'>
      <PrimaryButtonUI
        handleClick={handleShowCostResult}
        isDisabled={isDisabled}
        isOnLightBackground
        ariaId={AriaId.CostOutput}
        ariaDescription={AriaDescription.CostOutput}
      >
        {PrimaryButtonLabel.CostCalculation}
      </PrimaryButtonUI>
    </div>
  );
}
