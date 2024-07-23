'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AriaDescription, AriaId, MenuLinks, Paths } from 'types';
import { AriaDescriptionUI } from 'ui/index';

export default function LegalLink() {
  const pathname = usePathname();
  return (
    <p className='text-center text-xs'>
      <Link
        href={Paths.Policy}
        className='text-xs hocus:text-accentPrimary md:text-sm lg:text-base'
        aria-describedby={AriaId.Policy}
        aria-current={pathname === Paths.Policy ? 'page' : undefined}
      >
        {MenuLinks.Policy}
      </Link>
      <AriaDescriptionUI
        id={AriaId.Policy}
        description={AriaDescription.Policy}
      />{' '}
      та{' '}
      <Link
        href={Paths.Offer}
        className='text-xs hocus:text-accentPrimary md:text-sm lg:text-base'
        aria-describedby={AriaId.Offer}
        aria-current={pathname === Paths.Offer ? 'page' : undefined}
      >
        {MenuLinks.Offer}
      </Link>
      <AriaDescriptionUI
        id={AriaId.Offer}
        description={AriaDescription.Offer}
      />
    </p>
  );
}
