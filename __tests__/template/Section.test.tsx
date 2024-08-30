/* eslint-disable jest/no-conditional-expect */
/* eslint-disable @next/next/no-img-element */

import { render, screen } from '@testing-library/react';

import { CtaText, SectionDescriptions, SectionTitle } from 'types';
import { generateBackgroundImagePaths } from 'helpers';
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

jest.mock('helpers', () => ({
  generateBackgroundImagePaths: jest.fn((section) => {
    if (section === SectionTitle.Hero) {
      return {
        largeDesktop: '/backgroundImage/hero-largeDesktop.webp',
        desktop: '/backgroundImage/hero-desktop.webp',
        tablet: '/backgroundImage/hero-tablet.webp',
        mobile: '/backgroundImage/hero-mobile.webp',
      };
    }
    return null;
  }),
}));

describe('Section template', () => {
  const mockGenerateBackgroundImagePaths = generateBackgroundImagePaths as jest.Mock;

  const renderSectionTemplate = (props = {}) => {
    const defaultProps = {
      title: SectionTitle.AboutUs,
      children: <div>Children Content</div>,
      id: SectionTitle.AboutUs,
      titleStyles: 'title-style',
      noAlignment: 'no-align',
      ctaStyle: '',
      sectionStyle: 'be-section',
      isBigTitle: false,
      ctaText: CtaText.NoText,
      hasCtaText: false,
      priority: false,
      ...props,
    };

    render(<SectionTemplate {...defaultProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering and Basic Functionality', () => {
    it('renders the section with the correct title and classes', () => {
      renderSectionTemplate();

      const section = screen.getByTestId(`section-${SectionTitle.AboutUs}`);
      expect(section).toHaveClass(
        'bg-transparent text-darkBase dark:text-whiteBase be-section relative py-20 md:py-24 lg:py-[120px]',
      );

      const titleElement = screen.getByText(SectionDescriptions[SectionTitle.AboutUs]);
      expect(titleElement.tagName).toBe('H2');
      expect(titleElement).toHaveClass(getTitleClasses(false, false, 'title-style', 'no-align'));
    });

    it.each([
      [undefined, false],
      ['Children Content', true],
    ])('renders children content correctly when content is %s', (children, shouldRender) => {
      renderSectionTemplate({ children });

      if (shouldRender) {
        expect(screen.getByText('Children Content')).toBeInTheDocument();
      } else {
        expect(screen.queryByText('Children Content')).not.toBeInTheDocument();
      }
    });

    it('handles missing optional props gracefully', () => {
      renderSectionTemplate({
        ctaText: undefined,
        ctaStyle: undefined,
        titleStyle: undefined,
      });

      const section = screen.getByTestId(`section-${SectionTitle.AboutUs}`);
      expect(section).toBeInTheDocument();
    });
  });

  describe('CallToActionText Rendering', () => {
    it.each([
      [true, CtaText.MainPromotions, 'cta-style'],
      [false, CtaText.MainPromotions, ''],
    ])(
      'renders CallToActionText based on hasCtaText=%s',
      (hasCtaText, expectedText, expectedStyle) => {
        renderSectionTemplate({
          title: SectionTitle.Promotions,
          hasCtaText,
          ctaText: expectedText,
          ctaStyle: expectedStyle,
        });

        if (hasCtaText) {
          const ctaElement = screen.getByText(expectedText);
          expect(ctaElement).toBeInTheDocument();
          expect(ctaElement).toHaveClass(expectedStyle);
        } else {
          expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
        }
      },
    );
  });

  describe('Background Image and Overlay', () => {
    it.each([
      [SectionTitle.Hero, true, true, true],
      [SectionTitle.OurServices, false, false, false],
    ])(
      'renders background image and overlay for title=%s = %s',
      (title, shouldRenderImages, shouldRenderOverlay, priority) => {
        renderSectionTemplate({ title, sectionStyle: '', priority });

        if (shouldRenderImages && shouldRenderOverlay) {
          const pictures = screen.getAllByAltText(SectionDescriptions[SectionTitle.Hero]);
          expect(pictures).toHaveLength(4);

          const backgroundImagePaths = {
            largeDesktop: '/backgroundImage/hero-largeDesktop.webp',
            desktop: '/backgroundImage/hero-desktop.webp',
            tablet: '/backgroundImage/hero-tablet.webp',
            mobile: '/backgroundImage/hero-mobile.webp',
          };

          pictures.forEach((picture, index) => {
            expect(picture).toBeInTheDocument();
            const src = Object.values(backgroundImagePaths)[index];
            expect(picture).toHaveAttribute('src', src);
          });

          expect(screen.getByTestId('overlay')).toHaveClass(getExtraSectionOverlayStyles());
        } else {
          expect(
            screen.queryByAltText(SectionDescriptions[SectionTitle.OurServices]),
          ).not.toBeInTheDocument();
          expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
        }
      },
    );

    it('does not render background images if generateBackgroundImagePaths returns null', () => {
      const generateBackgroundImagePaths = jest.fn(() => null);
      jest.mock('helpers', () => ({ generateBackgroundImagePaths }));

      renderSectionTemplate({ title: SectionTitle.AboutUs });

      expect(
        screen.queryByAltText(SectionDescriptions[SectionTitle.AboutUs]),
      ).not.toBeInTheDocument();
    });
  });

  describe('Title Tag and Styling', () => {
    it.each([
      ['H1', true, '', SectionTitle.Hero, getTitleClasses(true, false, '', 'no-align')],
      [
        'H2',
        false,
        'title-style',
        SectionTitle.AboutUs,
        getTitleClasses(false, false, 'title-style', 'no-align'),
      ],
    ])(
      'renders %s tag and styles correctly when isBigTitle=%s and titleStyle=%s',
      (expectedTag, isBigTitle, titleStyle, title, expectedClasses) => {
        renderSectionTemplate({ title, isBigTitle, titleStyle });

        const titleElement = screen.getByText(SectionDescriptions[title]);
        expect(titleElement.tagName).toBe(expectedTag);
        expect(titleElement).toHaveClass(expectedClasses);
      },
    );

    it('applies sectionStyle correctly when is provided', () => {
      const sectionStyle = 'custom-style';
      renderSectionTemplate({ sectionStyle });

      const section = screen.getByTestId(`section-${SectionTitle.AboutUs}`);
      expect(section).toHaveClass(sectionStyle);
    });

    it('applies titleStyle correctly when is provided', () => {
      const titleStyle = 'custom-title-style';
      renderSectionTemplate({ title: SectionTitle.AboutUs, titleStyle });

      const titleElement = screen.getByText(SectionDescriptions[SectionTitle.AboutUs]);
      expect(titleElement).toHaveClass(getTitleClasses(false, false, titleStyle, 'no-align'));
    });

    it('applies correct title classes based on isBigTitle and hasCtaText', () => {
      renderSectionTemplate({
        title: SectionTitle.AboutUs,
        isBigTitle: true,
        hasCtaText: true,
        titleStyle: 'big-title-style',
      });

      const titleElement = screen.getByText(SectionDescriptions[SectionTitle.AboutUs]);
      expect(titleElement.tagName).toBe('H1');
      expect(titleElement).toHaveClass(getTitleClasses(true, true, 'big-title-style', 'no-align'));
    });
  });

  describe('Rendering for Each Title Value', () => {
    it('renders correctly for each possible title value', () => {
      const titles = Object.values(SectionTitle);
      titles.forEach((title) => {
        renderSectionTemplate({ title });

        const section = screen.getByTestId(`section-${title}`);
        expect(section).toBeInTheDocument();
        expect(screen.getByText(SectionDescriptions[title])).toBeInTheDocument();
      });
    });
  });

  describe('Background Image Paths Function Call', () => {
    it('should call generateBackgroundImagePaths with the correct title', () => {
      renderSectionTemplate({ title: SectionTitle.Hero });

      expect(mockGenerateBackgroundImagePaths).toHaveBeenCalledWith(SectionTitle.Hero);
    });
  });
});
