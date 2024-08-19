import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { AriaDescription, MenuLinks, Paths } from 'types';
import { LegalLink } from 'components';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('components/layout/subcomponents', () => ({
  LinkItem: jest.fn(({ href, ariaId, ariaDescription, linkLabel }) => (
    <div>
      <a href={href}>{linkLabel}</a>
      <span id={ariaId}>{ariaDescription}</span>
    </div>
  )),
}));

describe('LegalLink Component', () => {
  const mockUsePathname = usePathname as jest.Mock;

  beforeEach(() => {
    mockUsePathname.mockReturnValue(Paths.Main);

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders LegalLink with correct links and descriptions', () => {
    render(<LegalLink />);

    const policyLink = screen.getByText(MenuLinks.Policy);
    const offerLink = screen.getByText(MenuLinks.Offer);

    expect(policyLink).toBeInTheDocument();
    expect(offerLink).toBeInTheDocument();

    expect(policyLink.getAttribute('href')).toBe(Paths.Policy);
    expect(offerLink.getAttribute('href')).toBe(Paths.Offer);

    expect(screen.getByText(AriaDescription.Policy)).toBeInTheDocument();
    expect(screen.getByText(AriaDescription.Offer)).toBeInTheDocument();
  });
});
