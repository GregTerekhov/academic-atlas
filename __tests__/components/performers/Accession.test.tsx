import { render, screen } from '@testing-library/react';

import {
  type IAccession,
  SectionTitle,
  PrimaryButtonLabel,
  SectionDescriptions,
  AriaId,
  AriaDescription,
} from 'types';
import { getAccession } from 'data';
import { Accession } from 'components';

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
  AccessionItem: jest.fn(({ id }) => <li data-testid={`accession-item-${id}`}></li>),
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
  ImageUI: jest.fn(({ src, alt, width, height, className }, props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-testid='img-accession'
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={className}
      {...props}
    />
  )),
}));

const mockGetAccession = getAccession as jest.Mock;

const setup = (data: IAccession[] = mocksData) => {
  mockGetAccession.mockReturnValue(data);

  return render(<Accession />);
};

const mocksData = [
  {
    id: '1',
    desc: 'Відправте інформацію про ваш досвід та спеціалізацію нашому менеджеру через наш Telegram-бот',
  },
  {
    id: '2',
    desc: 'Наш менеджер зв’яжеться з вами для узгодження подальших інструкцій та деталей',
  },
];

describe('Accession component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render all components correctly', () => {
    setup();

    const title = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.PartnershipAccession],
    });
    expect(title).toBeInTheDocument();

    const listElement = screen.getByTestId('accession-list');
    expect(listElement).toBeInTheDocument();

    const accessionItems = screen.getAllByTestId(/accession-item-/);
    expect(accessionItems).toHaveLength(2);
    expect(accessionItems[0]).toBeInTheDocument();
    expect(accessionItems[1]).toBeInTheDocument();

    const image = screen.getByTestId('img-accession');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/accession.webp');
    expect(image).toHaveAttribute('alt', 'People grabs each other wrist to holding up one another');
  });

  test('should render button with correct props', () => {
    setup();

    const telegramButton = screen.getByRole('link', { name: PrimaryButtonLabel.Accession });

    expect(telegramButton).toBeInTheDocument();
    expect(telegramButton).toHaveAttribute('href', '#');
    expect(telegramButton).toHaveAttribute('target', '_blank');
    expect(telegramButton).toHaveAttribute('rel', 'noopener noreferrer');
    expect(telegramButton).toHaveAttribute('aria-describedby', AriaId.AccessionProcedure);
    expect(screen.getByText(AriaDescription.AccessionProcedure)).toBeInTheDocument();
  });

  test('should render AccessionItem components with correct ids', () => {
    setup();

    const accessionItems = screen.getAllByTestId(/accession-item-/);
    expect(accessionItems).toHaveLength(2);
    expect(accessionItems[0]).toHaveAttribute('data-testid', 'accession-item-1');
    expect(accessionItems[1]).toHaveAttribute('data-testid', 'accession-item-2');
  });

  test('should render empty state if no data available', () => {
    setup([]);

    const listElement = screen.getByTestId('accession-list');
    expect(listElement).toBeEmptyDOMElement();
  });
});
