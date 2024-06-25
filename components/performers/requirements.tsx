import { SectionTitle } from 'types';
import { getRequirements } from 'helpers';
import { SectionTemplate } from 'template';
import { RequirementsItem } from './subcomponents';

export default function Requirements() {
  const requirementsData = getRequirements();

  return (
    <SectionTemplate title={SectionTitle.PartnershipRequirements}>
      <ul className='max-lg:space-y-6 md:max-lg:px-[88px] lg:flex lg:gap-x-10'>
        {Array.isArray(requirementsData) &&
          requirementsData.map(({ title, desc }) => (
            <RequirementsItem
              key={title}
              title={title}
              desc={desc}
            />
          ))}
      </ul>
    </SectionTemplate>
  );
}
