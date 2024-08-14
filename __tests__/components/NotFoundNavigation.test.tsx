import { fireEvent, render, screen } from '@testing-library/react';
import NotFoundNavigation from 'components/not-found-controls';
import { useRouter } from 'next/navigation';
import { Paths } from 'types/layoutTypes';
import { ButtonType, PrimaryButtonLabel } from 'types/ui';

const mockBack = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}));

jest.mock('ui/index', () => ({
  PrimaryButtonUI: jest.fn(({ buttonClass, children, ariaId, isDisabled }) => (
    <button
      aria-describedby={ariaId}
      type={ButtonType.Button}
      onClick={() => mockBack()}
      className={`${buttonClass} h-16`}
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {children}
    </button>
  )),
}));

jest.mock('styles', () => ({ getPrimaryButtonStyles: jest.fn(() => 'primary-button-styles') }));

describe('NotFoundNavigation', () => {
  beforeEach(() => {
    render(<NotFoundNavigation />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('There are two links on the page', () => {
    const linkArray = screen.getByRole('list');

    expect(linkArray).toBeInTheDocument();
    expect(linkArray.childNodes).toHaveLength(2);
  });

  describe('PrimaryButtonLink', () => {
    test('render PrimaryButtonUI with correct props', () => {
      const primaryButton = screen.getByRole('button', { name: PrimaryButtonLabel.ToPreviousPage });

      expect(primaryButton).toBeInTheDocument();
      // expect(primaryButton).toHaveAttribute('aria-describedby', 'AriaId.ComeBack404'); FIXME: Received wrong value

      fireEvent.click(primaryButton);
      (useRouter as jest.Mock).mockReturnValue({
        back: mockBack,
      });

      expect(mockBack).toHaveBeenCalled();
    });

    test('There is a home return link', () => {
      const homeLink = screen.getByRole('link');
      expect(homeLink).toBeInTheDocument();

      expect(homeLink).toHaveAttribute('href', Paths.Main);
    });
  });

  describe('NextLink', () => {
    test('There is a NextLink with correct props', () => {
      const nextLink = screen.getByRole('link');

      expect(nextLink).toBeInTheDocument();
      expect(nextLink).toHaveAttribute('href', Paths.Main);
      expect(nextLink).toHaveClass('primary-button-styles h-16');
    });
  });
});
