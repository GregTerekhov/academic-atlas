import { generateBackgroundImagePaths } from 'helpers';
import { SectionTitle, BACKGROUNDS } from 'types';

describe('generateBackgroundImagePaths', () => {
  it('returns null for unknown section', () => {
    expect(generateBackgroundImagePaths('unknown-section' as SectionTitle)).toBeNull();
  });

  const sectionsToTest = [SectionTitle.Hero, SectionTitle.PartnershipHero];

  it.each(sectionsToTest)('returns correct paths for %s section', (section) => {
    const baseName = BACKGROUNDS[section];
    const expectedPaths = {
      largeDesktop: `/backgroundImage/${baseName}-largeDesktop.webp`,
      desktop: `/backgroundImage/${baseName}-desktop.webp`,
      tablet: `/backgroundImage/${baseName}-tablet.webp`,
      mobile: `/backgroundImage/${baseName}-mobile.webp`,
    };

    expect(generateBackgroundImagePaths(section)).toEqual(expectedPaths);
  });
});
