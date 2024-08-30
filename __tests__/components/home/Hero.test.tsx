import { render, screen } from '@testing-library/react';

import { CtaText, PrimaryButtonLabel, SectionDescriptions, SectionTitle } from 'types';
import { Hero } from 'components';

jest.mock('helpers', () => ({
  getAndEncodeDataObject: jest.fn(),
}));

jest.mock('template', () => ({
  SectionTemplate: jest.fn(({ title, children, ctaText }) => {
    return (
      <section id={title}>
        <h1>{SectionDescriptions[SectionTitle.Hero]}</h1>
        <p>{ctaText}</p>
        {children}
      </section>
    );
  }),
  TelegramButton: jest.fn(({ label, ariaId, ariaDescription, isOnLightBackground }) => (
    <>
      <a
        aria-describedby={ariaId}
        href='#'
        target='_blank'
        rel='noopener noreferrer'
        className={`py-[17px] ${isOnLightBackground ? 'light-background' : ''}`}
      >
        {label}
      </a>
      <span
        id={ariaId}
        className='sr-only'
      >
        {ariaDescription}
      </span>
    </>
  )),
}));

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    homeHero: {
      title: SectionTitle.Hero,
      titleStyle: 'md:w-[440px] lg:w-[550px]',
      ctaStyle: 'md:w-[422px] lg:w-[586px]',
      ctaText: CtaText.MainHero,
      isBigTitle: true,
      hasCtaText: true,
      priority: true,
    },
  })),
}));

describe('Hero Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<Hero />);
  });

  it('should render SectionTemplate components correctly', () => {
    const heading = screen.getByRole('heading', {
      level: 1,
      name: SectionDescriptions[SectionTitle.Hero],
    });
    expect(heading).toBeInTheDocument();

    const ctaText = screen.getByText(CtaText.MainHero);
    expect(ctaText).not.toBeNull();
    expect(ctaText).toBeInTheDocument();
  });

  it('should render TelegramButton with correct attributes', () => {
    const telegramButton = screen.getByRole('link');
    expect(telegramButton).toHaveTextContent(PrimaryButtonLabel.Ordering);
    expect(telegramButton).toBeInTheDocument();

    expect(telegramButton).toHaveAttribute('href', '#');
    expect(telegramButton).toHaveAttribute('target', '_blank');
    expect(telegramButton).toHaveAttribute('rel', 'noopener noreferrer');
    expect(telegramButton).toHaveAttribute('aria-describedby', 'default-ordering');
  });
});
