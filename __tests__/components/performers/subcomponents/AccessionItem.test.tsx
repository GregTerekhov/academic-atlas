import { render, screen } from '@testing-library/react';
import { AccessionItem } from 'components/performers/subcomponents';

jest.mock('styles', () => ({
  getFigureWrapperStyles: jest.fn(),
}));

describe('AccessionItem subComponent', () => {
  test('should render subComponent with proper description', () => {
    const testIAccessionProps = {
      id: '1',
      desc: 'accession-desc',
    };

    render(<AccessionItem {...testIAccessionProps} />);

    const accessionItemDesc = screen.getByText('accession-desc');
    expect(accessionItemDesc).toBeInTheDocument();
  });
});
