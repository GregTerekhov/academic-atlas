import { SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { NotFoundNavigation } from 'components';

export default function NotFound() {
  return (
    <SectionTemplate
      isBigTitle
      title={SectionTitle.NotFound}
      titleStyle='bg-accent-gradient bg-clip-text text-monstrousSm text-transparent md:text-[160px] lg:text-monstrousLg text-center font-bold drop-shadow-[1px_3px_3px_#f8a401]'
    >
      <h2 className='mb-6 flex flex-col md:mb-8 lg:mb-10'>
        <span>Ой!</span>
        Схоже, ми не можемо знайти сторінку, яку ви шукаєте
      </h2>
      <NotFoundNavigation />
    </SectionTemplate>
  );
}
