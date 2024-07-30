import { CalculationTitle } from 'types';

import { useCalculation } from 'context';
import { calculatePrice, roundPriceToInterval } from 'helpers';

import TelegramSubmitButton from './telegram-submit-button';
import BackButton from './calculation-back-button';

export default function PriceResult() {
  const { calculationData } = useCalculation();

  const { workType, executionTime, expertiseArea, uniqueness } = calculationData;

  const calculatedPrice = calculatePrice(workType, expertiseArea, executionTime, uniqueness);
  const renderedPrice = roundPriceToInterval(calculatedPrice);

  return (
    <>
      <BackButton />
      <div className='flex flex-col items-center'>
        <h2 className='mb-8 !text-1.5xl text-darkBase dark:text-whiteBase md:mb-10 md:!text-3xl'>
          {CalculationTitle.CalculationResult}
        </h2>
        <p
          aria-live='polite'
          aria-atomic='true'
          className='mb-8 text-center font-philosopher text-4xl text-darkBase dark:text-whiteBase md:mb-10 md:text-5xl lg:text-7xl'
        >
          від {renderedPrice} грн*
        </p>
        <p className='generalText mb-8 flex max-w-[550px] items-center justify-center text-center text-darkBase dark:text-whiteBase'>
          * Зверніть увагу, що ця вартість може варіюватися залежно від складності вашої роботи і
          вона може бути змінена
        </p>
        <p className='lg:text-bg mb-8 text-center text-sm text-darkBase dark:text-whiteBase max-md:leading-130 md:mb-10 md:text-medium'>
          Для замовлення та уточнення питань зв’яжіться з нами у телеграм
        </p>
        <TelegramSubmitButton />
      </div>
    </>
  );
}
