import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { AriaDescription, AriaId, MenuLinks, Paths } from 'types';
import { useActivateLink } from 'hooks';
import LegalLinkItem from 'components/layout/subcomponents/link-item';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('hooks', () => ({
  useActivateLink: jest.fn(),
}));

describe('LegalLinkItem Component', () => {
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseActiveLink = useActivateLink as jest.Mock;
  const mockClearActiveLink = jest.fn();

  beforeEach(() => {
    mockUsePathname.mockReturnValue(Paths.Main);
    mockUseActiveLink.mockReturnValue({ clearActiveLink: mockClearActiveLink });

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders link with correct attributes and descriptions', () => {
    render(
      <LegalLinkItem
        href={Paths.Policy}
        ariaId={AriaId.Policy}
        ariaDescription={AriaDescription.Policy}
        linkLabel={MenuLinks.Policy}
      />,
    );

    const linkItem = screen.getByText(MenuLinks.Policy);

    expect(linkItem).toBeInTheDocument();
    expect(linkItem).toHaveAttribute('href', Paths.Policy);
    expect(linkItem).toHaveAttribute('aria-describedby', AriaId.Policy);

    const descriptionElement = screen.getByText(AriaDescription.Policy);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('sets aria-current when pathname matches href', () => {
    mockUsePathname.mockReturnValue(Paths.Policy);

    render(
      <LegalLinkItem
        href={Paths.Policy}
        ariaId={AriaId.Policy}
        ariaDescription={AriaDescription.Policy}
        linkLabel={MenuLinks.Policy}
      />,
    );

    const linkElement = screen.getByText(MenuLinks.Policy);
    expect(linkElement).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current when pathname does not match href', () => {
    render(
      <LegalLinkItem
        href={Paths.Offer}
        ariaId={AriaId.Offer}
        ariaDescription={AriaDescription.Offer}
        linkLabel={MenuLinks.Offer}
      />,
    );

    const linkElement = screen.getByText(MenuLinks.Offer);
    expect(linkElement).not.toHaveAttribute('aria-current');
  });

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
