import Image from 'next/image';

import { CtaText, PrimaryButtonLabel, SectionTitle } from 'types';

import { idValues, imageSettings } from 'helpers';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Promotions() {
  const { promotions } = imageSettings;

  return (
    <SectionTemplate
      title={SectionTitle.Promotions}
      id={idValues.Promotions ?? ''}
      noAlignment='text-start'
      hasCtaText
      ctaStyle='md:w-[421px] lg:w-[572px]'
      ctaText={CtaText.MainPromotions}
    >
      <Image
        src={promotions.src}
        alt={promotions.alt}
        width={promotions.width}
        height={promotions.height}
        className={promotions.className}
      />
      <PrimaryButtonUI>{PrimaryButtonLabel.Ordering}</PrimaryButtonUI>
    </SectionTemplate>
  );
}
