import { CtaText, PrimaryButtonLabel, SectionTitle } from 'types';

import { getIdValues, imageSettings } from 'helpers';

import { SectionTemplate } from 'template';
import { ImageUI, PrimaryButtonUI } from 'ui';

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
      <PrimaryButtonUI>{PrimaryButtonLabel.Ordering}</PrimaryButtonUI>
    </SectionTemplate>
  );
}
