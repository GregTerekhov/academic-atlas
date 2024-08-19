import { render, screen } from '@testing-library/react';

import { MobileMenuTemplate } from 'template';
import { getMobileMenuContainerStyles } from 'styles';

jest.mock('components', () => ({
  BackButton: jest.fn(() => <button>BackButton</button>),
}));

jest.mock('styles', () => ({
  getMobileMenuContainerStyles: jest.fn(),
}));

describe('MobileMenu Template', () => {
  const mockChildren = <div>Menu Content</div>;
  const mockGetMobileMenuContainerStyles = getMobileMenuContainerStyles as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with the correct styles when isOpen is true', () => {
    const openStyles = 'left-0';
    mockGetMobileMenuContainerStyles.mockReturnValue(openStyles);

    render(<MobileMenuTemplate isOpen={true}>{mockChildren}</MobileMenuTemplate>);

    const container = screen.getByTestId('mobile-menu');

    expect(getMobileMenuContainerStyles).toHaveBeenCalledWith(true);
    expect(container).toHaveClass(openStyles);
    expect(screen.getByText('Menu Content')).toBeInTheDocument();
  });

  it('should render with the correct styles when isOpen is false', () => {
    const closedStyles = '-left-full';
    mockGetMobileMenuContainerStyles.mockReturnValue(closedStyles);

    render(<MobileMenuTemplate isOpen={false}>{mockChildren}</MobileMenuTemplate>);

    const container = screen.getByTestId('mobile-menu');

    expect(getMobileMenuContainerStyles).toHaveBeenCalledWith(false);
    expect(container).toHaveClass(closedStyles);
    expect(screen.getByText('Menu Content')).toBeInTheDocument();
  });
});
