import Image from 'next/image';

import { SectionTitle } from 'types';

import { idValues } from 'helpers';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

import notes from '../../public/notes.webp';

export default function Promotions() {
  const callToAction =
    'Замовте готовий підшитий диплом у нас і отримайте його зі зручністю "Новою поштою"';
  return (
    <SectionTemplate
      title={SectionTitle.Promotions}
      id={idValues.Promotions ?? ''}
      noAlignment='text-start'
    >
      <p className='text-medium max-md:my-4 md:mb-8 md:mt-6 md:w-[421px] md:text-xl lg:mb-16 lg:mt-8 lg:w-[572px] lg:text-2xl'>
        {callToAction}
      </p>
      <Image
        src={notes}
        alt='Notes'
        width={216}
        height={144}
        className='max-md:mx-auto max-md:mb-8 md:absolute md:right-10 md:top-1/2 md:h-[152px] md:w-[224px] md:-translate-y-1/2 lg:h-[280px] lg:w-[416px]'
      />
      <PrimaryButtonUI>Замовити</PrimaryButtonUI>
    </SectionTemplate>
  );
}
