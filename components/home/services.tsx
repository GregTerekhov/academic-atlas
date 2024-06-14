import Image from 'next/image';

import { SectionTitle, WorkType } from 'types';

import { idValues } from 'helpers';

import { SectionTemplate } from 'template';
// import GridItem from './grid-item';

import diplomas from '../../public/services-1.webp';
import teamPapers from '../../public/services-2.webp';
import bachelorTheses from '../../public/services-3.webp';
import testPapers from '../../public/services-4.webp';
import abstracts from '../../public/services-5.webp';
import practicalWorks from '../../public/services-6.webp';
import presentations from '../../public/services-7.webp';
import caseStudyReports from '../../public/services-8.webp';

export default function Services() {
  return (
    <SectionTemplate
      title={SectionTitle.OurServices}
      id={idValues.Services ?? ''}
    >
      <ul className='mt-8 flex flex-wrap justify-between gap-y-6 md:mt-10 md:gap-y-4 lg:mt-[72px] lg:gap-y-9'>
        <li className='relative h-[120px] w-[152px] overflow-hidden rounded-xl border border-accentSecondary p-2 align-bottom hocus:border-accentPrimary hocus:bg-whiteBase/10 md:w-[160px] lg:h-[307px] lg:w-[293px] lg:p-6'>
          <a
            href='#'
            className='flex h-full w-full flex-col justify-end'
          >
            <Image
              src={diplomas}
              alt='Three notebooks'
              width={152}
              height={80}
              className='absolute left-0 top-0 md:w-40 lg:h-[149px] lg:w-[293px]'
            />
            <h3 className='relative z-10 mb-2 mt-auto min-h-9 text-sm max-lg:text-whiteBase max-md:leading-130 lg:mb-4 lg:min-h-[66px] lg:text-lg'>
              {WorkType.Diplomas} для коледжів, технікумів
            </h3>
            <span className='text-base font-bold text-accentPrimary lg:text-xl'>Замовити</span>
          </a>
        </li>
        <li className='relative h-[120px] w-[152px] overflow-hidden rounded-xl border border-accentSecondary p-2 align-bottom hocus:border-accentPrimary hocus:bg-whiteBase/10 md:w-[160px] lg:h-[307px] lg:w-[293px] lg:p-6'>
          <a
            href='#'
            className='flex h-full w-full flex-col justify-end'
          >
            <Image
              src={teamPapers}
              alt='Three notebooks, a pen and glasses'
              width={152}
              height={80}
              className='absolute left-0 top-0 md:w-40 lg:h-[149px] lg:w-[293px]'
            />
            <h3 className='relative z-10 mb-2 mt-auto min-h-9 text-sm max-lg:text-whiteBase max-md:leading-130 lg:mb-4 lg:min-h-[66px] lg:text-lg'>
              {WorkType.TeamPapers}
            </h3>
            <span className='text-base font-bold text-accentPrimary lg:text-xl'>Замовити</span>
          </a>
        </li>
        <li className='relative h-[120px] w-[152px] overflow-hidden rounded-xl border border-accentSecondary p-2 align-bottom hocus:border-accentPrimary hocus:bg-whiteBase/10 md:w-[160px] lg:h-[307px] lg:w-[293px] lg:p-6'>
          <a
            href='#'
            className='flex h-full w-full flex-col justify-end'
          >
            <Image
              src={bachelorTheses}
              alt='Open book and notebook'
              width={152}
              height={80}
              className='absolute left-0 top-0 md:w-40 lg:h-[149px] lg:w-[293px]'
            />
            <h3 className='relative z-10 mb-2 mt-auto min-h-9 text-sm max-lg:text-whiteBase max-md:leading-130 lg:mb-4 lg:min-h-[66px] lg:text-lg'>
              {WorkType.BachelorTheses}
            </h3>
            <span className='text-base font-bold text-accentPrimary lg:text-xl'>Замовити</span>
          </a>
        </li>
        <li className='relative h-[120px] w-[152px] overflow-hidden rounded-xl border border-accentSecondary p-2 align-bottom hocus:border-accentPrimary hocus:bg-whiteBase/10 md:w-[160px] lg:h-[307px] lg:w-[293px] lg:p-6'>
          <a
            href='#'
            className='flex h-full w-full flex-col justify-end'
          >
            <Image
              src={testPapers}
              alt='A person draws diagrams'
              width={152}
              height={80}
              className='absolute left-0 top-0 md:w-40 lg:h-[149px] lg:w-[293px]'
            />
            <h3 className='relative z-10 mb-2 mt-auto min-h-9 text-sm max-lg:text-whiteBase max-md:leading-130 lg:mb-4 lg:min-h-[66px] lg:text-lg'>
              {WorkType.TestPapers}
            </h3>
            <span className='text-base font-bold text-accentPrimary lg:text-xl'>Замовити</span>
          </a>
        </li>
        <li className='relative h-[120px] w-[152px] overflow-hidden rounded-xl border border-accentSecondary p-2 align-bottom hocus:border-accentPrimary hocus:bg-whiteBase/10 md:w-[160px] lg:h-[307px] lg:w-[293px] lg:p-6'>
          <a
            href='#'
            className='flex h-full w-full flex-col justify-end'
          >
            <Image
              src={abstracts}
              alt='A person moves a pen across the text of a book'
              width={152}
              height={80}
              className='absolute left-0 top-0 md:w-40 lg:h-[149px] lg:w-[293px]'
            />
            <h3 className='relative z-10 mb-2 mt-auto min-h-9 text-sm max-lg:text-whiteBase max-md:leading-130 lg:mb-4 lg:min-h-[66px] lg:text-lg'>
              {WorkType.Abstracts}
            </h3>
            <span className='text-base font-bold text-accentPrimary lg:text-xl'>Замовити</span>
          </a>
        </li>
        <li className='relative h-[120px] w-[152px] overflow-hidden rounded-xl border border-accentSecondary p-2 align-bottom hocus:border-accentPrimary hocus:bg-whiteBase/10 md:w-[160px] lg:h-[307px] lg:w-[293px] lg:p-6'>
          <a
            href='#'
            className='flex h-full w-full flex-col justify-end'
          >
            <Image
              src={practicalWorks}
              alt='Geometric ruler, red marker and calculations'
              width={152}
              height={80}
              className='absolute left-0 top-0 md:w-40 lg:h-[149px] lg:w-[293px]'
            />
            <h3 className='relative z-10 mb-2 mt-auto min-h-9 text-sm max-lg:text-whiteBase max-md:leading-130 lg:mb-4 lg:min-h-[66px] lg:text-lg'>
              {WorkType.PracticalWorks}
            </h3>
            <span className='text-base font-bold text-accentPrimary lg:text-xl'>Замовити</span>
          </a>
        </li>
        <li className='relative h-[120px] w-[152px] overflow-hidden rounded-xl border border-accentSecondary p-2 align-bottom hocus:border-accentPrimary hocus:bg-whiteBase/10 md:w-[160px] lg:h-[307px] lg:w-[293px] lg:p-6'>
          <a
            href='#'
            className='flex h-full w-full flex-col justify-end'
          >
            <Image
              src={presentations}
              alt='A pile of books'
              width={152}
              height={80}
              className='absolute left-0 top-0 md:w-40 lg:h-[149px] lg:w-[293px]'
            />
            <h3 className='relative z-10 mb-2 mt-auto min-h-9 text-sm max-lg:text-whiteBase max-md:leading-130 lg:mb-4 lg:min-h-[66px] lg:text-lg'>
              {WorkType.Presentations}
            </h3>
            <span className='text-base font-bold text-accentPrimary lg:text-xl'>Замовити</span>
          </a>
        </li>
        <li className='relative h-[120px] w-[152px] overflow-hidden rounded-xl border border-accentSecondary p-2 align-bottom hocus:border-accentPrimary hocus:bg-whiteBase/10 md:w-[160px] lg:h-[307px] lg:w-[293px] lg:p-6'>
          <a
            href='#'
            className='flex h-full w-full flex-col justify-end'
          >
            <Image
              src={caseStudyReports}
              alt='Glasses on the book'
              width={152}
              height={80}
              className='absolute left-0 top-0 md:w-40 lg:h-[149px] lg:w-[293px]'
            />
            <h3 className='relative z-10 mb-2 mt-auto min-h-9 text-sm max-lg:text-whiteBase max-md:leading-130 lg:mb-4 lg:min-h-[66px] lg:text-lg'>
              {WorkType.CaseStudyReports}
            </h3>
            <span className='text-base font-bold text-accentPrimary lg:text-xl'>Замовити</span>
          </a>
        </li>
        {/* <GridItem /> */}
      </ul>
    </SectionTemplate>
  );
}
