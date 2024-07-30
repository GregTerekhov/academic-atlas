'use client';

import { ButtonType, IconName, IconSize } from 'types';
import { useCalculation, useCalculationResult } from 'context';
import { SvgIconUI } from 'ui';

export default function BackButton() {
  const { handleClearValues } = useCalculation();
  const { handleResetCostResult } = useCalculationResult();

  const handleBackClick = () => {
    handleResetCostResult();
    handleClearValues();
  };

  return (
    <button
      type={ButtonType.Button}
      className='group absolute -top-8 left-6 flex size-10 items-center justify-center rounded-full border border-darkBase bg-whiteBase/10 backdrop-blur-sm transition-opacity hocus:border-accentPrimary hocus:bg-accentPrimary/10 dark:border-whiteBase dark:hocus:border-accentSecondary dark:hocus:bg-accentSecondary/30 md:left-10 lg:left-6 lg:top-6'
      onClick={handleBackClick}
    >
      <SvgIconUI
        id={IconName.Arrow}
        size={{ width: IconSize.M, height: IconSize.M }}
        className='-rotate-90 fill-darkBase group-hover:fill-accentPrimary dark:fill-whiteBase dark:group-hover:fill-accentSecondary'
      />
    </button>
  );
}
