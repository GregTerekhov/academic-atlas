import { SectionTitle, SectionDescriptions, CtaText } from 'types';

import { getSectionClasses, getTitleClasses } from 'helpers';

import { Container } from 'layout';
import { CallToActionText } from 'components';

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
  minHeight?: string;
}

export default function Section({
  title,
  children,
  id,
  titleStyle,
  noAlignment,
  ctaStyle,
  minHeight,
  isBigTitle = false,
  ctaText = CtaText.NoText,
  hasCtaText = false,
}: Readonly<ISectionTemplate>) {
  const sectionClasses = getSectionClasses(title);
  const titleClass = getTitleClasses(isBigTitle, hasCtaText, titleStyle, noAlignment);

  return (
    <section
      id={id}
      className={`${sectionClasses} ${minHeight}`}
    >
      <Container>
        {isBigTitle ? (
          <h1 className={titleClass}>{SectionDescriptions[title]}</h1>
        ) : (
          <h2 className={titleClass}>{SectionDescriptions[title]}</h2>
        )}
        {hasCtaText && (
          <CallToActionText
            ctaStyle={ctaStyle}
            ctaText={ctaText}
          />
        )}
        {children}
      </Container>
    </section>
  );
}
