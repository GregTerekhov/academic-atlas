'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MenuLinks, Paths } from 'types';

export default function LegacyLink() {
  const pathname = usePathname();
  return (
    <p className='text-center'>
      <Link
        href={Paths.LegalInfo}
        className='text-xs hocus:text-accentPrimary md:text-sm lg:text-base'
        aria-label='Посилання переходу на сторінку Політики конфіденційності та умов використання'
        aria-current={pathname === Paths.LegalInfo ? 'page' : undefined}
      >
        {MenuLinks.LegalInfo}
      </Link>
    </p>
  );
}
