import Image from 'next/image';

import { CtaText, PrimaryButtonLabel, SectionTitle } from 'types';

import { idValues } from 'helpers';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Promotions() {
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
        src='/images/notes.webp'
        alt='Notes'
        width={216}
        height={144}
        className='max-md:mx-auto max-md:mb-8 md:absolute md:right-10 md:top-1/2 md:h-[152px] md:w-[224px] md:-translate-y-1/2 lg:h-[280px] lg:w-[416px]'
      />
      <PrimaryButtonUI>{PrimaryButtonLabel.Ordering}</PrimaryButtonUI>
    </SectionTemplate>
  );
}
