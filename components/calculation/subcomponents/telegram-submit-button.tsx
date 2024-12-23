import {
  AriaDescription,
  AriaId,
  AriaLabel,
  IconName,
  IconSize,
  PrimaryButtonLabel,
  TelegramScenario,
} from 'types';

import { useCalculation } from 'context';
import { getAndEncodeDataObject } from 'helpers';

import { AriaDescriptionUI, SvgIconUI } from 'ui';

import { getPrimaryButtonStyles } from 'styles';
import { useState } from 'react';

export default function TelegramSubmitButton() {
  const [href, setHref] = useState('#');

  const { calculationData } = useCalculation();
  const { workType, executionTime, expertiseArea, uniqueness } = calculationData;

  const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const base64String = getAndEncodeDataObject(
      TelegramScenario.Order,
      workType,
      expertiseArea,
      executionTime,
      uniqueness?.toString(),
    );

    if (!base64String) {
      e.preventDefault();
      return;
    }

    setHref(`https://t.me/AcademicAtlasBot?start=${base64String}`);
  };

  const linkClass = getPrimaryButtonStyles(true);

  return (
    <>
      <a
        href={href}
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
          ariaLabel={AriaLabel.Telegram}
        />
        {PrimaryButtonLabel.SwitchToTelegram}
      </a>
      <AriaDescriptionUI
        id={AriaId.ComplexOrdering}
        description={AriaDescription.ComplexOrdering}
      />
    </>
  );
}
