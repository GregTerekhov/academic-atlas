'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Paths, PrimaryButtonLabel } from 'types';

import { PrimaryButtonUI } from 'ui';

const NotFoundNavigation = () => {
  const router = useRouter();

  return (
    <ul className='mt-10 gap-x-20 max-md:space-y-6 md:flex md:justify-center md:gap-x-8 lg:gap-x-20'>
      <li>
        <PrimaryButtonUI handleClick={() => router.back()}>
          {PrimaryButtonLabel.ToPreviousPage}
        </PrimaryButtonUI>
      </li>
      <li>
        <Link href={Paths.Main}>
          <PrimaryButtonUI>{PrimaryButtonLabel.ToMainPage}</PrimaryButtonUI>
        </Link>
      </li>
    </ul>
  );
};

export default NotFoundNavigation;
