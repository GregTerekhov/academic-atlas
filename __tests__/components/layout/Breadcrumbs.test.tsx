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
  it('does not render on Paths.Main', () => {
    (useBreadcrumbs as jest.Mock).mockReturnValue('');
    const { container } = render(<Breadcrumbs />);
    screen.debug();
    expect(container.firstChild).toBeNull();
  });

  it('displays the correct breadcrumb based on Paths.Policy', () => {
    (useBreadcrumbs as jest.Mock).mockReturnValue(MenuLinks.Policy);
    render(<Breadcrumbs />);
    screen.debug();
    expect(screen.getByText((content) => content.startsWith(MenuLinks.Policy))).toBeInTheDocument();
  });

  it('displays the correct breadcrumb based on Paths.Offer', () => {
    (useBreadcrumbs as jest.Mock).mockReturnValue(MenuLinks.Offer);
    render(<Breadcrumbs />);
    screen.debug();
    expect(screen.getByText(MenuLinks.Offer)).toBeInTheDocument();
  });

  it('displays the correct breadcrumb based on Paths.Partnership', () => {
    (useBreadcrumbs as jest.Mock).mockReturnValue(MenuLinks.Partnership);
    render(<Breadcrumbs />);
    screen.debug();
    expect(screen.getByText(MenuLinks.Partnership)).toBeInTheDocument();
  });

  it('displays the correct breadcrumb based on Paths.FAQ', () => {
    (useBreadcrumbs as jest.Mock).mockReturnValue(MenuLinks.FAQ);
    render(<Breadcrumbs />);
    screen.debug();
    expect(screen.getByText(MenuLinks.FAQ)).toBeInTheDocument();
  });

  it('does not display breadcrumb for invalid path', () => {
    (useBreadcrumbs as jest.Mock).mockReturnValue(null);
    const { container } = render(<Breadcrumbs />);

    expect(container.firstChild).toBeNull();
  });

  it('renders the link to main page and the icon correctly on valid paths', () => {
    (useBreadcrumbs as jest.Mock).mockReturnValue(MenuLinks.FAQ);
    render(<Breadcrumbs />);
    screen.debug();
    expect(screen.getByRole('link', { name: MenuLinks.Main })).toBeInTheDocument();

    const svgIcon = screen.getByRole('img', { hidden: true });
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon.querySelector('use')).toHaveAttribute('href', '/images/icons.svg#expand');
  });
});
