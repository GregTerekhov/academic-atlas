'use client';

import { useRouter } from 'next/navigation';
import { SectionTemplate } from 'template/index';
import { SectionTitle } from 'types/layoutTypes';
import { PrimaryButtonUI } from 'ui/index';

export default function NotFound() {
  const router = useRouter();

  return (
    <SectionTemplate title={SectionTitle.NotFound}>
      <div className='max-md:p-y-20 flex flex-col items-center justify-center'>
        <h1 className='bg-accent-gradient bg-clip-text text-monstrousSm text-transparent md:text-[160px] lg:text-monstrousLg'>
          404
        </h1>
        <p className='flex flex-col text-center text-2xl md:text-3xl lg:text-4xl'>
          <span>Ой! </span>
          <span>Схоже, ми не можемо знайти сторінку, яку ви шукаєте</span>
        </p>
        <ul className='mt-10 flex justify-center gap-x-20 max-sm:flex-col max-sm:gap-6'>
          <li>
            <PrimaryButtonUI handleClick={() => router.back()}>
              Перейти на попередню
            </PrimaryButtonUI>
          </li>
          <li>
            <PrimaryButtonUI handleClick={() => router.push('/')}>
              Перейти на головну
            </PrimaryButtonUI>
          </li>
        </ul>
      </div>
    </SectionTemplate>
  );
}
