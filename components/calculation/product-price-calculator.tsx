'use client';

import { CalculationTitle } from 'types';
import { useCalculation, useCalculationResult } from 'context';
import { useButtonDisabled, usePlagiarismCheck } from 'hooks';

import { CalculationButton, InputFields, PlagiarismSection, PriceResult } from './subcomponents';

export default function PriceCalculator() {
  const { isChecked, calculationData } = useCalculation();
  const { hasSubmitData } = useCalculationResult();
  const { shouldPlagiarismCheck } = usePlagiarismCheck(calculationData);
  const { isButtonDisabled } = useButtonDisabled(calculationData, isChecked);

  return (
    <>
      {hasSubmitData ? (
        <PriceResult />
      ) : (
        <>
          <h2 className='mb-8 !text-xl text-darkBase dark:text-whiteBase md:mb-10 md:!text-3xl'>
            {CalculationTitle.CalculationForm}
          </h2>
          <InputFields shouldPlagiarismCheck={shouldPlagiarismCheck} />
          {shouldPlagiarismCheck && <PlagiarismSection />}
          <CalculationButton isDisabled={isButtonDisabled} />
        </>
      )}
    </>
  );
}
