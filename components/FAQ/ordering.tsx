import { PrimaryButtonLabel } from 'types';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import { CtaText, SectionTitle } from 'types';

export default function Ordering() {
  return (
    <SectionTemplate
      title={SectionTitle.FAQOrder}
      hasCtaText
      noAlignment='text-wrap'
      ctaText={CtaText.FAQOrder}
      ctaStyle='text-center w-[300px] mx-auto md:w-[658px] lg:w-[1252px]'
    >
      <div className='md:flex md:items-center md:justify-center'>
        <PrimaryButtonUI>{PrimaryButtonLabel.Ordering}</PrimaryButtonUI>
      </div>
    </SectionTemplate>
  );
}
