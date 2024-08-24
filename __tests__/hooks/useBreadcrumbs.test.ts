import { renderHook } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { MenuLinks, Paths } from 'types';
import { createPathsMap } from 'helpers';
import { useBreadcrumbs } from 'hooks';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('helpers/breadcrumbsHelper', () => ({
  createPathsMap: jest.fn(),
  validPaths: [Paths.FAQ, Paths.Policy, Paths.Offer, Paths.Partnership],
}));

describe('useBreadcrumbs hook', () => {
  const mockUsePathname = usePathname as jest.Mock;
  const mockCreatePathsMap = createPathsMap as jest.Mock;

  it.each([
    [MenuLinks.FAQ, Paths.FAQ, new Map<string, MenuLinks>([[Paths.FAQ, MenuLinks.FAQ]])],
    [null, '/invalid-path', new Map<string, MenuLinks>([[Paths.FAQ, MenuLinks.FAQ]])],
    [null, Paths.Promotions, new Map<string, MenuLinks>([[Paths.FAQ, MenuLinks.FAQ]])],
    [null, Paths.FAQ, new Map<string, MenuLinks | undefined>([[Paths.FAQ, undefined]])],
  ])('returns %p for currentPath %p with map %p', (expected, currentPath, pathMenuLinkMap) => {
    mockUsePathname.mockReturnValue(currentPath);
    mockCreatePathsMap.mockReturnValue(pathMenuLinkMap);

    const { result } = renderHook(() => useBreadcrumbs());

    expect(result.current).toBe(expected);
  });
});
