import { MetadataTexts, SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { NotFoundNavigation } from 'components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: MetadataTexts.notFound.title,
  description: MetadataTexts.notFound.description,
  keywords: MetadataTexts.notFound.keywords,
};

export default function NotFound() {
  return (
    <SectionTemplate
      isBigTitle
      title={SectionTitle.NotFound}
      titleStyle='bg-accent-gradient bg-clip-text text-monstrousSm text-transparent md:text-[160px] lg:text-monstrousLg text-center font-bold [-webkit-text-stroke-width:7px]'
      minHeight='flex flex-col items-center justify-center md:min-h-screen md:max-lg:max-h-tabletSkeleton'
    >
      <h2 className='mb-6 flex flex-col md:mb-8 lg:mb-10'>
        <span>Ой!</span>
        Схоже, ми не можемо знайти сторінку,
        <br className='hidden max-lg:inline' /> яку ви шукаєте
      </h2>
      <NotFoundNavigation />
    </SectionTemplate>
  );
}
