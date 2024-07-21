import {
  AriaDescription,
  AriaId,
  CalculationTitle,
  IconName,
  IconSize,
  PrimaryButtonLabel,
  TelegramScenario,
} from 'types';

import { useCalculation } from 'context';
import {
  calculatePrice,
  getAndEncodeDataObject,
  getPrimaryButtonStyles,
  roundPriceToInterval,
} from 'helpers';

import { AriaDescriptionUI, SvgIconUI } from 'ui';

export default function PriceResult() {
  const { calculationData } = useCalculation();
  const { workType, executionTime, expertiseArea, uniqueness } = calculationData;

  const calculatedPrice = calculatePrice(workType, expertiseArea, executionTime, uniqueness);
  const renderedPrice = roundPriceToInterval(calculatedPrice);

  const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const base64String = getAndEncodeDataObject(
      TelegramScenario.Order,
      workType,
      expertiseArea,
      executionTime,
      uniqueness,
    );

    if (!base64String) {
      e.preventDefault();
      return;
    }

    e.currentTarget.href = `https://t.me/AcademicAtlasBot?start=${base64String}`;
  };

  const linkClass = getPrimaryButtonStyles(true);

  return (
    <div className='flex flex-col items-center'>
      <h2 className='mb-8 !text-1.5xl text-darkBase dark:text-whiteBase md:mb-10 md:!text-3xl'>
        {CalculationTitle.CalculationResult}
      </h2>
      <p className='mb-8 text-center font-philosopher text-4xl md:mb-10 md:text-5xl lg:text-7xl'>
        від {renderedPrice} грн*
      </p>
      <p className='generalText mb-8 flex max-w-[550px] items-center justify-center text-center'>
        * Зверніть увагу, що ця вартість може варіюватися залежно від складності вашої роботи і вона
        може бути змінена
      </p>
      <p className='lg:text-bg mb-8 text-center text-sm max-md:leading-130 md:mb-10 md:text-medium'>
        Для замовлення та уточнення питань зв’яжіться з нами у телеграм
      </p>
      <a
        href='#'
        onClick={handleLinkClick}
        target='_blank'
        rel='noopener noreferrer'
        aria-describedby='price-button'
        className={`${linkClass} group flex h-full w-full items-center justify-center gap-x-4 py-4 max-sm:gap-x-2`}
      >
        <SvgIconUI
          id={IconName.Telegram}
          size={{ width: IconSize.BG, height: IconSize.BG }}
          className='fill-whiteBase group-hover:fill-accentPrimary dark:group-hover:fill-whiteBase'
          ariaHidden={false}
          ariaLabel='Телеграм'
        />
        {PrimaryButtonLabel.SwitchToTelegram}
      </a>
      <AriaDescriptionUI
        id={AriaId.ComplexOrdering}
        description={AriaDescription.ComplexOrdering}
      />
    </div>
  );
}
