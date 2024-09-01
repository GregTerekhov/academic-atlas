import { render, screen } from '@testing-library/react';
import { PlagiarismSection } from 'components/calculation/subcomponents';

jest.mock('components/calculation/subcomponents/plagiarism-checkbox', () =>
  jest.fn(({ id, label }) => (
    <label
      data-testid='plagiarism-checkbox'
      htmlFor={id}
    >
      <span>{label}</span>
    </label>
  )),
);

jest.mock('components/calculation/subcomponents/range-input', () =>
  jest.fn(({ id }) => (
    <div
      data-testid='range-input'
      id={id}
    />
  )),
);

describe('PlagiarismSection subComponent', () => {
  test('should render correctly', () => {
    render(<PlagiarismSection />);

    screen.debug();
    expect(screen.getByTestId('plagiarism-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('range-input')).toBeInTheDocument();
  });
});
