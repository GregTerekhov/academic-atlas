import { render, screen } from '@testing-library/react';

import { PlagiarismSection } from 'components/calculation/subcomponents';
import PlagiarismCheckbox from 'components/calculation/subcomponents/plagiarism-checkbox';
import RangeInput from 'components/calculation/subcomponents/range-input';

jest.mock('components/calculation/subcomponents/plagiarism-checkbox', () =>
  jest.fn(() => <label data-testid='plagiarism-checkbox'></label>),
);

jest.mock('components/calculation/subcomponents/range-input', () =>
  jest.fn(() => <div data-testid='range-input' />),
);

describe('PlagiarismSection Component', () => {
  beforeEach(() => {
    render(<PlagiarismSection />);
  });

  test('renders the PlagiarismCheckbox component with correct props', () => {
    expect(screen.getByTestId('plagiarism-checkbox')).toBeInTheDocument();
    expect(PlagiarismCheckbox).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'checkbox',
        label: 'Наявність перевірки на плагіат',
      }),
      {},
    );
  });

  it('renders the RangeInput component with correct props', () => {
    expect(screen.getByTestId('range-input')).toBeInTheDocument();
    expect(RangeInput).toHaveBeenCalledWith(
      {
        id: 'range',
      },
      {},
    );
  });
});
