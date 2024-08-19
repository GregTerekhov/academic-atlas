import { fireEvent, render, screen } from '@testing-library/react';

import { AriaDescription, AriaId, ButtonType } from 'types';
import { PrimaryButtonUI } from 'ui';

import { getPrimaryButtonStyles } from 'styles';

describe('PrimaryButtonUI Component', () => {
  const defaultProps = {
    children: 'Click me',
    ariaDescription: AriaDescription.DefaultOrdering,
    ariaId: AriaId.DefaultOrdering,
  };

  const renderButton = (props = {}) =>
    render(
      <PrimaryButtonUI
        {...defaultProps}
        {...props}
      />,
    );

  it('should render the button with correct text and aria attributes', () => {
    renderButton();

    const buttonClass = getPrimaryButtonStyles(false, false);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-describedby', defaultProps.ariaId);
    expect(button).toHaveAttribute('type', ButtonType.Button);
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass(`${buttonClass} h-16`);
  });

  it('calls handleClick when the button is clicked', () => {
    const handleClick = jest.fn();
    renderButton({ handleClick });

    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies correct styles based on isOnLightBackground and isDisabled props', () => {
    const { rerender } = renderButton({ isOnLightBackground: true });

    const buttonClassOnLightBg = getPrimaryButtonStyles(true, false);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass(buttonClassOnLightBg);

    rerender(
      <PrimaryButtonUI
        {...defaultProps}
        isDisabled
      />,
    );

    const buttonClassOnLightBgAndDisabled = getPrimaryButtonStyles(true, true);

    expect(button).toHaveClass(buttonClassOnLightBgAndDisabled);
  });

  it('renders AriaDescriptionText with correct id and description', () => {
    renderButton();

    const description = screen.getByTestId('aria-description-text');
    expect(description).toBeInTheDocument();
    expect(description).toHaveAttribute('id', defaultProps.ariaId);
    expect(description).toHaveTextContent(AriaDescription.DefaultOrdering);
  });

  it('sets aria-disabled when the button is disabled', () => {
    renderButton({ isDisabled: true });

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call handleClick when the button is disabled', () => {
    const handleClick = jest.fn();
    renderButton({ handleClick, isDisabled: true });

    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has correct button type by default', () => {
    renderButton();

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveAttribute('type', ButtonType.Button);
  });
});
