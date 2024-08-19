import { render, screen } from '@testing-library/react';

import {
  AriaDescription,
  AriaId,
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

jest.mock('ui', () => ({
  AriaDescriptionUI: jest.fn(({ id, description }) => <span id={id}>{description}</span>),
}));

jest.mock('template', () => ({
  SectionTemplate: jest.fn(({ children, title, ctaText }) => (
    <div id={title}>
      <h2>{SectionDescriptions[SectionTitle.Performers]}</h2>
      <p>{ctaText}</p>
      {children}
    </div>
  )),
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with correct content', () => {
    render(<Performers />);

    const sectionTitle = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.Performers],
    });
    expect(sectionTitle).toBeInTheDocument();

    const ctaText = screen.getByText(CtaText.MainPerformers);
    expect(ctaText).toBeInTheDocument();

    const link = screen.getByRole('link', { name: PrimaryButtonLabel.Accession });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', Paths.Partnership);
    expect(link).toHaveAttribute('aria-describedby', AriaId.Performers);
    expect(link).toHaveClass('primary-button-styles py-[17px]');

    const ariaDescription = screen.getByText(AriaDescription.Performers);
    expect(ariaDescription).toBeInTheDocument();
  });
});
