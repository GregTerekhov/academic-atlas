import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';

import { Breadcrumbs } from 'components';
import { MenuLinks, Paths } from 'types';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Breadcrumbs Component', () => {
  it('does not render on Paths.Main', () => {
    (usePathname as jest.Mock).mockReturnValue(Paths.Main);
    const { container } = render(<Breadcrumbs />);
    expect(container.firstChild).toBeNull();
  });

  it('displays the correct breadcrumb based on Paths.LegalInfo', () => {
    (usePathname as jest.Mock).mockReturnValue(Paths.LegalInfo);
    render(<Breadcrumbs />);
    expect(screen.getByText(MenuLinks.LegalInfo)).toBeInTheDocument();
  });

  it('displays the correct breadcrumb based on Paths.Partnership', () => {
    (usePathname as jest.Mock).mockReturnValue(Paths.Partnership);
    render(<Breadcrumbs />);
    expect(screen.getByText(MenuLinks.Partnership)).toBeInTheDocument();
  });

  it('displays the correct breadcrumb based on Paths.FAQ', () => {
    (usePathname as jest.Mock).mockReturnValue(Paths.FAQ);
    render(<Breadcrumbs />);
    expect(screen.getByText(MenuLinks.FAQ)).toBeInTheDocument();
  });

  it('does not display breadcrumb for invalid path', () => {
    (usePathname as jest.Mock).mockReturnValue('/invalid-path');
    const { container } = render(<Breadcrumbs />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the link to main page and the icon correctly on valid paths', () => {
    (usePathname as jest.Mock).mockReturnValue(Paths.FAQ);
    render(<Breadcrumbs />);
    expect(screen.getByRole('link', { name: MenuLinks.Main })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /expand/i })).toBeInTheDocument();
  });
});
