import { SectionTitle } from 'types';

import { getRequirements } from 'helpers';
// import { getRequirements, getSectionClasses } from 'helpers';
// import Container from 'layout/container';
// import { SectionTitle, SectionDescriptions } from 'types';

import { SectionTemplate } from 'template';
import { RequirementsItem } from './subcomponents';

// interface IRequirementsProps {
//   title: SectionTitle;
//   style: string;
// }

export default function Requirements() {
  // export default function Requirements({ title, style }: IRequirementsProps) {
  const requirementsData = getRequirements();
  // const sectionClasses = getSectionClasses(title);

  return (
    <SectionTemplate title={SectionTitle.PartnershipRequirements}>
      {/* <section className={`${style} lg:pt-[104px]`}>
        <div className={`${sectionClasses}`}> */}
      {/* <Container> */}
      {/* <h2 className='mb-8 lg:mb-[72px]'>{SectionDescriptions[title]}</h2> */}
      <ul className='max-lg:space-y-6 md:max-lg:px-[88px] lg:flex lg:gap-x-10'>
        {Array.isArray(requirementsData) &&
          requirementsData.map(({ title, desc }) => (
            // <li
            //   key={title}
            //   className='flex flex-col items-center gap-x-6 rounded-[20px] border border-accentSecondary bg-whiteBase/10 p-4 lg:w-[400px] lg:gap-y-2'
            // >
            <RequirementsItem
              key={title}
              title={title}
              desc={desc}
            />
            // </li>
          ))}
      </ul>
      {/* </Container>
        </div>
      </section> */}
    </SectionTemplate>
  );
}
