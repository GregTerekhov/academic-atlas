import { getAdaptedLinks } from 'data';
import { MenuLinks, Paths } from 'types';

describe('getAdaptedLinks', () => {
  it('returns correct adapted links data', () => {
    const result = getAdaptedLinks();

    expect(result).toEqual([
      { id: 'main', path: Paths.Main, label: MenuLinks.Main },
      { id: 'services', path: Paths.Services, label: MenuLinks.Services },
      { id: 'about-us', path: Paths.AboutUs, label: MenuLinks.AboutUs },
      { id: 'feedback', path: Paths.Feedback, label: MenuLinks.Feedback },
      { path: Paths.FAQ, label: MenuLinks.FAQ },
      { path: Paths.Partnership, label: MenuLinks.Partnership },
    ]);
  });
});
