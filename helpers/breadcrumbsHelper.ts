import { MenuLinks, Paths } from '../types';

export const validPaths = [Paths.FAQ, Paths.Policy, Paths.Offer, Paths.Partnership];

export const createPathsMap = () =>
  new Map<string, MenuLinks>(
    Object.entries(Paths)
      .filter(([, value]) => !value.includes('#') && validPaths.includes(value))
      .map(([key, value]) => [value, MenuLinks[key as keyof typeof MenuLinks]]),
  );
