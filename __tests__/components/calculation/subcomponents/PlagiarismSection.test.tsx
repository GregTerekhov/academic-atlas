import { render, screen } from '@testing-library/react';
import {
  PlagiarismCheckbox,
  PlagiarismSection,
  RangeInput,
} from 'components/calculation/subcomponents';

jest.mock('components/calculation/subcomponents/plagiarism-checkbox', () =>
  jest.fn(() => <label data-testid='plagiarism-checkbox'></label>),
);

jest.mock('components/calculation/subcomponents/range-input', () =>
  jest.fn(() => <div data-testid='range-input' />),
);

describe('PlagiarismSection subComponent', () => {
  test('should render correctly', () => {
    render(<PlagiarismSection />);

    expect(screen.getByTestId('plagiarism-checkbox')).toBeInTheDocument();
    expect(PlagiarismCheckbox).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'checkbox',
        label: 'Наявність перевірки на плагіат',
      }),
      {},
    );

    expect(screen.getByTestId('range-input')).toBeInTheDocument();
    expect(RangeInput).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'range',
      }),
      {},
    );
  });
});
