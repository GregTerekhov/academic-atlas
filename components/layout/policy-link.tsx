'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MenuLinks, Paths } from 'types';

export default function LegacyLink() {
  const pathname = usePathname();
  return (
    <Link
      href={Paths.LegalInfo}
      className='mx-auto block text-center text-xs hocus:text-accentPrimary md:text-sm lg:text-base'
      aria-label='Посилання переходу на сторінку Політики конфіденційності та умов використання'
      aria-current={pathname === Paths.LegalInfo ? 'page' : undefined}
    >
      {MenuLinks.LegalInfo} та умови використання
    </Link>
  );
}
