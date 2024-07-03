'use client';

import { SectionTitle, SectionDescriptions, CtaText, ThemeVariants } from 'types';

import { generateBackgroundImagePaths, getSectionClasses, getTitleClasses } from 'helpers';

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
  minHeight = '',
  isBigTitle = false,
  ctaText = CtaText.NoText,
  hasCtaText = false,
}: Readonly<ISectionTemplate>) {
  const { theme } = useTheme();
  const validTheme = theme === ThemeVariants.DARK ? ThemeVariants.DARK : ThemeVariants.LIGHT;
  const sectionClasses = getSectionClasses(title, validTheme);
  const titleClass = getTitleClasses(isBigTitle, hasCtaText, titleStyle, noAlignment);
  const backgroundImagePaths = generateBackgroundImagePaths(title);

  return (
    <section
      id={id}
      className={`${sectionClasses} ${minHeight}`}
    >
      {backgroundImagePaths && (
        <BackgroundImageUI
          alt={SectionDescriptions[title]}
          largeDesktopSrc={backgroundImagePaths.largeDesktop}
          desktopSrc={backgroundImagePaths.desktop}
          tabletSrc={backgroundImagePaths.tablet}
          mobileSrc={backgroundImagePaths.mobile}
          priority={true}
        />
      )}
      {/* <div className='absolute inset-0 bg-gradient-to-l from-transparent via-black to-black opacity-50'></div> */}
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
