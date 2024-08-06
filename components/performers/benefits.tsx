import { type IPartnershipBenefits } from 'types';
import { getPartnershipBenefits, getSectionProps } from 'data';

import { MappedListTemplate, SectionTemplate } from 'template';
import { PartnershipBenefitsItem } from './subcomponents';

export default function Benefits() {
  const benefitsData = getPartnershipBenefits();
  const sectionProps = getSectionProps();
  const performersBenefitsProps = sectionProps.performersBenefits;

  return (
    <SectionTemplate {...performersBenefitsProps}>
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
