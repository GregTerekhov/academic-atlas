import { render, screen } from '@testing-library/react';

import { IconName, IconSize } from 'types';

import { RatingIcons } from 'components/home/subcomponents';
import { SvgIconUI } from 'ui';

jest.mock('ui', () => ({
  SvgIconUI: jest.fn(({ 'data-testid': testId }) => <svg data-testid={testId} />),
}));

describe('RatingIcons Component', () => {
  const setup = (rating: number, index: number) => {
    render(
      <RatingIcons
        rating={rating}
        index={index}
      />,
    );
    return screen.getByTestId(`rating-icon-${index}`);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render RatingUp icon when index is less than rating', () => {
    const rating = 3;
    const index = 2;

    const icon = setup(rating, index);

    expect(icon).toBeInTheDocument();
    expect(SvgIconUI).toHaveBeenCalledWith(
      expect.objectContaining({
        id: IconName.RatingUp,
        className: 'fill-accentSecondary md:size-6',
        size: { width: IconSize.XXS, height: IconSize.XXS },
      }),
      {},
    );
  });

  it('should render RatingDown icon when index is equal to or greater than rating', () => {
    const rating = 3;
    const index = 3;

    setup(rating, index);

    expect(SvgIconUI).toHaveBeenCalledWith(
      expect.objectContaining({
        id: IconName.RatingDown,
        className: 'fill-accentSecondary md:size-6',
        size: { width: IconSize.XXS, height: IconSize.XXS },
      }),
      {},
    );
  });
});
