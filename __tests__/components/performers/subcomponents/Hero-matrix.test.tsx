import { render, screen } from '@testing-library/react';

import { HeroMatrix } from 'components/performers/subcomponents';
import { getHeroGrid } from 'data/componentsData';

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(() => (
    <ul>
      {getHeroGrid().map(() => (
        <li data-testid='hero-matrix-vector'></li>
      ))}
    </ul>
  )),
}));

describe('Hero-matrix component', () => {
  test('Should render a list of matrix vectors', () => {
    render(<HeroMatrix />);

    const heroMatrixVector = screen.getAllByTestId('hero-matrix-vector');

    expect(heroMatrixVector).toHaveLength(getHeroGrid().length);
  });
});
