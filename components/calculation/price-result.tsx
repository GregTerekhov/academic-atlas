'use client';

import { useCalculation } from 'context/CalculationProvider';
import { calculatePrice } from 'helpers/calculatePrice';
import { usePriceRenderFormatting } from 'hooks/usePriceRenderFormatting';
import { ButtonType, CalculationTitle, IconName, IconSize, PrimaryButtonLabel } from 'types';

import { PrimaryButtonUI, SvgIconUI } from 'ui';

export default function PriceResult() {
  const { calculationData } = useCalculation();
  const { workType, executionTime, expertiseArea, uniqueness } = calculationData;

  const selectedWorkType = workType;
  const selectedExpertiseArea = expertiseArea;
  const selectedExecutionTime = executionTime;
  const selectedUniqueness = uniqueness;

  const calculatedPrice = calculatePrice(
    selectedWorkType,
    selectedExpertiseArea,
    selectedExecutionTime,
    selectedUniqueness,
  );

  const { renderedPrice } = usePriceRenderFormatting(calculatedPrice);

  return (
    <>
      <h2 className='mb-8 !text-1.5xl text-darkBase dark:text-whiteBase md:mb-10 md:!text-3xl'>
        {CalculationTitle.CalculationResult}
      </h2>
      <p className='mb-8 text-center text-4xl text-whiteBase md:mb-10 md:text-5xl lg:text-7xl'>
        від {renderedPrice} грн
      </p>
      <p className='lg:text-bg mb-8 text-center text-sm text-whiteBase max-md:leading-130 md:mb-10 md:text-medium'>
        Для замовлення, зв’яжіться з нами у телеграм
      </p>
      <PrimaryButtonUI
        type={ButtonType.Submit}
        hasIcon
      >
        <SvgIconUI
          id={IconName.Telegram}
          size={{ width: IconSize.BG, height: IconSize.BG }}
          className='fill-whiteBase'
        />
        {PrimaryButtonLabel.SwitchToTelegram}
      </PrimaryButtonUI>
    </>
  );
}
