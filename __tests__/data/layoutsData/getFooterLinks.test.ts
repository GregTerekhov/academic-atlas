import { getFooterLinks } from 'data';
import { MenuLinks, Paths } from 'types';

describe('getFooterLinks', () => {
  it('returns correct footer links data', () => {
    const result = getFooterLinks();

    expect(result).toEqual([
      { id: 'overview', path: Paths.Overview, label: MenuLinks.Overview },
      { id: 'about-us', path: Paths.AboutUs, label: MenuLinks.AboutUs },
      { id: 'feedback', path: Paths.Feedback, label: MenuLinks.Feedback },
      { id: 'services', path: Paths.Services, label: MenuLinks.Services },
      { id: 'promotions', path: Paths.Promotions, label: MenuLinks.Promotions },
      { path: Paths.FAQ, label: MenuLinks.FAQ },
      { path: Paths.Partnership, label: MenuLinks.Partnership },
    ]);
  });
});
