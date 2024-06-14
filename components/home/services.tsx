import { IServiceItem, SectionTitle, WorkType } from 'types';

import { idValues } from 'helpers';

import { SectionTemplate } from 'template';
import ServiceItem from './service-item';

import diplomas from '../../public/services-1.webp';
import teamPapers from '../../public/services-2.webp';
import bachelorTheses from '../../public/services-3.webp';
import testPapers from '../../public/services-4.webp';
import abstracts from '../../public/services-5.webp';
import practicalWorks from '../../public/services-6.webp';
import presentations from '../../public/services-7.webp';
import caseStudyReports from '../../public/services-8.webp';

export default function Services() {
  const serviceItems: IServiceItem[] = [
    {
      imageSrc: diplomas,
      imageAlt: 'Three notebooks',
      serviceTitle: WorkType.Diplomas,
    },
    {
      imageSrc: teamPapers,
      imageAlt: 'Three notebooks, a pen and glasses',
      serviceTitle: WorkType.TeamPapers,
    },
    {
      imageSrc: bachelorTheses,
      imageAlt: 'Open book and notebook',
      serviceTitle: WorkType.BachelorTheses,
    },
    {
      imageSrc: testPapers,
      imageAlt: 'A person draws diagrams',
      serviceTitle: WorkType.TestPapers,
    },
    {
      imageSrc: abstracts,
      imageAlt: 'A person moves a pen across the text of a book',
      serviceTitle: WorkType.Abstracts,
    },
    {
      imageSrc: practicalWorks,
      imageAlt: 'Geometric ruler, red marker and calculations',
      serviceTitle: WorkType.PracticalWorks,
    },
    {
      imageSrc: presentations,
      imageAlt: 'A pile of books',
      serviceTitle: WorkType.Presentations,
    },
    {
      imageSrc: caseStudyReports,
      imageAlt: 'Glasses on the book',
      serviceTitle: WorkType.CaseStudyReports,
    },
  ];

  return (
    <SectionTemplate
      title={SectionTitle.OurServices}
      id={idValues.Services ?? ''}
    >
      <ul className='mt-8 flex flex-wrap justify-between gap-y-6 md:mt-10 md:gap-y-4 lg:mt-[72px] lg:gap-y-9'>
        {Array.isArray(serviceItems) &&
          serviceItems.map(({ imageSrc, imageAlt, serviceTitle }) => (
            <ServiceItem
              key={serviceTitle}
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              serviceTitle={serviceTitle}
            />
          ))}
      </ul>
    </SectionTemplate>
  );
}
