import { fireEvent, render, screen } from '@testing-library/react';
import { Accession } from 'components/index';
import { getAccession } from 'data/componentsData';
import { AriaDescription } from 'types/aria';
import { TelegramScenario } from 'types/calculation';
import { SectionTitle } from 'types/layoutTypes';
import { PrimaryButtonLabel } from 'types/ui';

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    performersAccession: {
      title: SectionTitle.PartnershipAccession,
    },
  })),
}));

jest.mock('../../../components/performers/subcomponents/accession-item', () => {
  type MockAccessionItemProps = {
    desc: string;
  };
  const MockAccessionItem = ({ desc }: MockAccessionItemProps) => (
    <li data-testid='accession-item'>{desc}</li>
  );
  MockAccessionItem.displayName = 'accession-item';
  return MockAccessionItem;
});

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children }) => (
    <ul>{getAccession().map((item) => children(item))}</ul> //FIXME: getAccession() is not a function
  )),
  SectionTemplate: jest.fn(({ title, children }) => {
    return (
      <section>
        <h1> {title}</h1>
        {children}
      </section>
    );
  }),
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

describe('Accession component', () => {
  beforeEach(() => {
    render(<Accession />);
  });

  test('should render a list of accessions', () => {
    const accessionItems = screen.getAllByTestId('accession-item');
    expect(accessionItems).toHaveLength(getAccession().length);
  });

  test('telegram button render with correct props', () => {
    const telegramButton = screen.getByRole('link', { name: PrimaryButtonLabel.Accession });

    expect(telegramButton).toBeInTheDocument();
    expect(telegramButton).toHaveAttribute('href', '#');
    expect(telegramButton).toHaveAttribute('target', '_blank');
    expect(telegramButton).toHaveAttribute('rel', 'noopener noreferrer');
    expect(telegramButton).toHaveAttribute('aria-describedby', AriaDescription.AccessionProcedure);

    fireEvent.click(telegramButton);
    const base64String = btoa(TelegramScenario.Join);
    expect(telegramButton).toHaveAttribute(
      'href',
      `https://t.me/AcademicAtlasBot?start=${base64String}`,
    );
  });
});
