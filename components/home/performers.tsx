import Link from 'next/link';

import { CtaText, Paths, PrimaryButtonLabel, SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Performers() {
  return (
    <SectionTemplate
      title={SectionTitle.Performers}
      noAlignment='max-md:text-start'
      hasCtaText
      ctaStyle='md:text-center'
      ctaText={CtaText.MainPerformers}
    >
      <div className='md:flex md:items-center md:justify-center'>
        <Link href={Paths.Partnership}>
          <PrimaryButtonUI>{PrimaryButtonLabel.Accession}</PrimaryButtonUI>
        </Link>
      </div>
    </SectionTemplate>
  );
}
