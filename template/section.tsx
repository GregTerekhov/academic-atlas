import { SectionTitle, SectionDescriptions, CtaText, type IWithChildren } from 'types';
import { generateBackgroundImagePaths } from 'helpers';

import { Container } from 'layout';
import { CallToActionText } from 'components';
import { BackgroundImageUI } from 'ui';

import { getSectionClasses, getTitleClasses } from 'styles';

interface ISectionTemplate extends IWithChildren {
  title: SectionTitle;
  isBigTitle?: boolean;
  id?: string;
  titleStyle?: string;
  noAlignment?: string;
  ctaStyle?: string;
  ctaText?: CtaText;
  hasCtaText?: boolean;
  sectionStyle?: string;
  priority?: boolean;
}

export default function Section({
  title,
  children,
  id,
  titleStyle,
  noAlignment,
  ctaStyle,
  sectionStyle = '',
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
      className={`${sectionClasses} ${sectionStyle} relative py-20 md:py-24 lg:py-[120px]`}
    >
      {backgroundImagePaths && (
        <>
          <BackgroundImageUI
            alt={SectionDescriptions[title]}
            largeDesktopSrc={backgroundImagePaths.largeDesktop}
            desktopSrc={backgroundImagePaths.desktop}
            tabletSrc={backgroundImagePaths.tablet}
            mobileSrc={backgroundImagePaths.mobile}
            priority={priority}
          />
          <div className='absolute inset-0 h-full w-full bg-accentPrimary/10 bg-section-overlay-light dark:bg-accentPrimary/5 dark:bg-section-overlay-dark'></div>
        </>
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
