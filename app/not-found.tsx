import type { Metadata } from 'next';

import { SectionTitle } from 'types';
import { MetadataTexts } from 'helpers';

import { SectionTemplate } from 'template';
import { NotFoundNavigation } from 'components';

// import { get404PageTitleStyles } from 'styles'; //FIXME: use this function

const { notFound } = MetadataTexts;
const { title, description, keywords } = notFound;

export const metadata: Metadata = {
  title,
  description,
  keywords,
  // openGraph,    //FIXME: --- uncomment
};

export default function NotFound() {
  // const titleClass = get404PageTitleStyles(); //FIXME: use this const

  return (
    <SectionTemplate
      isBigTitle
      title={SectionTitle.NotFound}
      titleStyle='dark:bg-accent-darkGradient dark:bg-clip-text text-monstrousSm dark:text-transparent md:text-[160px] text-accentPrimary lg:text-monstrousLg text-center font-bold [-webkit-text-stroke-width:7px]'
      sectionStyle='flex flex-col items-center justify-center min-h-mobileScreen md:min-h-tabletScreen lg:min-h-desktopScreen'
    >
      {/* FIXME: replace styles for titleStyle prop on const titleClass */}
      <h2 className='mb-6 flex flex-col md:mb-8 lg:mb-10'>
        <span>Ой!</span>
        Схоже, ми не можемо знайти сторінку,
        <br className='hidden max-lg:inline' /> яку ви шукаєте
      </h2>
      <NotFoundNavigation />
    </SectionTemplate>
  );
}
