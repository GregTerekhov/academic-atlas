import { SectionTitle } from '../types';

const getBackgrounds = (): Partial<Record<SectionTitle, string>> => {
  return {
    [SectionTitle.Hero]: 'bg-hero',
    [SectionTitle.FindOutCost]: 'bg-find-out-cost',
    [SectionTitle.Performers]: 'bg-performers',
    [SectionTitle.Promotions]: 'bg-promotions',
    [SectionTitle.NotFound]: 'bg-notFound',
    [SectionTitle.PartnershipHero]: 'bg-performers-hero',
    [SectionTitle.PartnershipBenefits]: 'bg-partnership-benefits',
    [SectionTitle.PartnershipRequirements]: 'bg-partnership-requirements',
    [SectionTitle.FAQOrder]: 'bg-faq-order',
  };
};

export const getSectionClasses = (title: SectionTitle) => {
  const backgroundVariants = getBackgrounds();

  return backgroundVariants[title]
    ? `${backgroundVariants[title]} relative w-full max-w-[4000px] mx-auto bg-cover bg-center bg-no-repeat py-20 text-whiteBase before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-accentSecondary/10 before:content-[""] lg:py-[120px]`
    : 'bg-transparent py-8 text-darkBase dark:text-whiteBase md:py-16 lg:py-[104px]';
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
