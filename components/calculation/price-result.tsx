'use client';

import { ButtonType, CalculationTitle, IconName, IconSize, PrimaryButtonLabel } from 'types';

import { PrimaryButtonUI, SvgIconUI } from 'ui';

export default function PriceResult() {
  // // Проміжковий приклад використання функції CalculatePrice
  // const selectedWorkType = WorkType.Abstracts;
  // const selectedExpertiseArea = ExpertiseArea.CultureAndArt;
  // const selectedExecutionTime = ExecutionTime.LongTerm;

  // const finalPrice = calculatePrice(
  //   selectedWorkType,
  //   selectedExpertiseArea,
  //   selectedExecutionTime,
  //   90,
  // );
  // console.log(`Final Price: ${finalPrice}`);
  return (
    <>
      <h2 className='mb-8 !text-1.5xl text-darkBase dark:text-whiteBase md:mb-10 md:!text-3xl'>
        {CalculationTitle.CalculationResult}
      </h2>
      <p className='mb-8 text-center text-4xl text-whiteBase md:mb-10 md:text-5xl lg:text-7xl'>
        від грн
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
