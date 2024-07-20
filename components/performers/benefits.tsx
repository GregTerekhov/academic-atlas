import { IPartnershipBenefits, SectionTitle } from 'types';
import { getPartnershipBenefits } from 'data';

import { MappedListTemplate, SectionTemplate } from 'template';
import { PartnershipBenefitsItem } from './subcomponents';

export default function Benefits() {
  const benefitsData = getPartnershipBenefits();

  return (
    <SectionTemplate title={SectionTitle.PartnershipBenefits}>
      <MappedListTemplate<IPartnershipBenefits>
        items={benefitsData}
        className='max-md:space-y-6 md:flex md:gap-x-8 lg:gap-x-10'
      >
        {({ id, title, description, iconName }) => (
          <PartnershipBenefitsItem
            key={id}
            title={title}
            desc={description}
            iconId={iconName}
          />
        )}
      </MappedListTemplate>
    </SectionTemplate>
  );
}
