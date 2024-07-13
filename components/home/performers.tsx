import Link from 'next/link';

import { CtaText, Paths, PrimaryButtonLabel, SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { getPrimaryButtonStyles } from 'helpers/uiHelper';

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
        >
          {PrimaryButtonLabel.Accession}
        </Link>
      </div>
    </SectionTemplate>
  );
}
