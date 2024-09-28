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

  const testCases = [
    {
      isOpen: true,
      expectedStyles: 'left-0',
      calledWith: true,
    },
    {
      isOpen: false,
      expectedStyles: '-left-full',
      calledWith: false,
    },
  ];

  it.each(testCases)(
    'should render with the correct styles when isOpen is $isOpen',
    ({ isOpen, expectedStyles, calledWith }) => {
      mockGetMobileMenuContainerStyles.mockReturnValue(expectedStyles);

      render(<MobileMenuTemplate isOpen={isOpen}>{mockChildren}</MobileMenuTemplate>);

      const container = screen.getByTestId('mobile-menu');

      expect(getMobileMenuContainerStyles).toHaveBeenCalledWith(calledWith);
      expect(container).toHaveClass(expectedStyles);
      expect(screen.getByText('Menu Content')).toBeInTheDocument();
    },
  );
});
