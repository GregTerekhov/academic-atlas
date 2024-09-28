import { type IRequirements } from 'types';
import { getRequirements, getSectionProps } from 'data';

import { MappedListTemplate, SectionTemplate } from 'template';
import { RequirementsItem } from './subcomponents';

export default function Requirements() {
  const requirementsData = getRequirements();
  const sectionProps = getSectionProps();
  const performersRequirementsProps = sectionProps.performersRequirements;

  return (
    <SectionTemplate {...performersRequirementsProps}>
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
