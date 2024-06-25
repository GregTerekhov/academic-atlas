import Image from 'next/image';

import { PrimaryButtonLabel, SectionTitle } from 'types';

import { getAccession } from 'helpers';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import { AccessionItem } from './subcomponents';

// import accessionImage from '/public/images/partnership-accession.webp';

export default function Accession() {
  const accessionData = getAccession();

  return (
    <SectionTemplate title={SectionTitle.PartnershipAccession}>
      <div className='space-y-6 md:space-y-10 lg:space-y-[72px]'>
        <div className='max-md:space-y-6 md:flex md:items-center md:justify-between md:gap-x-10 lg:gap-x-28'>
          <ul className='space-y-6 '>
            {Array.isArray(accessionData) &&
              accessionData.map(({ step, desc }) => (
                // <li
                //   key={step}
                //   className='flex items-center gap-x-6 md:gap-x-8 lg:gap-x-16'
                // >
                <AccessionItem
                  key={step}
                  step={step}
                  desc={desc}
                />
                // </li>
              ))}
          </ul>
          <Image
            src='/images/partnership-accession.webp'
            height={200}
            width={327}
            alt='people grabs each other wrist to holding up one another'
            className='rounded-xl object-cover object-center md:h-[220px] md:w-[292px] lg:h-[287px] lg:w-[516px]'
          />
        </div>
        <div className='flex items-center justify-center'>
          <PrimaryButtonUI>{PrimaryButtonLabel.Accession}</PrimaryButtonUI>
        </div>
      </div>
    </SectionTemplate>
  );
}
