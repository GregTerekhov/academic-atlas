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

  it('returns the correct header if currentPath is in validPaths', () => {
    mockUsePathname.mockReturnValue(Paths.FAQ);

    const mockPathMenuLinkMap = new Map<string, MenuLinks>([[Paths.FAQ, MenuLinks.FAQ]]);

    mockCreatePathsMap.mockReturnValue(mockPathMenuLinkMap);

    const { result } = renderHook(() => useBreadcrumbs());

    expect(result.current).toBe(MenuLinks.FAQ);
  });

  it('returns null if currentPath is not in validPaths', () => {
    mockUsePathname.mockReturnValue('/invalid-path');

    const { result } = renderHook(() => useBreadcrumbs());

    expect(result.current).toBeNull();
  });

  it('returns null if currentPath is not a key in map', () => {
    mockUsePathname.mockReturnValue(Paths.Promotions);

    const mockPathMenuLinkMap = new Map<string, MenuLinks>([[Paths.FAQ, MenuLinks.FAQ]]);

    mockCreatePathsMap.mockReturnValue(mockPathMenuLinkMap);

    const { result } = renderHook(() => useBreadcrumbs());

    expect(result.current).toBeNull();
  });

  it('sets determinedCurrentPath to null if pathMenuLinkMap.get(currentPath) returns null or undefined', () => {
    mockUsePathname.mockReturnValue(Paths.FAQ);

    const mockPathMenuLinkMap = new Map<string, MenuLinks | undefined>([[Paths.FAQ, undefined]]);

    mockCreatePathsMap.mockReturnValue(mockPathMenuLinkMap);

    const { result } = renderHook(() => useBreadcrumbs());

    expect(result.current).toBeNull();
  });
});
