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

describe('useBreadcrumbs', () => {
  it('returns the correct header if currentPath is in validPaths', () => {
    (usePathname as jest.Mock).mockReturnValue(Paths.FAQ);

    const mockPathMenuLinkMap = new Map<string, MenuLinks>([[Paths.FAQ, MenuLinks.FAQ]]);

    (createPathsMap as jest.Mock).mockReturnValue(mockPathMenuLinkMap);

    const { result } = renderHook(() => useBreadcrumbs());

    expect(result.current).toBe(MenuLinks.FAQ);
  });

  it('returns null if currentPath is not in validPaths', () => {
    (usePathname as jest.Mock).mockReturnValue('/invalid-path');

    const { result } = renderHook(() => useBreadcrumbs());

    expect(result.current).toBeNull();
  });

  it('returns null if currentPath is not a key in map', () => {
    (usePathname as jest.Mock).mockReturnValue(Paths.Promotions);

    const mockPathMenuLinkMap = new Map<string, MenuLinks>([[Paths.FAQ, MenuLinks.FAQ]]);

    (createPathsMap as jest.Mock).mockReturnValue(mockPathMenuLinkMap);

    const { result } = renderHook(() => useBreadcrumbs());

    expect(result.current).toBeNull();
  });
});
