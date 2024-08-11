import { render, screen } from '@testing-library/react';

import {
  AriaDescription,
  CtaText,
  Paths,
  PrimaryButtonLabel,
  SectionDescriptions,
  SectionTitle,
} from 'types';

import { Performers } from 'components';

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    homePerformers: {
      title: SectionTitle.Performers,
      ctaStyle: 'md:text-center',
      noAlignment: 'max-md:text-start',
      ctaText: CtaText.MainPerformers,
      hasCtaText: true,
    },
  })),
}));

jest.mock('styles', () => ({
  getSectionClasses: jest.fn(() => 'mocked-section-classes'),
  getTitleClasses: jest.fn(() => 'mocked-title-classes'),
  getExtraSectionOverlayStyles: jest.fn(() => 'mocked-overlay-styles'),
  generateBackgroundImagePaths: jest.fn(() => 'mocked-background-image-paths'),
  getPrimaryButtonStyles: jest.fn(() => 'primary-button-styles'),
  getCtaTextStyles: jest.fn(() => 'mocked-cta-text-styles'),
}));

describe('Performers Component', () => {
  it('should render the component with correct content', () => {
    render(<Performers />);

    const sectionTitle = screen.getByRole('heading', {
      name: SectionDescriptions[SectionTitle.Performers],
    });
    expect(sectionTitle).toBeInTheDocument();

    const link = screen.getByRole('link', { name: PrimaryButtonLabel.Accession });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', Paths.Partnership);
    expect(link).toHaveClass('primary-button-styles py-[17px]');

    const ariaDescription = screen.getByText(AriaDescription.Performers);
    expect(ariaDescription).toBeInTheDocument();
  });
});
