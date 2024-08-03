import { render, screen } from '@testing-library/react';
import Hero from '../components/performers/hero';
import '@testing-library/jest-dom';

describe('test', () => {
  test('max math test', () => {
    expect(Math.max(1, 5, 15, 25)).toBe(25);
  });

  test('min math test', () => {
    expect(Math.min(1, 5, 15, 25)).toBe(1);
  });

  const arr = ['banana', 'apple', 'waffle', 'cake'];
  test('array test', () => {
    expect(arr).toContain('waffle');
  });

  test('hero perfom test', () => {
    render(<Hero />);
    const role = screen.getByRole('heading', { level: 1 });
    expect(role).toBeInTheDocument();
  });
});
