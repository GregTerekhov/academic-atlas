'use client';

import { ButtonType, IconName, IconSize } from 'types';
import { useCalculation, useCalculationResult } from 'context';

import { SvgIconUI } from 'ui';

export default function BackButton() {
  const { resetCalculation } = useCalculation();
  const { hasSubmitData, handleResetCostResult } = useCalculationResult();

  const handleBackClick = () => {
    handleResetCostResult();
    resetCalculation();
  };

  return (
    hasSubmitData && (
      <button
        type={ButtonType.Button}
        className='group absolute -top-10 left-6 flex size-10 items-center justify-center md:-top-4 md:left-10 lg:left-6 lg:top-6'
        onClick={handleBackClick}
      >
        <SvgIconUI
          id={IconName.Arrow}
          size={{ width: IconSize.M, height: IconSize.M }}
          className='-rotate-90 fill-darkBase group-hover:fill-accentPrimary dark:fill-whiteBase dark:group-hover:fill-accentSecondary'
        />
      </button>
    )
  );
}
