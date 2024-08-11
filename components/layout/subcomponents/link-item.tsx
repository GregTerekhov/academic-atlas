'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AriaDescription, AriaId, MenuLinks, Paths } from 'types';
import { useActivateLink } from 'hooks';

import { AriaDescriptionUI } from 'ui';

interface ILegalLinkItemProps {
  href: Paths;
  ariaId: AriaId;
  ariaDescription: AriaDescription;
  linkLabel: MenuLinks;
}

export default function LegalLinkItem({
  href,
  ariaId,
  ariaDescription,
  linkLabel,
}: ILegalLinkItemProps) {
  const pathname = usePathname();
  const { clearActiveLink } = useActivateLink();

  return (
    <>
      <Link
        href={href}
        aria-describedby={ariaId}
        aria-current={pathname === href ? 'page' : undefined}
        onClick={clearActiveLink}
        className='text-xs hocus:text-accentPrimary dark:hocus:text-accentSecondary md:text-sm lg:text-base'
      >
        {linkLabel}
      </Link>
      <AriaDescriptionUI
        id={ariaId}
        description={ariaDescription}
      />
    </>
  );
}
