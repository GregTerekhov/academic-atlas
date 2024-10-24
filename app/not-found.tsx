import type { Metadata } from 'next';

import { getSectionProps, MetadataTexts } from 'data';

import { SectionTemplate } from 'template';
import { NotFoundNavigation } from 'components';

import { get404PageTitleStyles } from 'styles';

const { notFound } = MetadataTexts;
const { title, description, openGraph } = notFound;

export const metadata: Metadata = {
  title,
  description,
  openGraph,   
};

export default function NotFound() {
  const titleClass = get404PageTitleStyles();
  const sectionProps = getSectionProps(titleClass);
  const notFoundProps = sectionProps.page404;

  return (
    <SectionTemplate {...notFoundProps}>
      <h2 className='mb-6 flex flex-col md:mb-8 lg:mb-10'>
        <span>Ой!</span>
        Схоже, ми не можемо знайти сторінку,
        <br className='hidden max-lg:inline' /> яку ви шукаєте
      </h2>
      <NotFoundNavigation />
    </SectionTemplate>
  );
}
