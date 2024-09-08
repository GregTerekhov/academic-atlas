import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';

import { AriaDescription, AriaId, MenuLinks, Paths } from 'types';
import LegalLinkItem from 'components/layout/subcomponents/link-item';
import { useActiveLink } from 'context';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('hooks', () => ({
  useActiveLink: jest.fn(),
}));

describe('LegalLinkItem Component', () => {
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseActiveLink = useActiveLink as jest.Mock;
  const mockClearActiveLink = jest.fn();

  beforeEach(() => {
    mockUsePathname.mockReturnValue(Paths.Main);
    mockUseActiveLink.mockReturnValue({ clearActiveLink: mockClearActiveLink });

    jest.clearAllMocks();
  });

  const renderComponent = (props: ComponentProps<typeof LegalLinkItem>) =>
    render(<LegalLinkItem {...props} />);

  it.each([
    [Paths.Policy, AriaId.Policy, AriaDescription.Policy, MenuLinks.Policy],
    [Paths.Offer, AriaId.Offer, AriaDescription.Offer, MenuLinks.Offer],
  ] as [Paths, AriaId, AriaDescription, MenuLinks][])(
    'renders link with correct attributes and descriptions for %s',
    (href, ariaId, ariaDescription, linkLabel) => {
      renderComponent({ href, ariaId, ariaDescription, linkLabel });

      const linkItem = screen.getByText(linkLabel);
      expect(linkItem).toBeInTheDocument();
      expect(linkItem).toHaveAttribute('href', href);
      expect(linkItem).toHaveAttribute('aria-describedby', ariaId);

      const descriptionElement = screen.getByText(ariaDescription);
      expect(descriptionElement).toBeInTheDocument();
    },
  );

  it.each([
    [Paths.Policy, 'page'],
    [Paths.Offer, undefined],
  ] as [Paths, string | undefined][])(
    'sets aria-current correctly based on pathname',
    (href, expectedAriaCurrent) => {
      mockUsePathname.mockReturnValue(href);

      renderComponent({
        href: Paths.Policy,
        ariaId: AriaId.Policy,
        ariaDescription: AriaDescription.Policy,
        linkLabel: MenuLinks.Policy,
      });

      const linkElement = screen.getByText(MenuLinks.Policy);

      if (expectedAriaCurrent) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(linkElement).toHaveAttribute('aria-current', expectedAriaCurrent);
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(linkElement).not.toHaveAttribute('aria-current');
      }
    },
  );

  it('calls clearActiveLink when link is clicked', () => {
    render(
      <LegalLinkItem
        href={Paths.Policy}
        ariaId={AriaId.Policy}
        ariaDescription={AriaDescription.Policy}
        linkLabel={MenuLinks.Policy}
      />,
    );

    const linkElement = screen.getByText(MenuLinks.Policy);
    fireEvent.click(linkElement);

    expect(mockClearActiveLink).toHaveBeenCalled();
  });
});
