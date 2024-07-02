import { SectionTitle } from '../types';

const getBackgrounds = (): Partial<Record<SectionTitle, string>> => {
  return {
    [SectionTitle.Hero]: 'hero',
    [SectionTitle.FindOutCost]: 'find-out-cost',
    [SectionTitle.Performers]: 'performers',
    [SectionTitle.Promotions]: 'promotions',
    [SectionTitle.NotFound]: 'notFound',
    [SectionTitle.PartnershipHero]: 'performers-hero',
    [SectionTitle.PartnershipBenefits]: 'partnership-benefits',
    [SectionTitle.PartnershipRequirements]: 'partnership-requirements',
    [SectionTitle.FAQOrder]: 'faq-order',
  };
};

// export const getSectionClasses = (title: SectionTitle) => {
//   const backgroundVariants = getBackgrounds();

//   return backgroundVariants[title]
//     ? `${backgroundVariants[title]} backgroundSection before:bg-accentSecondary/10 py-20 lg:py-[104px]`
//     : 'bg-transparent py-8 text-darkBase dark:text-whiteBase md:py-16 lg:py-[104px]';
// };

const getBackgroundImagePaths = (baseName: string, device: string, theme: string): string => {
  return `/backgroundImage/${baseName}-${device}-${theme}.webp`;
};

export const generateBackgroundImagePaths = (section: SectionTitle) => {
  const baseName = getBackgrounds()[section];
  if (!baseName) return null;

  const devices = ['desktop', 'tablet', 'mobile'];
  const themes = ['light', 'dark'];

  const paths: Record<string, string> = {};

  devices.forEach((device) => {
    themes.forEach((theme) => {
      paths[`${device}-${theme}`] = getBackgroundImagePaths(baseName, device, theme);
    });
  });

  return paths;
};

export const getTitleClasses = (
  isBigTitle: boolean,
  hasCtaText: boolean,
  titleStyle: string = '',
  noAlignment: string = '',
) => {
  const ctaClass = hasCtaText
    ? 'mb-4 md:mb-6 lg:mb-8'
    : !isBigTitle && !titleStyle.includes('no-margin')
      ? 'mb-8 md:mb-10 lg:mb-[72px]'
      : '';
  const customBigTitleClass = isBigTitle ? titleStyle : '';

  return `${ctaClass} ${noAlignment} ${customBigTitleClass}`.trim();
};
