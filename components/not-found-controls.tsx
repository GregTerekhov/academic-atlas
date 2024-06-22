'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Paths } from 'types';

import { PrimaryButtonUI } from 'ui';

const NotFoundNavigation = () => {
  const router = useRouter();

  // console.log('console for commit');

  return (
    <ul className='mt-10 gap-x-20  max-md:space-y-6 md:flex md:justify-center md:gap-x-8 lg:gap-x-20'>
      <li>
        <PrimaryButtonUI handleClick={() => router.back()}>Перейти на попередню</PrimaryButtonUI>
      </li>
      <li>
        <Link href={Paths.Main}>
          <PrimaryButtonUI>Перейти на головну</PrimaryButtonUI>
        </Link>
      </li>
    </ul>
  );
};

export default NotFoundNavigation;
