import { Paths, SectionTitle } from '../types';

export const getIdValues = () => {
  return Object.keys(Paths).reduce(
    (acc, key) => {
      const path = Paths[key as keyof typeof Paths];
      const id = path.includes('/#') ? path.replace('/#', '') : path;

      const finalId = path === '/' ? SectionTitle.Hero : id;

      return {
        ...acc,
        [key]: finalId,
      };
    },
    {} as { [key in keyof typeof Paths]?: string },
  );
};
