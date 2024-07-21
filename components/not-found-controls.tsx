'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AriaDescription, AriaId, Paths, PrimaryButtonLabel } from 'types';
import { getPrimaryButtonStyles } from 'helpers';

import { PrimaryButtonUI } from 'ui';

const NotFoundNavigation = () => {
  const router = useRouter();
  const primaryButtonStyle = getPrimaryButtonStyles();

  return (
    <ul className='mt-10 gap-x-20 max-md:space-y-6 md:flex md:justify-center md:gap-x-8 lg:gap-x-20'>
      <li>
        <PrimaryButtonUI
          ariaId={AriaId.ComeBack404}
          ariaDescription={AriaDescription.ComeBack404}
          handleClick={() => router.back()}
        >
          {PrimaryButtonLabel.ToPreviousPage}
        </PrimaryButtonUI>
      </li>
      <li>
        <Link
          aria-label='Кнопка для повернення на головну сторінку'
          href={Paths.Main}
          className={`${primaryButtonStyle} h-16 `}
        >
          {PrimaryButtonLabel.ToMainPage}
        </Link>
      </li>
    </ul>
  );
};

export default NotFoundNavigation;
