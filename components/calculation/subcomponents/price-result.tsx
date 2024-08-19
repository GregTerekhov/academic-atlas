import { CalculationTitle } from 'types';

import { useCalculation } from 'context';
import { calculatePrice, roundPriceToInterval } from 'helpers';

import TelegramSubmitButton from './telegram-submit-button';

import { getDisclaimerCtaTextStyles, getDisclaimerTextStyles, getResultPriceStyles } from 'styles';

export default function PriceResult() {
  const { calculationData } = useCalculation();

  const { workType, executionTime, expertiseArea, uniqueness } = calculationData;

  const calculatedPrice = calculatePrice(workType, expertiseArea, executionTime, uniqueness);
  const renderedPrice = roundPriceToInterval(calculatedPrice);

  const resultClass = getResultPriceStyles();
  const disclaimerClass = getDisclaimerTextStyles();
  const ctaTextStyles = getDisclaimerCtaTextStyles();

  return (
    <>
      <div className='flex flex-col items-center'>
        <h2
          id='modal'
          className='mb-8 !text-1.5xl text-darkBase dark:text-whiteBase md:mb-10 md:!text-3xl'
        >
          {CalculationTitle.CalculationResult}
        </h2>
        <p
          aria-live='polite'
          aria-atomic='true'
          className={resultClass}
        >
          від {renderedPrice} грн*
        </p>
        <p className={disclaimerClass}>
          * Зверніть увагу, що ця вартість може варіюватися залежно від складності вашої роботи і
          вона може бути змінена
        </p>
        <p className={ctaTextStyles}>
          Для замовлення та уточнення питань зв’яжіться з нами у телеграм
        </p>
        <TelegramSubmitButton />
      </div>
    </>
  );
}
