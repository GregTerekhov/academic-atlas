import { PrimaryButtonLabel, SectionTitle } from 'types';
import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import Image from 'next/image';

import accessionImage from '/public/images/partnership-accession.webp';
import { getAccession } from 'helpers/componentsData';
import { AccessionItem } from './subcomponents';

export default function Accession() {
  const accessionData = getAccession();

  return (
    <SectionTemplate title={SectionTitle.PartnershipAccession}>
      <div className='md:flex md:flex-col md:items-center md:gap-y-10 lg:gap-y-[86px]'>
        <div className='items-center md:flex md:gap-x-10 lg:gap-x-28'>
          <ul className='space-y-6 '>
            {Array.isArray(accessionData) &&
              accessionData.map(({ step, desc }) => (
                <AccessionItem
                  step={step}
                  desc={desc}
                />
              ))}
          </ul>
          <Image
            src={accessionImage}
            height={200}
            width={327}
            alt='people grabs each other wrist to holding up one another'
            className='rounded-2xl md:h-[220px] md:w-[292px] lg:h-[287px] lg:w-[516px]'
          />
        </div>
        <PrimaryButtonUI>{PrimaryButtonLabel.Accession}</PrimaryButtonUI>
      </div>
    </SectionTemplate>
  );
}
