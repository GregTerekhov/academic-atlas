import { fireEvent, render, screen } from '@testing-library/react';

import { ButtonType, PrimaryButtonLabel, AriaId, Paths, AriaDescription, AriaLabel } from 'types';
import { NotFoundNavigation } from 'components';
import { getPrimaryButtonStyles } from 'styles';

const mockBack = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    back: mockBack,
  })),
}));

jest.mock('ui', () => ({
  PrimaryButtonUI: jest.fn(({ children, ariaId, handleClick, ariaDescription }) => (
    <>
      <button
        aria-describedby={ariaId}
        type={ButtonType.Button}
        onClick={handleClick}
        className='h-16'
      >
        {children}
      </button>
      <span
        id={ariaId}
        data-testid='aria-description-text'
      >
        {ariaDescription}
      </span>
    </>
  )),
}));

jest.mock('styles', () => ({ getPrimaryButtonStyles: jest.fn(() => 'primary-button-styles') }));

describe('NotFoundNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<NotFoundNavigation />);
  });

  test('render PrimaryButtonUI with correct props and handles click', () => {
    const primaryButton = screen.getByRole('button', { name: PrimaryButtonLabel.ToPreviousPage });

    expect(primaryButton).toBeInTheDocument();
    expect(primaryButton).toHaveAttribute('aria-describedby', AriaId.ComeBack404);
    expect(primaryButton).toHaveClass('h-16');

    const ariaDescription = screen.getByTestId('aria-description-text');

    expect(ariaDescription).toBeInTheDocument();
    expect(ariaDescription).toHaveAttribute('id', AriaId.ComeBack404);
    expect(ariaDescription).toHaveTextContent(AriaDescription.ComeBack404);

    fireEvent.click(primaryButton);
    expect(mockBack).toHaveBeenCalled();
  });

  test('renders Link with correct attributes', () => {
    const homeLink = screen.getByText(PrimaryButtonLabel.ToMainPage);

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', Paths.Main);
    expect(homeLink).toHaveAttribute('aria-label', AriaLabel.ComeBack);
    expect(homeLink).toHaveClass('primary-button-styles h-16');
  });

  test('calls getPrimaryButtonStyles once', () => {
    expect(getPrimaryButtonStyles).toHaveBeenCalledTimes(1);
  });
});
