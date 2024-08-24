import { render, screen } from '@testing-library/react';

import { IconName, MenuLinks, SvgSizes } from 'types';
import { useBreadcrumbs } from 'hooks';
import { Breadcrumbs } from 'components';

jest.mock('hooks', () => ({
  useBreadcrumbs: jest.fn(),
}));

jest.mock('ui', () => {
  type MockedSvgIconUI = {
    id: IconName;
    size: SvgSizes;
    className: string;
    ariaLabel?: string;
    ariaHidden?: boolean;
  };

  return {
    SvgIconUI: ({ id, size, className, ariaLabel, ariaHidden }: MockedSvgIconUI) => (
      <svg
        aria-hidden={ariaHidden}
        className={className}
        height={size.height}
        width={size.width}
        role='img'
        aria-label={ariaLabel}
      >
        <use href={`/images/icons.svg#${id}`} />
      </svg>
    ),
  };
});

describe('Breadcrumbs Component', () => {
  const mockUseBreadcrumbs = useBreadcrumbs as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when determinedPath is an empty string, for example, on Paths.Main', () => {
    const invalidPaths = ['', undefined, null];

    invalidPaths.forEach((path) => {
      mockUseBreadcrumbs.mockReturnValue(path);
      const { container } = render(<Breadcrumbs />);

      expect(container.firstChild).toBeNull();
    });
  });

  it.each([
    [MenuLinks.Policy, 'should display the correct breadcrumb for Policy path'],
    [MenuLinks.Offer, 'should display the correct breadcrumb for Offer path'],
    [MenuLinks.Partnership, 'should display the correct breadcrumb for Partnership path'],
    [MenuLinks.FAQ, 'should display the correct breadcrumb for FAQ path'],
  ])('%s', (menuLink) => {
    mockUseBreadcrumbs.mockReturnValue(menuLink);
    render(<Breadcrumbs />);

    expect(screen.getByText(menuLink)).toBeInTheDocument();
  });

  it('renders the link to main page and the icon correctly on valid paths', () => {
    mockUseBreadcrumbs.mockReturnValue(MenuLinks.FAQ);
    render(<Breadcrumbs />);

    expect(screen.getByRole('link', { name: MenuLinks.Main })).toBeInTheDocument();

    const svgIcon = screen.getByRole('img', { hidden: true });
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon.querySelector('use')).toHaveAttribute('href', '/images/icons.svg#expand');
  });
});
