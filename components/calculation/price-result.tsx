'use client';

import { ButtonType, CalculationTitle, IconName, IconSize, PrimaryButtonLabel } from 'types';

import { useCalculation } from 'context';
import { calculatePrice, encodeTelegramData, roundPriceToInterval } from 'helpers';

import { PrimaryButtonUI, SvgIconUI } from 'ui';

export default function PriceResult() {
  const { calculationData } = useCalculation();
  const { workType, executionTime, expertiseArea, uniqueness } = calculationData;

  const { base64String } = encodeTelegramData();

  const calculatedPrice = calculatePrice(workType, expertiseArea, executionTime, uniqueness);
  const renderedPrice = roundPriceToInterval(calculatedPrice);

  return (
    <div className='flex flex-col items-center'>
      <h2 className='mb-8 !text-1.5xl text-darkBase dark:text-whiteBase md:mb-10 md:!text-3xl'>
        {CalculationTitle.CalculationResult}
      </h2>
      <p className='mb-8 text-center font-philosopher text-4xl text-whiteBase md:mb-10 md:text-5xl lg:text-7xl'>
        від {renderedPrice} грн*
      </p>
      <p className='generalText mb-8 flex max-w-[550px] items-center justify-center text-center'>
        * Зверніть увагу, що ця вартість може варіюватися залежно від складності вашої роботи і вона
        може бути змінена
      </p>
      <p className='lg:text-bg mb-8 text-center text-sm text-whiteBase max-md:leading-130 md:mb-10 md:text-medium'>
        Для замовлення та уточнення питань зв’яжіться з нами у телеграм
      </p>
      <a
        href={`https://t.me/AcademicAtlasBot?start=${base64String}`}
        target='blank'
        rel='noopener noreferrer'
      >
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
      </a>
    </div>
  );
}
