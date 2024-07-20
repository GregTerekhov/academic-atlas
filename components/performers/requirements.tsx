import { IRequirements, SectionTitle } from 'types';

import { getRequirements } from 'helpers';

import { MappedListTemplate, SectionTemplate } from 'template';
import { RequirementsItem } from './subcomponents';

export default function Requirements() {
  const requirementsData = getRequirements();

  return (
    <SectionTemplate title={SectionTitle.PartnershipRequirements}>
      <MappedListTemplate<IRequirements>
        items={requirementsData}
        className='max-lg:space-y-6 md:max-lg:px-[88px] lg:flex lg:gap-x-10'
      >
        {({ id, title, description }) => (
          <RequirementsItem
            key={id}
            title={title}
            desc={description}
          />
        )}
      </MappedListTemplate>
    </SectionTemplate>
  );
}
