import { fireEvent, render, screen } from '@testing-library/react';
import { HeroPartnership } from 'components';
import { TelegramScenario } from 'types/calculation';
import { CtaText, SectionDescriptions, SectionTitle } from 'types/layoutTypes';
import { PrimaryButtonLabel } from 'types/ui';

jest.mock('template', () => ({
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

describe('Hero performers', () => {
  beforeEach(() => {
    render(<HeroPartnership />);
  });

  test('There is a correct header', () => {
    const heroHeader = screen.getByRole('heading', {
      level: 1,
      name: SectionDescriptions[SectionTitle.PartnershipHero],
    });
    expect(heroHeader).toBeInTheDocument();
  });

  test('There is a correct description', () => {
    const heroDesc = screen.getByRole('paragraph');
    expect(heroDesc).toBeInTheDocument();
    expect(heroDesc.textContent).toMatch(CtaText.PartnershipHero);
  });

  test('There is a telegram button', () => {
    const heroDesc = screen.getByRole('link');
    expect(heroDesc.textContent).toMatch(PrimaryButtonLabel.Accession);

    const telegramButton = screen.getByRole('link', { name: PrimaryButtonLabel.Accession });

    expect(telegramButton).toBeInTheDocument();
    expect(telegramButton).toHaveAttribute('href', '#');
    expect(telegramButton).toHaveAttribute('target', '_blank');
    expect(telegramButton).toHaveAttribute('rel', 'noopener noreferrer');
    expect(telegramButton).toHaveAttribute('aria-describedby', 'accession');

    fireEvent.click(telegramButton);
    const base64String = btoa(TelegramScenario.Join);
    expect(telegramButton).toHaveAttribute(
      'href',
      `https://t.me/AcademicAtlasBot?start=${base64String}`,
    );
  });
});
