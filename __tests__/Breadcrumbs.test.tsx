import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';

import { MenuLinks, Paths } from 'types';
import { Breadcrumbs } from 'components';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Breadcrumbs Component', () => {
  it('does not render on Paths.Main', () => {
    (usePathname as jest.Mock).mockReturnValue(Paths.Main);
    const { container } = render(<Breadcrumbs />);
    screen.debug();
    expect(container.firstChild).toBeNull();
  });

  it('displays the correct breadcrumb based on Paths.Policy', () => {
    (usePathname as jest.Mock).mockReturnValue(Paths.Policy);
    render(<Breadcrumbs />);
    screen.debug();
    expect(screen.getByText(MenuLinks.Policy)).toBeInTheDocument();
  });

  it('displays the correct breadcrumb based on Paths.Offer', () => {
    (usePathname as jest.Mock).mockReturnValue(Paths.Offer);
    render(<Breadcrumbs />);
    screen.debug();
    expect(screen.getByText(MenuLinks.Offer)).toBeInTheDocument();
  });

  it('displays the correct breadcrumb based on Paths.Partnership', () => {
    (usePathname as jest.Mock).mockReturnValue(Paths.Partnership);
    render(<Breadcrumbs />);
    screen.debug();
    expect(screen.getByText(MenuLinks.Partnership)).toBeInTheDocument();
  });

  it('displays the correct breadcrumb based on Paths.FAQ', () => {
    (usePathname as jest.Mock).mockReturnValue(Paths.FAQ);
    render(<Breadcrumbs />);
    screen.debug();
    expect(screen.getByText(MenuLinks.FAQ)).toBeInTheDocument();
  });

  it('does not display breadcrumb for invalid path', () => {
    (usePathname as jest.Mock).mockReturnValue('/invalid-path');
    const { container } = render(<Breadcrumbs />);
    screen.debug();
    expect(container.firstChild).toBeNull();
  });

  it('renders the link to main page and the icon correctly on valid paths', () => {
    (usePathname as jest.Mock).mockReturnValue(Paths.FAQ);
    render(<Breadcrumbs />);
    screen.debug();
    expect(screen.getByRole('link', { name: MenuLinks.Main })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /expand/i })).toBeInTheDocument();
  });
});
