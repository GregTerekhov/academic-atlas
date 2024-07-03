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

const getBackgroundImagePaths = (baseName: string, device: string): string => {
  return `/backgroundImage/${baseName}-${device}.webp`;
};

export const generateBackgroundImagePaths = (section: SectionTitle) => {
  const baseName = getBackgrounds()[section];
  if (!baseName) return null;

  const devices = ['largeDesktop', 'desktop', 'tablet', 'mobile'];

  const paths: Record<string, string> = {};

  devices.forEach((device) => {
    paths[`${device}`] = getBackgroundImagePaths(baseName, device);
  });

  return paths;
};

export const getSectionClasses = (title: SectionTitle, theme: string) => {
  const backgroundVariants = getBackgrounds();
  const baseClass = 'relative overflow-hidden py-20 lg:py-[120px]';

  if (backgroundVariants[title]) {
    const backgroundOverlayClass =
      theme === 'dark'
        ? 'bg-[rgba(32, 145, 249, 0.1)] bg-gradient-dark '
        : 'bg-[rgba(32, 145, 249, 0.05)] bg-gradient-dark opacity-65';

    return `${backgroundOverlayClass} ${baseClass}`;
  }

  return `bg-transparent py-8 text-darkBase dark:text-whiteBase md:py-16 lg:py-[104px]`;
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
