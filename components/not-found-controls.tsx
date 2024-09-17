'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AriaDescription, AriaId, AriaLabel, Paths, PrimaryButtonLabel } from 'types';

import { PrimaryButtonUI } from 'ui';

import { getPrimaryButtonStyles } from 'styles';
import { useActiveLink } from 'context';

const NotFoundNavigation = () => {
  const router = useRouter();
  const primaryButtonStyle = getPrimaryButtonStyles();
  const { handleActivateLink } = useActiveLink();

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
          href={Paths.Main}
          scroll={true}
          onClick={() => {
            handleActivateLink(Paths.Main);
          }}
          aria-label={AriaLabel.ComeBack}
          className={`${primaryButtonStyle} h-16`}
        >
          {PrimaryButtonLabel.ToMainPage}
        </Link>
      </li>
    </ul>
  );
};

export default NotFoundNavigation;
