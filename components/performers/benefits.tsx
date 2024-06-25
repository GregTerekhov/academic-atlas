import { getPartnershipBenefits } from 'helpers/componentsData';
import { SectionTemplate } from 'template';
import { SectionTitle } from 'types';
import { PartnershipBenefitsItem } from './subcomponents';

export default function Benefits() {
  const benefitsData = getPartnershipBenefits();

  return (
    <SectionTemplate title={SectionTitle.PartnershipBenefits}>
      <ul className='max-md:space-y-6 md:flex md:gap-x-8 lg:gap-x-10'>
        {Array.isArray(benefitsData) &&
          benefitsData.map(({ id, title, desc, iconId }) => (
            <PartnershipBenefitsItem
              id={id}
              title={title}
              desc={desc}
              iconId={iconId}
            />
          ))}
      </ul>
    </SectionTemplate>
  );
}
