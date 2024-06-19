import { SectionTitle, SectionDescriptions, CtaText } from 'types';

import { Container } from 'layout';
import { CallToActionText } from 'components/index';

interface ISectionTemplate {
  title: SectionTitle;
  children: React.ReactNode;
  isBigTitle?: boolean;
  id?: string;
  titleStyle?: string;
  noAlignment?: string;
  ctaStyle?: string;
  ctaText?: CtaText;
  hasCtaText?: boolean;
}

export default function Section({
  title,
  children,
  isBigTitle = false,
  id,
  titleStyle,
  noAlignment,
  ctaStyle,
  ctaText = CtaText.NoText,
  hasCtaText = false,
}: Readonly<ISectionTemplate>) {
  const backgroundVariants: Partial<Record<SectionTitle, string>> = {
    [SectionTitle.Hero]: 'bg-hero',
    [SectionTitle.FindOutCost]: 'bg-find-out-cost',
    [SectionTitle.Performers]: 'bg-performers',
    [SectionTitle.Promotions]: 'bg-promotions',
    [SectionTitle.NotFound]: 'bg-notFound',
  };

  return (
    <section
      id={id}
      className={
        backgroundVariants[title]
          ? `${backgroundVariants[title]} relative w-full bg-cover bg-center bg-no-repeat py-20 text-whiteBase before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-accentSecondary/10 before:content-[""] lg:py-[120px]`
          : 'bg-transparent py-8 text-darkBase dark:text-whiteBase md:py-16 lg:py-[104px]'
      }
    >
      <Container>
        {isBigTitle ? (
          <>
            <h1 className={`${titleStyle ?? ''} ${hasCtaText ? 'mb-4 md:mb-6 lg:mb-8' : ''}`}>
              {SectionDescriptions[title]}
            </h1>
            {hasCtaText && (
              <CallToActionText
                ctaStyle={ctaStyle}
                ctaText={ctaText}
              />
            )}
          </>
        ) : (
          <>
            <h2
              className={`${noAlignment ?? ''} ${hasCtaText ? 'mb-4 md:mb-6 lg:mb-8' : 'mb-8 md:mb-10 lg:mb-[72px]'}`}
            >
              {SectionDescriptions[title]}
            </h2>
            {hasCtaText && (
              <CallToActionText
                ctaStyle={ctaStyle}
                ctaText={ctaText}
              />
            )}
          </>
        )}
        {children}
      </Container>
    </section>
  );
}
