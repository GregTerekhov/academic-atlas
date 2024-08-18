import { render, screen } from '@testing-library/react';

import { HeroMatrix } from 'components/performers/subcomponents';
import { getHeroGrid } from 'data';
import { type IHeroGrid } from 'types';

jest.mock('data', () => ({
  getHeroGrid: jest.fn(),
  heroMatrixImageSettings: {
    width: 80,
    height: 80,
    className: 'lg:size-44',
  },
}));

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children, items }) => (
    <ul data-testid='hero-matrix-list'>{items.map((item: IHeroGrid) => children(item))}</ul>
  )),
}));

jest.mock('ui', () => ({
  ImageUI: jest.fn((props) => (
    <img
      data-testid='img-hero-matrix'
      src={props.src}
      alt={props.alt}
    />
  )),
}));

describe('HeroMatrix component', () => {
  test('Should render subComponent correctly', () => {
    jest.clearAllMocks();

    const mockGetHeroGrid = getHeroGrid as jest.Mock;
    mockGetHeroGrid.mockReturnValue([
      {
        id: 'top-left',
        className:
          'overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-whiteBase/20 lg:rounded-bl-[60px] lg:rounded-tr-[60px]',
        imageSrc: 'heroMatrixTop.src',
        imageAlt: 'heroMatrixTop.alt',
      },
    ]);

    render(<HeroMatrix />);

    const heroMatrixList = screen.getByTestId('hero-matrix-list');
    expect(heroMatrixList).toBeInTheDocument();

    const heroMatrixImg = screen.getByTestId('img-hero-matrix');
    expect(heroMatrixImg).toBeInTheDocument();
  });
});
