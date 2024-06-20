'use client';

import Link from 'next/link';
import { SvgIconUI } from 'ui';
import { usePathname } from 'next/navigation';
import { IconName, IconSize } from 'types/ui';
import { useEffect, useState } from 'react';

enum BreadcrumbsPaths {
  partnership = '/partnership',
  FAQ = '/FAQ',
}

const BreadcrumbsPathsDescription = {
  [BreadcrumbsPaths.partnership]: 'Виконавцям',
  [BreadcrumbsPaths.FAQ]: 'Часті питання',
};

export default function Breadcrumbs() {
  const [determineCurrentPath, setDetermineCurrentPath] = useState<string | null>(null);
  const currentPath = usePathname();

  useEffect(() => {
    if (currentPath === BreadcrumbsPaths.partnership) {
      console.log('curPATH', currentPath);
      setDetermineCurrentPath(BreadcrumbsPathsDescription[currentPath]);
    } else if (currentPath === BreadcrumbsPaths.FAQ) {
      setDetermineCurrentPath(BreadcrumbsPathsDescription[currentPath]);
    }
  }, [currentPath]);

  return (
    <>
      <ul className='absolute left-20 top-6 flex items-center gap-1.5  max-md:left-10 max-md:top-4 '>
        <li className='text-big max-md:text-base'>
          <Link href='/'>Головна</Link>
        </li>
        <li className='rotate-[270deg]'>
          <SvgIconUI
            id={IconName.Expand}
            size={{ width: IconSize.M, height: IconSize.M }}
            className='fill-whiteBase'
          />
        </li>
        <li className='text-big text-accentSecondary max-md:text-base'>{determineCurrentPath}</li>
      </ul>
    </>
  );
}
