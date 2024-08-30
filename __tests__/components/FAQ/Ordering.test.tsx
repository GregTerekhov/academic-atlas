import { render, screen } from '@testing-library/react';

import {
  CtaText,
  SectionDescriptions,
  SectionTitle,
  PrimaryButtonLabel,
  AriaDescription,
} from 'types';
import { getSectionProps } from 'data';
import Ordering from 'components/FAQ/ordering';

jest.mock('data', () => ({
  getSectionProps: jest.fn(),
}));

jest.mock('template', () => ({
  SectionTemplate: jest.fn(({ title, ctaText, children }) => (
    <section>
      <picture className='absolute inset-0 mx-auto h-full w-full max-w-[4000px]'>
        <source
          media='(min-width: 2000px)'
          srcSet='/backgroundImage/faq-order-largeDesktop.jpg'
        />
        <source
          media='(min-width: 1440px)'
          srcSet='/backgroundImage/faq-order-desktop.jpg'
        />
        <source
          media='(min-width: 768px)'
          srcSet='/backgroundImage/faq-order-tablet.jpg'
        />
        <source
          media='(max-width: 767px)'
          srcSet='/backgroundImage/faq-order-mobile.jpg'
        />
        <img
          src='/backgroundImage/faq-order-mobile.jpg'
          alt={SectionDescriptions[SectionTitle.FAQOrder]}
          className='h-full w-full object-cover'
        />
      </picture>
      <h2>{SectionDescriptions[title as keyof typeof SectionDescriptions]}</h2>
      {ctaText && <p>{ctaText}</p>}
      {children}
    </section>
  )),
  TelegramButton: jest.fn(({ command, label, ariaId, ariaDescription }) => (
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
        className='py-[17px]'
      >
        {label}
      </a>
      <div id={ariaId}>{ariaDescription}</div>
    </>
  )),
}));

describe('Ordering Component', () => {
  const mockSectionProps = {
    faqOrdering: {
      title: SectionTitle.FAQOrder,
      ctaStyle: 'text-center max-md:px-3 md:max-lg:px-[15px]',
      ctaText: CtaText.FAQOrder,
      hasCtaText: true,
    },
  };

  beforeEach(() => {
    (getSectionProps as jest.Mock).mockReturnValue(mockSectionProps);
  });

  it('renders SectionTemplate with correct props', () => {
    render(<Ordering />);

    const sectionTitle = screen.getByText(SectionDescriptions[SectionTitle.FAQOrder]);
    const ctaText = screen.getByText(CtaText.FAQOrder);

    expect(sectionTitle).toBeInTheDocument();
    expect(ctaText).toBeInTheDocument();
  });

  it('renders TelegramButton with correct props', () => {
    render(<Ordering />);

    const telegramButton = screen.getByRole('link', { name: PrimaryButtonLabel.Ordering });
    expect(telegramButton).toBeInTheDocument();
    expect(telegramButton).toHaveAttribute('href', '#');
    expect(telegramButton).toHaveAttribute('target', '_blank');
    expect(telegramButton).toHaveAttribute('rel', 'noopener noreferrer');

    const descriptionElement = screen.getByText((_, element) => {
      const normalizedText = element?.textContent?.replace(/\s+/g, ' ').trim();
      return normalizedText === AriaDescription.DefaultOrdering.replace(/\s+/g, ' ').trim();
    });

    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the background image with correct props', () => {
    render(<Ordering />);

    const backgroundImage = screen.getByRole('img');

    expect(backgroundImage).toBeInTheDocument();

    expect(backgroundImage).toHaveClass('h-full w-full object-cover');
    expect(backgroundImage).toHaveAttribute('src', '/backgroundImage/faq-order-mobile.jpg');

    const sources = backgroundImage.closest('picture')?.querySelectorAll('source');
    expect(sources).toHaveLength(4);

    expect(sources?.[0]).toHaveAttribute('media', '(min-width: 2000px)');
    expect(sources?.[1]).toHaveAttribute('media', '(min-width: 1440px)');
    expect(sources?.[2]).toHaveAttribute('media', '(min-width: 768px)');
    expect(sources?.[3]).toHaveAttribute('media', '(max-width: 767px)');
  });
});
