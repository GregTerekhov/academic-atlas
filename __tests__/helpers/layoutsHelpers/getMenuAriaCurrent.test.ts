import { getMenuAriaCurrent } from 'helpers';
import { AriaCurrent, Paths } from 'types';

describe('getMenuAriaCurrent', () => {
  it('returns location for hash paths', () => {
    expect(getMenuAriaCurrent(Paths.AboutUs, '/', true)).toBe(AriaCurrent.Location);
  });

  it('returns page for exact pathname match', () => {
    expect(getMenuAriaCurrent(Paths.FAQ, '/FAQ', false)).toBe(AriaCurrent.Page);
  });

  it('returns undefined for non-matching paths and inactive states', () => {
    expect(getMenuAriaCurrent('/current-page' as Paths, '/different-page', false)).toBeUndefined();
  });
});
