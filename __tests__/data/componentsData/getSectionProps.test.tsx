import { getSectionProps } from 'data';
import { SectionTitle, CtaText } from 'types';

describe('getSectionProps', () => {
  it('should return correct props for "faqHero"', () => {
    const result = getSectionProps();
    expect(result.faqHero).toEqual({
      title: SectionTitle.FAQHero,
      titleStyle: 'md:w-[356px] lg:w-[621px] lg:mt-[154px]',
      ctaStyle: 'md:w-[400px] lg:w-[620px] no-margin',
      ctaText: CtaText.FAQHero,
      sectionStyle: 'lg:min-h-[792px]',
      noAlignment: 'text-start',
      hasCtaText: true,
      isBigTitle: true,
      priority: true,
    });
  });

  it('should return correct props for "faqOrdering"', () => {
    const result = getSectionProps();
    expect(result.faqOrdering).toEqual({
      title: SectionTitle.FAQOrder,
      ctaStyle: 'text-center max-md:px-3 md:max-lg:px-[15px]',
      ctaText: CtaText.FAQOrder,
      hasCtaText: true,
    });
  });

  it('should handle optional titleClass and sectionId', () => {
    const titleClass = 'custom-title-class';
    const sectionId = 'custom-section-id';

    const result = getSectionProps(titleClass, sectionId);
    expect(result.page404.titleStyle).toBe(titleClass);
    expect(result.homePromotions.id).toBe(sectionId);
    expect(result.homeAbout.id).toBe(sectionId);
    expect(result.homeFeedback.id).toBe(sectionId);
    expect(result.homeOverview.id).toBe(sectionId);
    expect(result.homeServices.id).toBe(sectionId);
  });

  it('should handle default values correctly', () => {
    const result = getSectionProps();
    expect(result.homeAbout.title).toBe(SectionTitle.AboutUs);
    expect(result.homeCost.title).toBe(SectionTitle.FindOutCost);
    expect(result.performersAccession.title).toBe(SectionTitle.PartnershipAccession);
    expect(result.performersBenefits.title).toBe(SectionTitle.PartnershipBenefits);
  });
});
