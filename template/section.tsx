import { SectionDescriptions, CtaText, type IWithChildren, type ISectionProps } from 'types';
import { generateBackgroundImagePaths } from 'helpers';

import { Container } from 'layout';
import { CallToActionText } from 'components';
import { BackgroundImageUI } from 'ui';

import { getExtraSectionOverlayStyles, getSectionClasses, getTitleClasses } from 'styles';

interface ISectionTemplate extends ISectionProps, IWithChildren {}

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
  const backgroundOverlayClass = getExtraSectionOverlayStyles();

  return (
    <section
      id={id}
      data-testid={`section-${title}`}
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
          <div
            className={backgroundOverlayClass}
            data-testid='overlay'
          ></div>
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
