'use client';

import Link from 'next/link';

import { IconName, IconSize, MenuLinks, Paths } from 'types';
import { useBreadcrumbs } from 'hooks';

import { Container } from 'layout';
import { SvgIconUI } from 'ui';

export default function Breadcrumbs() {
  const determinedPath = useBreadcrumbs();

  if (!determinedPath) return null;

  return (
    <Container>
      <div className='absolute left-6 top-2 z-10 flex items-center gap-x-2 md:left-10 md:top-4 lg:left-20 lg:top-6'>
        <Link
          href={Paths.Main}
          className='generalText hocus:text-accentPrimary dark:hocus:text-accentSecondary'
        >
          {MenuLinks.Main}
        </Link>
        <div className='-rotate-90'>
          <SvgIconUI
            id={IconName.Expand}
            size={{ width: IconSize.HalfS, height: IconSize.HalfS }}
            className='fill-darkBase dark:fill-whiteBase'
          />
        </div>
        {determinedPath ? (
          <p className='generalText text-accentPrimary dark:text-accentSecondary'>
            {determinedPath}
          </p>
        ) : null}
      </div>
    </Container>
  );
}
