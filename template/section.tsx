'use client';

import { SectionTitle, SectionDescriptions, CtaText } from 'types';

import { generateBackgroundImagePaths, getTitleClasses } from 'helpers';

import { Container } from 'layout';
import { CallToActionText } from 'components';
import { BackgroundImageUI } from 'ui';
import { useTheme } from 'context/ThemeProvider';

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
  const { theme } = useTheme();
  const sectionClasses = getTitleClasses(isBigTitle, hasCtaText, titleStyle, noAlignment);
  const titleClass = getTitleClasses(isBigTitle, hasCtaText, titleStyle, noAlignment);
  const backgroundImagePaths = generateBackgroundImagePaths(title);

  return (
    <section
      id={id}
      className={`${minHeight} relative overflow-hidden py-20 lg:py-32`}
    >
      {backgroundImagePaths && (
        <BackgroundImageUI
          alt={SectionDescriptions[title]}
          desktopSrc={backgroundImagePaths[`desktop-${theme}`]}
          tabletSrc={backgroundImagePaths[`tablet-${theme}`]}
          mobileSrc={backgroundImagePaths[`mobile-${theme}`]}
          desktopDarkSrc={backgroundImagePaths[`desktop-${theme}`]}
          tabletDarkSrc={backgroundImagePaths[`tablet-${theme}`]}
          mobileDarkSrc={backgroundImagePaths[`mobile-${theme}`]}
          priority={true}
        />
      )}
      <Container>
        {isBigTitle ? (
          <h1 className={`${sectionClasses} ${titleClass}`}>{SectionDescriptions[title]}</h1>
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
