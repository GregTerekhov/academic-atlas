import { getMenuAriaCurrent } from 'helpers';
import { Paths } from 'types';

describe('getMenuAriaCurrent', () => {
  // eslint-disable-next-line jest/no-commented-out-tests
  //   it('returns location for hash paths', () => {
  //     expect(getMenuAriaCurrent(Paths.AboutUs, '#about-us', true)).toBe('location');
  //   }); //FIXME

  it('returns page for exact pathname match', () => {
    expect(getMenuAriaCurrent(Paths.FAQ, '/FAQ', false)).toBe('page');
  });

  it('returns page for active non-hash path', () => {
    expect(getMenuAriaCurrent(Paths.Offer, '/offer', true)).toBe('page');
  });

  it('returns undefined for non-matching paths and inactive states', () => {
    expect(getMenuAriaCurrent('/current-page' as Paths, '/different-page', false)).toBeUndefined();
  });
});
