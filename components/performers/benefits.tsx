import { SectionTitle } from 'types';

import { getPartnershipBenefits } from 'helpers';

import { SectionTemplate } from 'template';
import { PartnershipBenefitsItem } from './subcomponents';

export default function Benefits() {
  const benefitsData = getPartnershipBenefits();

  return (
    <SectionTemplate title={SectionTitle.PartnershipBenefits}>
      <ul className='max-md:space-y-6 md:flex md:gap-x-8 lg:gap-x-10'>
        {Array.isArray(benefitsData) &&
          benefitsData.map(({ id, title, desc, iconId }) => (
            // <li
            //   key={id}
            //   className='flex items-center rounded-2xl border border-accentSecondary bg-whiteBase/10 p-4 max-md:gap-x-6 md:flex-col md:gap-y-6 lg:gap-y-8'
            // >
            <PartnershipBenefitsItem
              key={id}
              title={title}
              desc={desc}
              iconId={iconId}
            />
            // </li>
          ))}
      </ul>
    </SectionTemplate>
  );
}
