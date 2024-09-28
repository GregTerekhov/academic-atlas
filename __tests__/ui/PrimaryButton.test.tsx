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

  describe('Rendering and Attributes', () => {
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

    it('renders AriaDescriptionText with correct id and description', () => {
      renderButton();

      const description = screen.getByTestId('aria-description-text');
      expect(description).toBeInTheDocument();
      expect(description).toHaveAttribute('id', defaultProps.ariaId);
      expect(description).toHaveTextContent(AriaDescription.DefaultOrdering);
    });

    it.each([
      [false, false],
      [true, false],
      [false, true],
      [true, true],
    ])(
      'applies correct styles based in isOnLightBackground (%p) and isDisabled (%p) props',
      (isOnLightBackground, isDisabled) => {
        renderButton({ isOnLightBackground, isDisabled });

        const buttonClass = getPrimaryButtonStyles(isOnLightBackground, isDisabled);

        const button = screen.getByRole('button', { name: /click me/i });
        expect(button).toHaveClass(buttonClass);
      },
    );
  });

  describe('Interaction', () => {
    it('calls handleClick when the button is clicked', () => {
      const handleClick = jest.fn();
      renderButton({ handleClick });

      const button = screen.getByRole('button', { name: /click me/i });

      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalled();
    });

    it('does not call handleClick when the button is disabled', () => {
      const handleClick = jest.fn();
      renderButton({ handleClick, isDisabled: true });

      const button = screen.getByRole('button', { name: /click me/i });

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Button Type and Children', () => {
    it('has correct button type by default', () => {
      renderButton();

      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toHaveAttribute('type', ButtonType.Button);
    });

    it('renders children correctly', () => {
      renderButton({ children: <span>Icon</span> });

      const button = screen.getByRole('button', { name: /icon/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Icon');
    });
  });

  describe('Aria-disabled Attribute', () => {
    it('sets aria-disabled when the button is disabled', () => {
      renderButton({ isDisabled: true });

      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
