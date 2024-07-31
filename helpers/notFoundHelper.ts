import { Paths } from '../types';

export const isValidHashPaths = (hash: string) => {
  const hashPaths = Object.values(Paths).filter((path) => path.startsWith('/#'));

  return hashPaths.includes(hash as Paths);
};
