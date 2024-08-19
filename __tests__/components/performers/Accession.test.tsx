import { render, screen } from '@testing-library/react';
import { Accession } from 'components';

import { getAccession } from 'data';
import {
  SectionTitle,
  PrimaryButtonLabel,
  type IAccession,
  SectionDescriptions,
  AriaId,
} from 'types';
import { ImageUI } from 'ui';

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    performersAccession: {
      title: SectionTitle.PartnershipAccession,
    },
  })),
  getAccession: jest.fn(),
  imageSettings: {
    partnershipAccession: {
      src: '/images/accession.webp',
      alt: 'People grabs each other wrist to holding up one another',
      width: 327,
      height: 200,
      className:
        'rounded-xl object-cover object-center md:h-[220px] md:w-[292px] lg:h-[287px] lg:w-[516px]',
    },
  },
}));

jest.mock('components/performers/subcomponents', () => ({
  AccessionItem: jest.fn(() => <li data-testid='accession-item'></li>),
}));

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children, items }) => (
    <ul data-testid='accession-list'>{items.map((item: IAccession) => children(item))}</ul>
  )),
  SectionTemplate: jest.fn(({ title, children }) => (
    <section id={title}>
      <h2> {SectionDescriptions[SectionTitle.PartnershipAccession]}</h2>
      {children}
    </section>
  )),
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

jest.mock('ui', () => ({
  ImageUI: jest.fn((props) => (
    <img
      data-testid='img-accession'
      src={props.src}
      alt={props.alt}
    />
  )),
}));

describe('Accession component', () => {
  const mockGetAccession = getAccession as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetAccession.mockReturnValue([
      {
        id: '1',
        desc: 'Відправте інформацію про ваш досвід та спеціалізацію нашому менеджеру через наш Telegram-бот',
      },
    ]);

    render(<Accession />);
  });

  test('should render all components correctly', () => {
    const title = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.PartnershipAccession],
    });
    expect(title).toBeInTheDocument();

    const listElement = screen.getByTestId('accession-list');
    expect(listElement).toBeInTheDocument();

    const accessionItems = screen.getByTestId('accession-item');
    expect(accessionItems).toBeInTheDocument;

    expect(screen.getByTestId('img-accession')).toBeInTheDocument();
    expect(ImageUI).toHaveBeenCalledWith(
      expect.objectContaining({
        src: '/images/accession.webp',
        alt: 'People grabs each other wrist to holding up one another',
        width: 327,
        height: 200,
        className:
          'rounded-xl object-cover object-center md:h-[220px] md:w-[292px] lg:h-[287px] lg:w-[516px]',
      }),
      {},
    );
  });

  test('should render button with correct props', () => {
    const telegramButton = screen.getByRole('link', { name: PrimaryButtonLabel.Accession });

    expect(telegramButton).toBeInTheDocument();
    expect(telegramButton).toHaveAttribute('href', '#');
    expect(telegramButton).toHaveAttribute('target', '_blank');
    expect(telegramButton).toHaveAttribute('rel', 'noopener noreferrer');
    expect(telegramButton).toHaveAttribute('aria-describedby', AriaId.AccessionProcedure);
  });
});
