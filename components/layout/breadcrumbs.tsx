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
    const pathMenuLinkMap = new Map();
    const enumMergeChain = Object.entries(Paths)
      .filter(([, value]) => !value.includes('#') && value !== Paths.Main)
      .map(([key, value]) => [value, MenuLinks[key as keyof typeof MenuLinks]]);

    for (const [, value] of Object.entries(enumMergeChain)) {
      pathMenuLinkMap.set(value[0], value[1]);
    }

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
        className='text-big max-md:text-sm max-md:leading-130 lg:text-big'
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
      <p className='text-big text-accentSecondary max-md:text-sm max-md:leading-130 lg:text-big '>
        {determineCurrentPath}
      </p>
    </div>
  );
}

//  ,
