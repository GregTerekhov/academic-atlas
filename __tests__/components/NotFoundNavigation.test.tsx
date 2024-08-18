import { fireEvent, render, screen } from '@testing-library/react';
import NotFoundNavigation from 'components/not-found-controls';
import { useRouter } from 'next/navigation';
import { Paths } from 'types/layoutTypes';
import { ButtonType, PrimaryButtonLabel } from 'types/ui';

const mockBackRoute = useRouter as jest.Mock;
mockBackRoute.mockReturnValue({
  back: jest.fn(),
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}));

jest.mock('ui', () => ({
  PrimaryButtonUI: jest.fn(({ children, ariaId, isDisabled }) => (
    <button
      aria-describedby={ariaId}
      type={ButtonType.Button}
      onClick={() => mockBackRoute()}
      className={`h-16`}
      aria-disabled={isDisabled}
    >
      {children}
    </button>
  )),
}));

jest.mock('styles', () => ({ getPrimaryButtonStyles: jest.fn(() => 'primary-button-styles') }));

describe('NotFoundNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<NotFoundNavigation />);
  });

  test('render PrimaryButtonUI with correct props', () => {
    const primaryButton = screen.getByRole('button', { name: PrimaryButtonLabel.ToPreviousPage });
    expect(primaryButton).toBeInTheDocument();

    fireEvent.click(primaryButton);
    expect(mockBackRoute).toHaveBeenCalled();
  });

  test('There is a home return link', () => {
    const homeLink = screen.getByRole('link');
    expect(homeLink).toBeInTheDocument();

    expect(homeLink).toHaveAttribute('href', Paths.Main);
    expect(homeLink).toHaveClass('primary-button-styles h-16');
  });
});
