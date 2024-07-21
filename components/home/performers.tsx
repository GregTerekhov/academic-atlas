import Link from 'next/link';

import { CtaText, Paths, PrimaryButtonLabel, SectionTitle } from 'types';

import { getPrimaryButtonStyles } from 'helpers';

import { SectionTemplate } from 'template';

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
          aria-label='Кнопка для переходу на сторінку для виконавців'
        >
          {PrimaryButtonLabel.Accession}
        </Link>
      </div>
    </SectionTemplate>
  );
}
