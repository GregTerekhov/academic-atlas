import Link from 'next/link';

import { AriaDescription, AriaId, CtaText, Paths, PrimaryButtonLabel, SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { AriaDescriptionUI } from 'ui';

import { getPrimaryButtonStyles } from 'styles';

export default function Performers() {
  const linkClass = getPrimaryButtonStyles();
  return (
    <SectionTemplate
      title={SectionTitle.Performers}
      noAlignment='max-md:text-start'
      hasCtaText
      ctaStyle='md:text-center'
      ctaText={CtaText.MainPerformers}
    >
      <div className='md:flex md:items-center md:justify-center'>
        <Link
          href={Paths.Partnership}
          className={`${linkClass} py-[17px]`}
          aria-describedby={AriaId.Performers}
        >
          {PrimaryButtonLabel.Accession}
        </Link>
        <AriaDescriptionUI
          id={AriaId.Performers}
          description={AriaDescription.Performers}
        />
      </div>
    </SectionTemplate>
  );
}
