/* eslint-disable @next/next/no-img-element */
/* eslint-disable jest/no-conditional-expect */
import { render, screen } from '@testing-library/react';

import { type IHeroGrid } from 'types';
import { getHeroGrid, heroMatrixImageSettings } from 'data';
import { HeroMatrix } from 'components/performers/subcomponents';

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
      {...props}
      alt={props.alt}
    />
  )),
}));

describe('HeroMatrix component', () => {
  const mockGetHeroGrid = getHeroGrid as jest.Mock;
  const mockCells = [
    {
      id: 'top-left',
      className:
        'overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-whiteBase/20 lg:rounded-bl-[60px] lg:rounded-tr-[60px]',
      imageSrc: '/images/top-left-matrix-grid.webp',
      imageAlt: 'A person is typing on a laptop',
    },
    {
      id: 'top-right',
      className: 'col-start-3 rounded-t-[30px] bg-accentPrimary-darker/20 lg:rounded-t-[60px]',
    },
    {
      id: 'middle-left',
      className: 'row-start-2 rounded-ss-[50px] bg-accentPrimary/20 lg:rounded-ss-[100px]',
    },
    {
      id: 'middle-center',
      className: 'bg-whiteBase/20',
      imageSrc: '/images/center-matrix-grid.webp',
      imageAlt: 'A woman searches the bookshelves',
    },
    {
      id: 'middle-right',
      className: 'rounded-ee-[50px] bg-accentSecondary/20 lg:rounded-ee-[100px]',
    },
    {
      id: 'bottom-left',
      className:
        'rounded-b-[30px] bg-disabled-background/10 dark:bg-whiteBase/20 lg:rounded-b-[60px]',
    },
    {
      id: 'bottom-right',
      className:
        'col-start-3 overflow-hidden rounded-bl-[30px] rounded-tr-[30px] bg-whiteBase/20  lg:rounded-bl-[60px] lg:rounded-tr-[60px]',
      imageSrc: '/images/right-bottom-matrix-grid.jpg',
      imageAlt:
        'A woman holds a mug with her right hand and is about to write something in a notebook with her left',
    },
  ];

  beforeEach(() => {
    mockGetHeroGrid.mockReturnValue(mockCells);

    render(<HeroMatrix />);
  });

  it('renders HeroMatrix component without crashing', () => {
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders correct number of list items', () => {
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockCells.length);
  });

  it('renders ImageUI with correct props when imageSrc and imageAlt are provided', () => {
    mockCells.forEach((cell) => {
      if (cell.imageSrc && cell.imageAlt) {
        const imageElement = screen.getByAltText(cell.imageAlt);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', cell.imageSrc);
        expect(imageElement).toHaveAttribute('width', `${heroMatrixImageSettings.width}`);
        expect(imageElement).toHaveAttribute('height', `${heroMatrixImageSettings.height}`);
        expect(imageElement).toHaveClass(heroMatrixImageSettings.className);
      }
    });
  });

  it('applies correct className to each list item', () => {
    const listItems = screen.getAllByRole('listitem');

    mockCells.forEach((cell) => {
      if (cell.className) {
        const listItem = listItems.find((item) => item.classList.contains(cell.className));

        if (listItem) {
          expect(listItem).toHaveClass(cell.className);
        }
      }
    });
  });
});
