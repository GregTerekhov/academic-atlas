import { render, screen } from '@testing-library/react';

import { AccessionItem } from 'components/performers/subcomponents';

jest.mock('styles', () => ({
  getFigureWrapperStyles: jest.fn(() => 'mock-figure-wrapper-class'),
}));

describe('AccessionItem subComponent', () => {
  const props = {
    id: '1',
    desc: 'Accession description',
  };

  beforeEach(() => {
    render(<AccessionItem {...props} />);
  });

  test('renders id in a strong element with correct styles', () => {
    const strongElement = screen.getByText(props.id);
    expect(strongElement).toBeInTheDocument();
    expect(strongElement).toHaveClass(
      'gradientText bg-accent-lightGradient font-philosopher [-webkit-background-clip:text] dark:bg-accent-darkGradient',
    );
  });

  it('renders desc in a paragraph element', () => {
    const paragraphElement = screen.getByText(props.desc);
    expect(paragraphElement).toBeInTheDocument();
    expect(paragraphElement).toHaveClass('generalText');
  });

  it('applies the correct class to the figure wrapper', () => {
    const figureWrapper = screen.getByText(props.id).closest('div');
    expect(figureWrapper).toHaveClass('mock-figure-wrapper-class');
  });

  it('renders the list item with correct layout classes', () => {
    const listItem = screen.getByText(props.desc).closest('li');
    expect(listItem).toHaveClass('flex items-center gap-x-6 lg:gap-x-16');
  });
});
