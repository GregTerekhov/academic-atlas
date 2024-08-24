import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { AriaDescription, MenuLinks, Paths } from 'types';
import { LegalLink } from 'components';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('components/layout/subcomponents', () => ({
  LinkItem: jest.fn(({ href, ariaId, ariaDescription, linkLabel }) => (
    <>
      <a href={href}>{linkLabel}</a>
      <span id={ariaId}>{ariaDescription}</span>
    </>
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

  it.each([
    [MenuLinks.Policy, Paths.Policy, AriaDescription.Policy],
    [MenuLinks.Offer, Paths.Offer, AriaDescription.Offer],
  ])(
    'renders LegalLink with correct %s link and description',
    (linkLabel, expectedHref, expectedDescription) => {
      render(<LegalLink />);

      const linkElement = screen.getByText(linkLabel);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.getAttribute('href')).toBe(expectedHref);

      expect(screen.getByText(expectedDescription)).toBeInTheDocument();
    },
  );
});
