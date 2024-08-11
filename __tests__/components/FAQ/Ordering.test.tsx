import { fireEvent, render, screen } from '@testing-library/react';
import {
  CtaText,
  SectionDescriptions,
  SectionTitle,
  PrimaryButtonLabel,
  TelegramScenario,
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
      <h2>{SectionDescriptions[title as keyof typeof SectionDescriptions]}</h2>
      {ctaText && <div>{ctaText}</div>}
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

    fireEvent.click(telegramButton);
    const base64String = btoa(TelegramScenario.Order);
    expect(telegramButton).toHaveAttribute(
      'href',
      `https://t.me/AcademicAtlasBot?start=${base64String}`,
    );

    const descriptionElement = screen.getByText((_, element) => {
      const normalizedText = element?.textContent?.replace(/\s+/g, ' ').trim();
      return normalizedText === AriaDescription.DefaultOrdering.replace(/\s+/g, ' ').trim();
    });

    expect(descriptionElement).toBeInTheDocument();
  });
});
