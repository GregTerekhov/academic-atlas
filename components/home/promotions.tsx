import {
  AriaDescription,
  AriaId,
  CtaText,
  PrimaryButtonLabel,
  SectionTitle,
  TelegramScenario,
} from 'types';
import { getIdValues, imageSettings } from 'helpers';

import { SectionTemplate, TelegramButton } from 'template';
import { ImageUI } from 'ui';

export default function Promotions() {
  const { promotions } = imageSettings;
  const { Promotions } = getIdValues();

  const { src, width, height, className } = promotions;

  return (
    <SectionTemplate
      title={SectionTitle.Promotions}
      id={Promotions ?? ''}
      noAlignment='text-start'
      hasCtaText
      ctaStyle='md:w-[421px] lg:w-[572px]'
      ctaText={CtaText.MainPromotions}
    >
      <ImageUI
        src={src}
        alt=''
        width={width}
        height={height}
        className={className}
      />
      <TelegramButton
        command={TelegramScenario.Order}
        label={PrimaryButtonLabel.Ordering}
        ariaId={AriaId.DefaultPromotionsOrdering}
        ariaDescription={AriaDescription.DefaultPromotionsOrdering}
      />
    </SectionTemplate>
  );
}
