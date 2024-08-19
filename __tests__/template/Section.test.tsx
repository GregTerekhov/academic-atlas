/* eslint-disable @next/next/no-img-element */

import { render, screen } from '@testing-library/react';

import { CtaText, SectionDescriptions, SectionTitle } from 'types';
import { SectionTemplate } from 'template';
import { getExtraSectionOverlayStyles, getTitleClasses } from 'styles';

jest.mock('ui', () => ({
  BackgroundImageUI: jest.fn(({ alt, largeDesktopSrc, desktopSrc, tabletSrc, mobileSrc }) => (
    <div>
      <img
        src={largeDesktopSrc}
        alt={alt}
      />
      <img
        src={desktopSrc}
        alt={alt}
      />
      <img
        src={tabletSrc}
        alt={alt}
      />
      <img
        src={mobileSrc}
        alt={alt}
      />
    </div>
  )),
}));

jest.mock('components', () => ({
  CallToActionText: jest.fn(({ ctaStyle, ctaText }) => <div className={ctaStyle}>{ctaText}</div>),
}));

describe('Section template', () => {
  const renderSectionTemplate = (props = {}) => {
    const defaultProps = {
      id: SectionTitle.AboutUs,
      title: SectionTitle.AboutUs,
      sectionStyle: 'be-section',
      titleStyles: 'title-style',
      noAlignment: 'no-align',
      hasCtaText: false,
      ctaText: CtaText.NoText,
      ctaStyle: '',
      priority: false,
      children: <div>Children Content</div>,
      ...props,
    };

    render(<SectionTemplate {...defaultProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the section with the correct title and classes', () => {
    renderSectionTemplate();

    const section = screen.getByTestId(`section-${SectionTitle.AboutUs}`);
    expect(section).toHaveClass(
      'bg-transparent text-darkBase dark:text-whiteBase be-section relative py-20 md:py-24 lg:py-[120px]',
    );

    const titleElement = screen.getByText(SectionDescriptions[SectionTitle.AboutUs]);
    expect(titleElement.tagName).toBe('H2');
    expect(titleElement).toHaveClass(getTitleClasses(false, false, 'title-style', 'no-align'));
  });

  it('should render CallToActionText if hasCtaText is true', () => {
    renderSectionTemplate({
      hasCtaText: true,
      ctaText: CtaText.MainPromotions,
      ctaStyle: 'cta-style',
    });

    const ctaElement = screen.getByText(CtaText.MainPromotions);
    expect(ctaElement).toBeInTheDocument();
    expect(ctaElement).toHaveClass('cta-style');
  });

  it('should render background image and overlay if background image paths are available', () => {
    renderSectionTemplate({ title: SectionTitle.Hero, sectionStyle: '', priority: true });

    const pictures = screen.getAllByAltText(SectionDescriptions[SectionTitle.Hero]);
    expect(pictures).toHaveLength(4);

    const backgroundImagePaths = {
      largeDesktop: '/backgroundImage/hero-largeDesktop.webp',
      desktop: '/backgroundImage/hero-desktop.webp',
      tablet: '/backgroundImage/hero-tablet.webp',
      mobile: '/backgroundImage/hero-mobile.webp',
    };

    const getBackgroundImagePaths = jest.fn(() => backgroundImagePaths);
    jest.mock('helpers', () => ({ generateBackgroundImagePaths: getBackgroundImagePaths }));

    pictures.forEach((picture, index) => {
      expect(picture).toBeInTheDocument();

      const src = Object.values(backgroundImagePaths)[index];
      expect(picture).toHaveAttribute('src', src);
    });

    expect(screen.getByTestId('overlay')).toHaveClass(getExtraSectionOverlayStyles());
  });

  it('should render an h1 tag if isBigTitle is true', () => {
    renderSectionTemplate({
      title: SectionTitle.Hero,
      isBigTitle: true,
    });

    const titleElement = screen.getByText(SectionDescriptions[SectionTitle.Hero]);
    expect(titleElement.tagName).toBe('H1');
    expect(titleElement).toHaveClass(getTitleClasses(true, false, '', 'no-align'));
  });

  it('should render an h2 tag if isBigTitle is false', () => {
    renderSectionTemplate({
      title: SectionTitle.AboutUs,
      titleStyles: 'title-style',
      isBigTitle: false,
    });

    const titleElement = screen.getByText(SectionDescriptions[SectionTitle.AboutUs]);
    expect(titleElement.tagName).toBe('H2');
    expect(titleElement).toHaveClass(getTitleClasses(false, false, 'title-style', 'no-align'));
  });

  it('should render children content', () => {
    renderSectionTemplate();

    expect(screen.getByText('Children Content')).toBeInTheDocument();
  });

  it('should not render CallToActionText if hasCtaText is false', () => {
    renderSectionTemplate({
      hasCtaText: false,
    });

    expect(screen.queryByText(CtaText.MainPerformers)).not.toBeInTheDocument();
  });

  it('should not render overlay if background image paths are nit available', () => {
    renderSectionTemplate({
      title: SectionTitle.OurServices,
    });

    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
  });
});
