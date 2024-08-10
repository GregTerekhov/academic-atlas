import { render, screen } from '@testing-library/react';
import Hero from '../components/performers/hero';
import '@testing-library/jest-dom';

describe('test', () => {
  test('hero perfom test', () => {
    render(<Hero />);
    const role = screen.getByRole('heading', { level: 1 });
    screen.debug();
    expect(role).toBeInTheDocument();
  });
});
