'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Paths } from '../types';
import { createPathsMap, validPaths } from 'helpers';

export const useBreadcrumbs = () => {
  const [determinedCurrentPath, setDeterminedCurrentPath] = useState<string | null>(null);
  const currentPath = usePathname();

  useEffect(() => {
    const pathMenuLinkMap = createPathsMap();

    if (pathMenuLinkMap.has(currentPath)) {
      setDeterminedCurrentPath(pathMenuLinkMap.get(currentPath) || null);
    } else {
      setDeterminedCurrentPath(null);
    }
  }, [currentPath]);

  if (!validPaths.includes(currentPath as Paths)) {
    return null;
  }

  return determinedCurrentPath;
};
