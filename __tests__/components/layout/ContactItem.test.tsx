import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { AriaLabel, IconName, IconSize, PositionInLayout } from 'types';
import { useMenu } from 'context';
import { getAriaLabelContacts } from 'helpers';
import { ContactItem } from 'components/layout/subcomponents';

jest.mock('context', () => ({
  useMenu: jest.fn(),
}));

jest.mock('helpers', () => ({
  getAriaLabelContacts: jest.fn(),
}));

describe('ContactItem Component', () => {
  const mockToggleNavMenu = jest.fn();
  const mockUseMenu = useMenu as jest.Mock;
  const mockGetAriaLabelContacts = getAriaLabelContacts as jest.Mock;
  const mockUseMenuOptions = {
    isNavMenuOpen: true,
    toggleNavMenu: mockToggleNavMenu,
  };

  const renderContactItem = (props = defaultProps) => {
    mockGetAriaLabelContacts.mockReturnValue('Email Email us');
    render(<ContactItem {...props} />);
  };

  beforeEach(() => {
    mockUseMenu.mockReturnValue(mockUseMenuOptions);

    jest.clearAllMocks();
  });

  const defaultProps = {
    href: 'mailto:test@example.com',
    iconName: 'email' as IconName,
    defaultSize: 24 as IconSize,
    iconSize: 'w-6 h-6',
    labelClass: 'text-base',
    label: 'Email us',
    variant: PositionInLayout.Footer,
    iconAriaLabel: 'email-icon' as AriaLabel,
  };

  it('should render the ContactItem correctly', () => {
    renderContactItem();

    const linkElement = screen.getByRole('link', { name: 'Email Email us' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', defaultProps.href);
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');

    const iconElement = screen.getByLabelText('email-icon');
    expect(iconElement).toBeInTheDocument();

    const labelElement = screen.getByText(defaultProps.label);
    expect(labelElement).toBeInTheDocument();
  });

  it.each([
    [PositionInLayout.Footer, 'md:max-lg:py-2'],
    [PositionInLayout.Header, 'group flex items-center gap-x-2'],
  ])('should apply the correct className for %s variant', (variant, expectedClass) => {
    renderContactItem({ ...defaultProps, variant });

    const linkElement = screen.getByRole('link', { name: 'Email Email us' });
    expect(linkElement).toHaveClass(expectedClass);
  });

  it('should call toggleNavMenu if isNavMenuOpen is open', async () => {
    mockUseMenu.mockReturnValue({
      ...mockUseMenuOptions,
      isNavMenuOpen: true,
    });

    renderContactItem();

    const linkElement = screen.getByRole('link', { name: 'Email Email us' });
    fireEvent.click(linkElement);

    await waitFor(() => {
      expect(mockToggleNavMenu).toHaveBeenCalled();
    });
  });

  it('should not call toggleNavMenuOpen is false', () => {
    mockUseMenu.mockReturnValue({
      ...mockUseMenuOptions,
      isNavMenuOpen: false,
    });

    renderContactItem();

    const linkElement = screen.getByRole('link', { name: 'Email Email us' });
    fireEvent.click(linkElement);

    expect(mockToggleNavMenu).not.toHaveBeenCalled();
  });

  it('should generate correct aria-label using getAriaLabelContacts', () => {
    const ariaLabel = 'Open link to Email us';
    mockGetAriaLabelContacts.mockReturnValue(ariaLabel);

    render(<ContactItem {...defaultProps} />);

    const linkElement = screen.getByRole('link', { name: ariaLabel });
    expect(linkElement).toBeInTheDocument();
    expect(getAriaLabelContacts).toHaveBeenCalledWith(defaultProps.href, defaultProps.label);
  });
});
