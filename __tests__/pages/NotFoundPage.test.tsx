import { render, screen } from '@testing-library/react';
import NotFound from 'app/not-found';
import { SectionDescriptions, SectionTitle } from 'types';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}));

jest.mock('components', () => ({
  NotFoundNavigation: jest.fn(() => <div data-testid='not-found-navigation'></div>),
}));

jest.mock('styles', () => ({
  get404PageTitleStyles: jest.fn(),
}));

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    page404: {
      title: SectionTitle.NotFound,
      sectionStyle:
        'flex flex-col items-center justify-center min-h-mobileScreen md:min-h-tabletScreen lg:min-h-desktopScreen',
      isBigTitle: true,
    },
  })),
  MetadataTexts: {
    notFound: {
      title: 'props.title',
      description: 'props.description',
      keywords: 'props.keywords',
    },
  },
}));

jest.mock('template', () => ({
  SectionTemplate: jest.fn(({ title, children }) => (
    <section id={title}>
      <h1> {SectionDescriptions[SectionTitle.NotFound]}</h1>
      {children}
    </section>
  )),
}));

describe('NotFoundPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<NotFound />);
  });

  test('should render correctly with all subComponents', () => {
    expect(
      screen.getByRole('heading', { name: SectionDescriptions[SectionTitle.NotFound] }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('not-found-navigation')).toBeInTheDocument();
  });

  test('There is a correct page description', () => {
    const notfoundSectionHeader = screen.getByRole('heading', {
      level: 1,
      name: SectionDescriptions[SectionTitle.NotFound],
    });
    expect(notfoundSectionHeader).toBeInTheDocument();

    const notFoundGeneralHeading = screen.getByRole('heading', {
      level: 2,
    });
    expect(notFoundGeneralHeading).toBeInTheDocument();
    expect(notFoundGeneralHeading).toHaveTextContent('Ой!');
    expect(notFoundGeneralHeading).toHaveTextContent('Схоже, ми не можемо знайти сторінку');
  });
});
