import { fireEvent, render, screen } from '@testing-library/react';

import {
  PrimaryButtonLabel,
  AriaDescription,
  SectionTitle,
  CtaText,
  SectionDescriptions,
  TelegramScenario,
} from 'types';
import { getSectionProps } from 'data';

import { Promotions } from 'components';

jest.mock('template', () => ({
  TelegramButton: jest.fn(({ command, label, ariaId, ariaDescription, isOnLightBackground }) => (
    <>
      <a
        aria-describedby={ariaId}
        href='#'
        target='_blank'
        rel='noopener noreferrer'
        onClick={(e) => {
          const base64String = btoa(command);
          e.currentTarget.href = `https://t.me/AcademicAtlasBot?start=${base64String}`;
        }}
        className={`py-[17px] ${isOnLightBackground ? 'light-background' : ''}`}
      >
        {label}
      </a>
      <div id={ariaId}>{ariaDescription}</div>
    </>
  )),
}));

jest.mock('data', () => ({
  getSectionProps: jest.fn(),
  imageSettings: {
    promotions: {
      src: '/images/notes.png',
      width: 216,
      height: 144,
      className:
        'size-auto max-md:mx-auto max-md:mb-8 md:absolute md:right-10 md:top-1/2 md:h-auto md:w-[224px] md:-translate-y-1/2 lg:h-auto lg:w-[416px]',
    },
  },
}));

jest.mock('helpers', () => ({
  getIdValues: jest.fn(() => ({
    Promotions: SectionTitle.Promotions,
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

describe('Promotions Component', () => {
  beforeEach(() => {
    (getSectionProps as jest.Mock).mockReturnValue({
      homePromotions: {
        title: SectionTitle.Promotions,
        ctaText: CtaText.MainPromotions,
        id: SectionTitle.Promotions,
        ctaStyle: 'md:w-[421px] lg:w-[644px]',
        noAlignment: 'text-start',
        hasCtaText: true,
      },
    });
  });

  it('renders SectionTemplate with correct props', () => {
    render(<Promotions />);

    expect(getSectionProps).toHaveBeenCalledWith(undefined, SectionTitle.Promotions);

    const sectionTitle = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.Promotions],
    });
    const ctaText = screen.getByText(CtaText.MainPromotions);

    expect(sectionTitle).toBeInTheDocument();
    expect(ctaText).toBeInTheDocument();
  });

  it('renders ImageUI with correct props', () => {
    render(<Promotions />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/images/notes.png');
    expect(image).toHaveAttribute('width', '216');
    expect(image).toHaveAttribute('height', '144');
  });

  it('renders TelegramButton with correct props', () => {
    render(<Promotions />);

    const telegramButton = screen.getByRole('link', { name: PrimaryButtonLabel.Ordering });
    expect(telegramButton).toBeInTheDocument();
    expect(telegramButton).toHaveAttribute('href', '#');
    expect(telegramButton).toHaveAttribute('target', '_blank');
    expect(telegramButton).toHaveAttribute('rel', 'noopener noreferrer');

    fireEvent.click(telegramButton);
    const base64String = btoa(TelegramScenario.Order);
    expect(telegramButton).toHaveAttribute(
      'href',
      `https://t.me/AcademicAtlasBot?start=${base64String}`,
    );

    const ariaDescription = screen.getByText(AriaDescription.DefaultOrdering);
    expect(ariaDescription).toBeInTheDocument();
  });
});
