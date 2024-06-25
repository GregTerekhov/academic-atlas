import { getRequirements, getSectionClasses } from 'helpers';
import Container from 'layout/container';
import { SectionTitle, SectionDescriptions } from 'types';
import { RequirementsItem } from './subcomponents';

interface IRequirementsProps {
  title: SectionTitle;
  style: string;
}

export default function Requirements({ title, style }: IRequirementsProps) {
  const requirementsData = getRequirements();
  const sectionClasses = getSectionClasses(title);

  return (
    <section className={`${style} lg:pt-[104px]`}>
      <div className={`${sectionClasses}`}>
        <Container>
          <h2 className='mb-8 lg:mb-[72px]'>{SectionDescriptions[title]}</h2>
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
        </Container>
      </div>
    </section>
  );
}
