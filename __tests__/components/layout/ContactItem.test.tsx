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

  beforeEach(() => {
    mockUseMenu.mockReturnValue(mockUseMenuOptions);

    jest.clearAllMocks();
  });

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

  it.each([
    ['call', true],
    ['not call', false],
  ])('should %s toggleNavMenu if isNavMenuOpen is %s', async (_, isNavMenuOpen) => {
    mockUseMenu.mockReturnValue({
      ...mockUseMenuOptions,
      isNavMenuOpen,
    });

    renderContactItem();

    const linkElement = screen.getByRole('link', { name: 'Email Email us' });
    fireEvent.click(linkElement);

    if (isNavMenuOpen) {
      await waitFor(() => {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(mockToggleNavMenu).toHaveBeenCalled();
      });
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(mockToggleNavMenu).not.toHaveBeenCalled();
    }
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
