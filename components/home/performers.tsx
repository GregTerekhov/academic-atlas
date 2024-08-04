import Link from 'next/link';

import { AriaDescription, AriaId, Paths, PrimaryButtonLabel } from 'types';
import { getSectionProps } from 'helpers';

import { SectionTemplate } from 'template';
import { AriaDescriptionUI } from 'ui';

import { getPrimaryButtonStyles } from 'styles';

export default function Performers() {
  const linkClass = getPrimaryButtonStyles();
  const sectionProps = getSectionProps();
  const mainPerformersProps = sectionProps.homePerformers;

  return (
    <SectionTemplate {...mainPerformersProps}>
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
