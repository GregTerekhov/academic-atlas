import { SectionTitle, SectionDescriptions, CtaText } from 'types';

import { generateBackgroundImagePaths, getSectionClasses, getTitleClasses } from 'helpers';

import { Container } from 'layout';
import { CallToActionText } from 'components';
import { BackgroundImageUI } from 'ui';

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
  priority?: boolean;
}

export default function Section({
  title,
  children,
  id,
  titleStyle,
  noAlignment,
  ctaStyle,
  minHeight = '',
  isBigTitle = false,
  ctaText = CtaText.NoText,
  hasCtaText = false,
  priority = false,
}: Readonly<ISectionTemplate>) {
  const sectionClasses = getSectionClasses(title);
  const titleClass = getTitleClasses(isBigTitle, hasCtaText, titleStyle, noAlignment);
  const backgroundImagePaths = generateBackgroundImagePaths(title);

  return (
    <section
      id={id}
      className={`${sectionClasses} ${minHeight} relative py-20 lg:py-[120px]`}
    >
      {backgroundImagePaths && (
        <BackgroundImageUI
          alt={SectionDescriptions[title]}
          largeDesktopSrc={backgroundImagePaths.largeDesktop}
          desktopSrc={backgroundImagePaths.desktop}
          tabletSrc={backgroundImagePaths.tablet}
          mobileSrc={backgroundImagePaths.mobile}
          priority={priority}
        />
      )}
      {backgroundImagePaths && (
        <div className='absolute inset-0 h-full w-full bg-accentPrimary/10 bg-section-overlay-light dark:bg-accentPrimary/5 dark:bg-section-overlay-dark'></div>
      )}
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
