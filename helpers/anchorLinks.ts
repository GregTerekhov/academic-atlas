import { Paths } from '../types';

export const getIdValues = () => {
  return Object.keys(Paths).reduce(
    (acc, key) => {
      const path = Paths[key as keyof typeof Paths];
      const id = path.includes('/#') ? path.replace('/#', '') : path;

      return {
        ...acc,
        [key]: id,
      };
    },
    {} as { [key in keyof typeof Paths]?: string },
  );
};
