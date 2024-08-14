import { render, screen } from '@testing-library/react';
import NotFound from 'app/not-found';
import { get404PageTitleStyles } from 'styles/pages';
import {
  MetadataDescription,
  MetadataKeywords,
  MetadataTitle,
  SectionDescriptions,
  SectionTitle,
} from 'types/layoutTypes';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => {
    const mockBack = jest.fn();
    return mockBack;
  }),
}));

jest.mock('components', () => ({
  NotFoundNavigation: jest.fn(() => <div data-testid='notFoundNavigation'></div>),
}));

jest.mock('styles/pages', () => ({
  get404PageTitleStyles: jest.fn(),
}));

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    page404: {
      title: SectionTitle.NotFound,
      titleStyle: get404PageTitleStyles as jest.Mock,
      sectionStyle:
        'flex flex-col items-center justify-center min-h-mobileScreen md:min-h-tabletScreen lg:min-h-desktopScreen',
      isBigTitle: true,
    },
  })),
  MetadataTexts: jest.fn(() => ({
    title: MetadataTitle.NOT_FOUND,
    description: MetadataDescription.NOT_FOUND,
    keywords: MetadataKeywords.NOT_FOUND,
  })),
}));
//FIXME: can't find out how to destructure properties from "notFound". meanwhile, tests will fail cause of metadata

describe('NotFoundPage', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test('should render correctly with all subcomponents', () => {
    expect(
      screen.getByRole('heading', { name: SectionDescriptions[SectionTitle.NotFound] }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('notFoundNavigation')).toBeInTheDocument();
  });

  test('There is a correct page description', () => {
    const lvl2Header = screen.getByRole('heading', { level: 2 });
    expect(lvl2Header).toBeInTheDocument();

    expect(lvl2Header).toHaveTextContent('Ой!');
    expect(lvl2Header).toHaveTextContent('Схоже, ми не можемо знайти сторінку');
  });
});
