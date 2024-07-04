import { SectionTitle } from '../types';

const BACKGROUNDS: Partial<Record<SectionTitle, string>> = {
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

const DEVICES = ['largeDesktop', 'desktop', 'tablet', 'mobile'];

const getBackgroundImagePaths = (baseName: string, device: string): string => {
  return `/backgroundImage/${baseName}-${device}.webp`;
};

export const generateBackgroundImagePaths = (section: SectionTitle) => {
  const baseName = BACKGROUNDS[section];
  if (!baseName) return null;

  return DEVICES.reduce(
    (paths, device) => {
      paths[device] = getBackgroundImagePaths(baseName, device);

      return paths;
    },
    {} as Record<string, string>,
  );
};

export const getSectionClasses = (title: SectionTitle) => {
  return BACKGROUNDS[title]
    ? `relative overflow-hidden py-20 lg:py-[120px]`
    : `bg-transparent py-8 text-darkBase dark:text-whiteBase md:py-16 lg:py-[120px]`;
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
