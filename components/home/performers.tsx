import Link from 'next/link';

import { Paths, SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Performers() {
  return (
    <SectionTemplate
      title={SectionTitle.Performers}
      noAlignment='max-md:text-start'
      hasAdditionalText
    >
      <p className='mb-8 text-medium md:text-center md:text-xl lg:mb-16 lg:text-2xl'>
        Пиши, розвивайся, заробляй та ставай нашим виконавцем!
      </p>
      <div className='md:flex md:items-center md:justify-center'>
        <Link href={Paths.Partnership}>
          <PrimaryButtonUI>Приєднатися</PrimaryButtonUI>
        </Link>
      </div>
    </SectionTemplate>
  );
}
