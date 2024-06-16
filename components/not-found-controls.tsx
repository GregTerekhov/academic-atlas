'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PrimaryButtonUI } from 'ui/index';

const NotFoundNavigation = () => {
  const router = useRouter();

  return (
    <ul className='mt-10 flex justify-center gap-x-20 max-md:gap-x-8 max-sm:flex-col max-sm:gap-6'>
      <li>
        <PrimaryButtonUI handleClick={() => router.back()}>Перейти на попередню</PrimaryButtonUI>
      </li>
      <li>
        <Link href='/'>
          <PrimaryButtonUI>Перейти на головну</PrimaryButtonUI>
        </Link>
      </li>
    </ul>
  );
};

export default NotFoundNavigation;
