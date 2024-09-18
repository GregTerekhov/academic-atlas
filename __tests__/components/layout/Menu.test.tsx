import { render, screen } from '@testing-library/react';
import { Contacts } from 'components';
import Menu from 'components/layout/menu';
import { PositionInLayout } from 'types/layoutTypes';

jest.mock('components/layout/contacts', () => jest.fn(() => <div data-testid='contacts'></div>));

jest.mock('components/layout/subcomponents/header-navigation', () =>
  jest.fn(() => <div data-testid='navigation'></div>),
);

describe('Menu Component', () => {
  it('renders children components correctly', () => {
    render(<Menu />);

    expect(screen.getByTestId('contacts')).toBeInTheDocument();
    expect(screen.getAllByTestId('navigation')).toHaveLength(2);
  });

  it('renders Contacts with correct variant prop', () => {
    render(<Menu />);

    expect(Contacts).toHaveBeenCalledWith(
      expect.objectContaining({ variant: PositionInLayout.Header }),
      {},
    );
  });
});
