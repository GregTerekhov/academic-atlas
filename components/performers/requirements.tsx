import { getRequirements } from 'helpers';
import { SectionTitle } from 'types';
import { RequirementsItem } from './subcomponents';
import { SectionTemplate } from 'template/index';

export default function Requirements() {
  const requirementsData = getRequirements();

  return (
    <SectionTemplate title={SectionTitle.PartnershipRequirements}>
      <ul className='flex max-lg:mx-auto max-lg:flex-col max-lg:gap-y-6 max-lg:md:w-[512px] lg:gap-x-10 '>
        {Array.isArray(requirementsData) &&
          requirementsData.map(({ title, desc }) => (
            <li
              key={title}
              className='flex flex-col items-center gap-x-6 rounded-[20px] border border-accentSecondary bg-whiteBase/10 p-4 lg:w-[400px] lg:gap-y-2'
            >
              <RequirementsItem
                title={title}
                desc={desc}
              />
            </li>
          ))}
      </ul>
    </SectionTemplate>
  );
}
