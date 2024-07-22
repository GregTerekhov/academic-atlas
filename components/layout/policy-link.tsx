'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AriaDescription, AriaId, MenuLinks, Paths } from 'types';
import { AriaDescriptionUI } from 'ui/index';

export default function LegacyLink() {
  const pathname = usePathname();
  return (
    <p className='text-center'>
      <Link
        href={Paths.LegalInfo}
        className='text-xs hocus:text-accentPrimary md:text-sm lg:text-base'
        aria-describedby={AriaId.Policy}
        aria-current={pathname === Paths.LegalInfo ? 'page' : undefined}
      >
        {MenuLinks.LegalInfo}
      </Link>
      <AriaDescriptionUI
        id={AriaId.Policy}
        description={AriaDescription.Policy}
      />
    </p>
  );
}
