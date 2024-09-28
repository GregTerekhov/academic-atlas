import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { ButtonType, PrimaryButtonLabel, AriaId, Paths, AriaDescription, AriaLabel } from 'types';
import { useActiveLink } from 'context';
import { NotFoundNavigation } from 'components';
import { getPrimaryButtonStyles } from 'styles';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('context', () => ({
  useActiveLink: jest.fn(),
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
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseActiveLink = useActiveLink as jest.Mock;

  const mockBack = jest.fn();
  const mockUpdateActiveLink = jest.fn();

  const setupMocks = () => {
    mockUseRouter.mockReturnValue({ back: mockBack });
    mockUseActiveLink.mockReturnValue({ updateActiveLink: mockUpdateActiveLink });
  };

  beforeEach(() => {
    setupMocks();
    render(<NotFoundNavigation />);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
  });

  test('calls back function on click', () => {
    const primaryButton = screen.getByRole('button', {
      name: PrimaryButtonLabel.ToPreviousPage,
    });

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

  test('calls updateActiveLink on click', () => {
    const homeLink = screen.getByText(PrimaryButtonLabel.ToMainPage);
    fireEvent.click(homeLink);

    expect(mockUpdateActiveLink).toHaveBeenCalledWith(Paths.Main);
  });

  test('calls getPrimaryButtonStyles once', () => {
    expect(getPrimaryButtonStyles).toHaveBeenCalledTimes(1);
  });
});
