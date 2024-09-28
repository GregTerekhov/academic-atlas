import { render, screen } from '@testing-library/react';

import { PrimaryButtonLabel, CtaText, SectionDescriptions, SectionTitle, AriaId } from 'types';
import { HeroPartnership } from 'components';

jest.mock('styles', () => ({
  getHeroSectionStyles: jest.fn(),
  getHeroOverlayStyles: jest.fn(),
}));

jest.mock('template', () => ({
  TelegramButton: jest.fn(({ label, ariaId, ariaDescription }) => (
    <>
      <a
        aria-describedby={ariaId}
        href='#'
        target='_blank'
        rel='noopener noreferrer'
        className={`py-[17px]`}
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

jest.mock('components/performers/subcomponents', () => ({
  HeroMatrix: jest.fn(),
}));

describe('Hero performers component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<HeroPartnership />);
  });

  test('Should render component correctly', () => {
    const heroHeader = screen.getByRole('heading', {
      level: 1,
      name: SectionDescriptions[SectionTitle.PartnershipHero],
    });
    expect(heroHeader).toBeInTheDocument();

    const heroDesc = screen.getByText(CtaText.PartnershipHero);
    expect(heroDesc).toBeInTheDocument();
  });

  test('Should render a telegram button with correct props', () => {
    const heroDesc = screen.getByRole('link');
    expect(heroDesc.textContent).toMatch(PrimaryButtonLabel.Accession);

    const telegramButton = screen.getByRole('link', { name: PrimaryButtonLabel.Accession });

    expect(telegramButton).toBeInTheDocument();
    expect(telegramButton).toHaveAttribute('href', '#');
    expect(telegramButton).toHaveAttribute('target', '_blank');
    expect(telegramButton).toHaveAttribute('rel', 'noopener noreferrer');
    expect(telegramButton).toHaveAttribute('aria-describedby', AriaId.Accession);
  });
});
