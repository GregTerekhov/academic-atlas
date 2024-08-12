import { render, screen } from '@testing-library/react';
import NotFound from 'app/not-found';
import NotFoundNavigation from 'components/not-found-controls';
import { Paths } from 'types/layoutTypes';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const notFoundPageRender = jest.fn((somePath: string) => {
  return Object.values(Paths).find((value) => somePath === value)
    ? 'Valid path was set'
    : 'Invalid path was set';
});

test('Not found page should be rendered', () => {
  expect(notFoundPageRender('/')).toBe('Valid path was set');
  expect(notFoundPageRender('/FAQ')).toBe('Valid path was set');
  expect(notFoundPageRender('/#cost')).toBe('Valid path was set');
  expect(notFoundPageRender('/cost')).toBe('Invalid path was set');
});

describe('Page description tests', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test('There is a page description', () => {
    const lvl2Header = screen.getByRole('heading', { level: 2 });
    expect(lvl2Header).toBeInTheDocument();
  });

  test('The description is correct', () => {
    const pageDesc = screen.getByRole('heading', { level: 2 });
    expect(pageDesc.firstChild?.textContent).toMatch('Ой!');
    expect(pageDesc.textContent).toMatch('Схоже, ми не можемо знайти сторінку');
  });
});

describe('Home link is correct', () => {
  beforeEach(() => {
    render(<NotFoundNavigation />);
  });

  test('There is a home return link', () => {
    const homeLink = screen.getByRole('link');
    expect(homeLink).toBeInTheDocument();
  });

  test('Home link navigate to Home page', () => {
    const homeLink = screen.getByRole('link');
    expect(homeLink).toHaveAttribute('href', Paths.Main);
  });
});
