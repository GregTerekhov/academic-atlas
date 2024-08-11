import { MenuLinks, Paths } from 'types';
import { createPathsMap, validPaths } from 'helpers';

describe('createPathsMap', () => {
  it('should return a map with the correct paths and corresponding MenuLinks', () => {
    const pathsMap = createPathsMap();

    validPaths.forEach((path) => {
      expect(pathsMap.has(path)).toBe(true);

      const key = Object.keys(Paths).find(
        (k) => Paths[k as keyof typeof Paths] === path,
      ) as keyof typeof MenuLinks;
      expect(pathsMap.get(path)).toBe(MenuLinks[key]);
    });

    expect(pathsMap.size).toBe(validPaths.length);
  });
});
