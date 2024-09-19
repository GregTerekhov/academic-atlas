import { render, screen } from '@testing-library/react';

import { PositionInLayout } from 'types';
import { Logo } from 'components';

jest.mock('components/layout/subcomponents/logo-icon', () =>
  jest.fn(() => <div data-testid='logo-icon'></div>),
);
jest.mock('components/layout/subcomponents/logo-link', () =>
  jest.fn(() => <div data-testid='logo-link'></div>),
);

describe('Logo Component', () => {
  const renderComponent = (position: PositionInLayout) => {
    render(<Logo position={position} />);
  };

  it('renders link with logo when position is "header"', () => {
    renderComponent(PositionInLayout.Header);

    const logoLink = screen.getByTestId('logo-link');
    expect(logoLink).toBeInTheDocument();
  });

  it('renders only icon when position is not "header"', () => {
    renderComponent(PositionInLayout.Footer);

    const logoIcon = screen.getByTestId('logo-icon');
    expect(logoIcon).toBeInTheDocument();
  });
});
