import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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

test('Not found page should be rendered', () => {
  const notFoundPageRender = jest.fn((somePath: string) => {
    const validPathValues = Object.values(Paths);
    const isPathValid = validPathValues.find((value) => somePath === value);

    if (isPathValid) return 'Valid path was set';

    return 'Invalid path was set';
  });

  expect(notFoundPageRender('/')).toBe('Valid path was set');
  expect(notFoundPageRender('/FAQ')).toBe('Valid path was set');
  expect(notFoundPageRender('/#cost')).toBe('Valid path was set');
  expect(notFoundPageRender('/cost')).toBe('Invalid path was set');
});

describe('Page description tests', () => {
  test('There is a page description', () => {
    render(<NotFound />);
    const lvl2Header = screen.getByRole('heading', { level: 2 });
    expect(lvl2Header).toBeInTheDocument();
  });

  test('The description is correct', () => {
    render(<NotFound />);
    const pageDesc = screen.getByRole('heading', { level: 2 });
    expect(pageDesc.firstChild?.textContent).toMatch('Ой!');
    expect(pageDesc.textContent).toMatch('Схоже, ми не можемо знайти сторінку');
  });
});

describe('Home link is correct', () => {
  test('There is a home return link', () => {
    render(<NotFoundNavigation />);
    const homeLink = screen.getByRole('link');
    expect(homeLink).toBeInTheDocument();
  });

  test('Home link navigate to Home page', () => {
    render(<NotFoundNavigation />);

    const homeLink = screen.getByRole('link');
    expect(homeLink.hasAttribute('href')).toBeTruthy();
    expect(homeLink.getAttribute('href')).toBe(Paths.Main);
  });
});
