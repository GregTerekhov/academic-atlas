import { render, screen } from '@testing-library/react';

import { AriaLabel, IconName } from 'types';
import { LogoIcon } from 'components/layout/subcomponents';

jest.mock('ui', () => ({
  SvgIconUI: jest.fn(({ id, ariaLabel, ariaHidden }) => (
    <svg
      data-testid='icon-logo'
      id={id}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    />
  )),
}));

describe('LogoIcon Component', () => {
  it('renders icon correctly', () => {
    render(<LogoIcon />);

    const iconElement = screen.getByTestId('icon-logo');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('id', IconName.Logo);
    expect(iconElement).toHaveAttribute('aria-hidden', 'false');
    expect(iconElement).toHaveAttribute('aria-label', AriaLabel.Logo);
  });
});
