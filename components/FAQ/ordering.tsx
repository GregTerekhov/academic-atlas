import { PrimaryButtonLabel } from 'types';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import { CtaText, SectionTitle } from 'types';

export default function Ordering() {
  return (
    <SectionTemplate
      title={SectionTitle.FAQOrder}
      hasCtaText
      ctaText={CtaText.FAQOrder}
      ctaStyle='text-center max-md:px-3 md:max-lg:px-[15px]'
    >
      <div className='md:flex md:items-center md:justify-center'>
        <PrimaryButtonUI>{PrimaryButtonLabel.Ordering}</PrimaryButtonUI>
      </div>
    </SectionTemplate>
  );
}
