'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IconName, IconSize, MenuLinks, Paths } from 'types';

import { Container } from 'layout';
import { SvgIconUI } from 'ui';

export default function Breadcrumbs() {
  const [determineCurrentPath, setDetermineCurrentPath] = useState('');
  const currentPath = usePathname();

  useEffect(() => {
    const pathMenuLinkMap = new Map<string, MenuLinks>(
      Object.entries(Paths)
        .filter(([, value]) => !value.includes('#') && value !== Paths.Main)
        .map(([key, value]) => [value, MenuLinks[key as keyof typeof MenuLinks]]),
    );

    if (currentPath && pathMenuLinkMap.has(currentPath)) {
      setDetermineCurrentPath(pathMenuLinkMap.get(currentPath) || '');
    } else {
      setDetermineCurrentPath('');
    }
  }, [currentPath]);

  return (
    <Container>
      <div className='absolute left-6 top-2 flex items-center gap-x-2 md:left-10 md:top-4 lg:left-20 lg:top-6'>
        <Link
          href={Paths.Main}
          className='generalText'
        >
          {MenuLinks.Main}
        </Link>
        <div className='-rotate-90'>
          <SvgIconUI
            id={IconName.Expand}
            size={{ width: IconSize.HalfS, height: IconSize.HalfS }}
            className='fill-whiteBase'
          />
        </div>
        {determineCurrentPath ? (
          <p className='generalText text-accentSecondary'>{determineCurrentPath}</p>
        ) : null}
      </div>
    </Container>
  );
}
