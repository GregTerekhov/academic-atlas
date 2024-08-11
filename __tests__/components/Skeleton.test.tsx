import { render, screen } from '@testing-library/react';

import { Skeleton } from 'components';

describe('Skeleton component', () => {
  it('should render the Skeleton component', () => {
    render(<Skeleton />);

    const sectionElement = screen.getByRole('region', { name: '' });
    expect(sectionElement).toHaveClass(
      'my-auto min-h-mobileScreen py-20 md:min-h-tabletScreen md:py-24 lg:min-h-desktopScreen lg:py-28',
    );

    const lines = screen.getByRole('generic');
    expect(lines).toHaveLength(5);

    const blockElement = screen.getByTestId('block');
    expect(blockElement).toHaveClass(
      'hidden size-64 rounded-3xl bg-accentPrimary/20 dark:bg-whiteBase/20 md:block lg:size-[536px]',
    );
  });
});
