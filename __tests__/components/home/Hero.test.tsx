import { fireEvent, render, screen } from '@testing-library/react';

import {
  CtaText,
  PrimaryButtonLabel,
  SectionDescriptions,
  SectionTitle,
  TelegramScenario,
} from 'types';

import { Hero } from 'components';

jest.mock('template', () => ({
  SectionTemplate: jest.fn(({ title, children }) => {
    return (
      <section>
        <h1>{title === SectionTitle.Hero ? SectionDescriptions[SectionTitle.Hero] : title}</h1>
        {children}
      </section>
    );
  }),
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
  it('should render Hero component correctly', () => {
    render(<Hero />);
    screen.debug();

    const heading = screen.getByText(SectionDescriptions[SectionTitle.Hero]);
    expect(heading).toBeInTheDocument();

    const telegramButton = screen.getByRole('link', { name: PrimaryButtonLabel.Ordering });
    expect(telegramButton).toBeInTheDocument();
    expect(telegramButton).toHaveAttribute('href', '#');
    expect(telegramButton).toHaveAttribute('target', '_blank');
    expect(telegramButton).toHaveAttribute('rel', 'noopener noreferrer');
    expect(telegramButton).toHaveAttribute('aria-describedby', 'default-ordering');

    fireEvent.click(telegramButton);
    const base64String = btoa(TelegramScenario.Order);
    expect(telegramButton).toHaveAttribute(
      'href',
      `https://t.me/AcademicAtlasBot?start=${base64String}`,
    );
  });
});
