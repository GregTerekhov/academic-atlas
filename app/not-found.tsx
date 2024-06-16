import { NotFoundNavigation } from 'helpers/not-found-controls';
import { SectionTemplate } from 'template/index';
import { SectionTitle } from 'types/layoutTypes';

export default function NotFound() {
  return (
    <SectionTemplate
      isBigTitle={true}
      title={SectionTitle.NotFound}
      titleStyle='bg-accent-gradient bg-clip-text text-monstrousSm text-transparent md:text-[160px] lg:text-monstrousLg text-center'
    >
      <h2 className='flex flex-col'>
        <span>Ой!</span>
        Схоже, ми не можемо знайти сторінку, яку ви шукаєте
      </h2>
      <NotFoundNavigation />
    </SectionTemplate>
  );
}
