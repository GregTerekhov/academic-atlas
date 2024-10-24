'use client';

import { CalculationTitle } from 'types';
import { useCalculationResult } from 'context';
import { useButtonDisabled, usePlagiarismCheck } from 'hooks';

import { CalculationButton, InputFields, PlagiarismSection, PriceResult } from './subcomponents';

export default function PriceCalculator() {
  const { hasSubmitData } = useCalculationResult();
  const { shouldPlagiarismCheck } = usePlagiarismCheck();
  const { isButtonDisabled } = useButtonDisabled();

  return (
    <>
      {hasSubmitData ? (
        <PriceResult />
      ) : (
        <>
          <p
            id='modal'
            className='mb-8 text-center font-philosopher text-1.5xl font-bold leading-130 text-darkBase dark:text-whiteBase md:mb-10 md:text-3xl lg:text-4xl'
          >
            {CalculationTitle.CalculationForm}
          </p>
          <InputFields shouldPlagiarismCheck={shouldPlagiarismCheck} />
          {shouldPlagiarismCheck && <PlagiarismSection />}
          <CalculationButton isDisabled={isButtonDisabled} />
        </>
      )}
    </>
  );
}
