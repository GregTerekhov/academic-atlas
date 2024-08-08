import { CtaText, type ISectionProps, SectionTitle } from '../types';

interface IPropsConfig {
  [key: string]: ISectionProps;
}

export const getSectionProps = (
  titleClass?: string | undefined,
  sectionId?: string,
): IPropsConfig => {
  return {
    faqHero: {
      title: SectionTitle.FAQHero,
      titleStyle: 'md:w-[356px] lg:w-[621px] lg:mt-[154px]',
      ctaStyle: 'md:w-[400px] lg:w-[620px] no-margin',
      ctaText: CtaText.FAQHero,
      sectionStyle: 'lg:min-h-[792px]',
      noAlignment: 'text-start',
      hasCtaText: true,
      isBigTitle: true,
      priority: true,
    },
    faqOrdering: {
      title: SectionTitle.FAQOrder,
      ctaStyle: 'text-center max-md:px-3 md:max-lg:px-[15px]',
      ctaText: CtaText.FAQOrder,
      hasCtaText: true,
    },
    page404: {
      title: SectionTitle.NotFound,
      titleStyle: titleClass ?? '',
      sectionStyle:
        'flex flex-col items-center justify-center min-h-mobileScreen md:min-h-tabletScreen lg:min-h-desktopScreen',
      isBigTitle: true,
    },
    offerPage: {
      title: SectionTitle.Offer,
      titleStyle: 'text-center mb-4 md:mb-6 lg:mb-8',
      isBigTitle: true,
    },
    policyPage: {
      title: SectionTitle.Policy,
      titleStyle: 'text-center mb-4 md:mb-6 lg:mb-8',
      isBigTitle: true,
    },
    homeHero: {
      title: SectionTitle.Hero,
      titleStyle: 'md:w-[440px] lg:w-[550px]',
      ctaStyle: 'md:w-[422px] lg:w-[586px]',
      ctaText: CtaText.MainHero,
      isBigTitle: true,
      hasCtaText: true,
      priority: true,
    },
    homePerformers: {
      title: SectionTitle.Performers,
      ctaStyle: 'md:text-center',
      noAlignment: 'max-md:text-start',
      ctaText: CtaText.MainPerformers,
      hasCtaText: true,
    },
    homePromotions: {
      title: SectionTitle.Promotions,
      ctaStyle: 'md:w-[421px] lg:w-[644px]',
      id: sectionId ?? '',
      ctaText: CtaText.MainPromotions,
      noAlignment: 'text-start',
      hasCtaText: true,
    },
    homeAbout: {
      title: SectionTitle.AboutUs,
      id: sectionId ?? '',
    },
    homeCost: {
      title: SectionTitle.FindOutCost,
    },
    homeFeedback: {
      title: SectionTitle.CustomerReviews,
      id: sectionId ?? '',
    },
    homeOverview: {
      title: SectionTitle.HowItWorks,
      id: sectionId ?? '',
    },
    homeServices: {
      title: SectionTitle.OurServices,
      id: sectionId ?? '',
    },
    performersAccession: {
      title: SectionTitle.PartnershipAccession,
    },
    performersBenefits: {
      title: SectionTitle.PartnershipBenefits,
    },
    performersWorkflow: {
      title: SectionTitle.PartnershipWorkflow,
    },
    performersRequirements: {
      title: SectionTitle.PartnershipRequirements,
    },
  };
};
