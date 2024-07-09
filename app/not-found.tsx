import { Metadata } from 'next';

import { MetadataTexts, SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { NotFoundNavigation } from 'components';

export const metadata: Metadata = {
  title: MetadataTexts.notFound.title,
  description: MetadataTexts.notFound.description,
  keywords: MetadataTexts.notFound.keywords,
  // openGraph: MetadataTexts.notFound.openGraph,    //FIXME: --- uncomment
};

export default function NotFound() {
  return (
    <SectionTemplate
      isBigTitle
      title={SectionTitle.NotFound}
      titleStyle='dark:bg-accent-darkGradient dark:bg-clip-text text-monstrousSm dark:text-transparent md:text-[160px] text-accentPrimary lg:text-monstrousLg text-center font-bold [-webkit-text-stroke-width:7px]'
      minHeight='flex flex-col items-center justify-center min-h-mobileScreen md:min-h-tabletScreen lg:min-h-desktopScreen'
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
