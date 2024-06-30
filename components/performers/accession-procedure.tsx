import Image from 'next/image';

import { IAccession, PrimaryButtonLabel, SectionTitle } from 'types';

import { getAccession, imageSettings } from 'helpers';

import { MappedListTemplate, SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import { AccessionItem } from './subcomponents';

export default function Accession() {
  const accessionData = getAccession();
  const { partnershipAccession } = imageSettings;

  return (
    <SectionTemplate title={SectionTitle.PartnershipAccession}>
      <div className='space-y-6 md:space-y-10 lg:space-y-[72px]'>
        <div className='max-md:space-y-6 md:flex md:items-center md:justify-between md:gap-x-10 lg:gap-x-28'>
          <MappedListTemplate<IAccession>
            items={accessionData}
            className='space-y-6'
          >
            {({ id, desc }) => (
              <AccessionItem
                key={id}
                id={id}
                desc={desc}
              />
            )}
          </MappedListTemplate>
          <Image
            src={partnershipAccession.src}
            height={partnershipAccession.width}
            width={partnershipAccession.height}
            alt={partnershipAccession.alt}
            className={partnershipAccession.className}
          />
        </div>
        <div className='flex items-center justify-center'>
          <PrimaryButtonUI>{PrimaryButtonLabel.Accession}</PrimaryButtonUI>
        </div>
      </div>
    </SectionTemplate>
  );
}
