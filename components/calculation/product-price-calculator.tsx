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
          <h2
            id='modal'
            className='mb-8 !text-xl text-darkBase dark:text-whiteBase md:mb-10 md:!text-3xl'
          >
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
