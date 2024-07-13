import { CtaText, PrimaryButtonLabel, SectionTitle, TelegramScenario } from 'types';

import { getIdValues, imageSettings } from 'helpers';

import { SectionTemplate, TelegramButton } from 'template';
import { ImageUI } from 'ui';

export default function Promotions() {
  const { promotions } = imageSettings;
  const { Promotions } = getIdValues();

  const { src, alt, width, height, className } = promotions;

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
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
      <TelegramButton
        command={TelegramScenario.Order}
        label={PrimaryButtonLabel.Ordering}
      />
    </SectionTemplate>
  );
}
