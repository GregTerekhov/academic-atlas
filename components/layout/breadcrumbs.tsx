'use client';

import Link from 'next/link';
import { SvgIconUI } from 'ui';
import { usePathname } from 'next/navigation';
import { IconName, IconSize } from 'types/ui';
import { useEffect, useState } from 'react';
import { MenuLinks, Paths } from 'types/layoutTypes';

export default function Breadcrumbs() {
  const [determineCurrentPath, setDetermineCurrentPath] = useState<string | null>(null);
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
    <div className='absolute left-20 top-6 flex items-center gap-x-2  max-md:left-10 max-md:top-4 '>
      <Link
        href='/'
        className='generalText'
      >
        Головна
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
  );
}

//  ,
