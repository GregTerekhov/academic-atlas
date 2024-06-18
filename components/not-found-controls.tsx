'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Paths } from 'types';

import { PrimaryButtonUI } from 'ui';

const NotFoundNavigation = () => {
  const router = useRouter();

  return (
    <ul className='mt-10 flex justify-center gap-x-20 max-md:flex-col max-md:gap-6'>
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
