'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { IconName, IconSize, MenuLinks, Paths } from 'types';

import { Container } from 'layout';
import { SvgIconUI } from 'ui';

const validPaths = [Paths.FAQ, Paths.LegalInfo, Paths.Partnership];

export default function Breadcrumbs() {
  const [determineCurrentPath, setDetermineCurrentPath] = useState('');
  const currentPath = usePathname();

  useEffect(() => {
    const pathMenuLinkMap = new Map<string, MenuLinks>(
      Object.entries(Paths)
        .filter(([, value]) => !value.includes('#') && validPaths.includes(value))
        .map(([key, value]) => [value, MenuLinks[key as keyof typeof MenuLinks]]),
    );

    if (currentPath && pathMenuLinkMap.has(currentPath)) {
      setDetermineCurrentPath(pathMenuLinkMap.get(currentPath) || '');
    } else {
      setDetermineCurrentPath('');
    }
  }, [currentPath]);

  if (!validPaths.includes(currentPath as Paths)) {
    return null;
  }

  return (
    <Container>
      <div className='absolute left-6 top-2 z-10 flex items-center gap-x-2 md:left-10 md:top-4 lg:left-20 lg:top-6'>
        <Link
          href={Paths.Main}
          className='generalText hocus:text-accentSecondary'
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
          <p className='generalText text-accentPrimary'>{determineCurrentPath}</p>
        ) : null}
      </div>
    </Container>
  );
}
