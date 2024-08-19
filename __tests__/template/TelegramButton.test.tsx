import { fireEvent, render, screen } from '@testing-library/react';

import { PrimaryButtonLabel, AriaDescription, AriaId, TelegramScenario } from 'types';
import { getAndEncodeDataObject } from 'helpers';

import { TelegramButton } from 'template';

import { getPrimaryButtonStyles } from 'styles';

jest.mock('helpers', () => ({
  getAndEncodeDataObject: jest.fn(),
}));

jest.mock('styles', () => ({
  getPrimaryButtonStyles: jest.fn(),
}));

describe('TelegramButton Component', () => {
  const mockGetAndEncodeDataObject = getAndEncodeDataObject as jest.Mock;
  const mockGetPrimaryButtonStyles = getPrimaryButtonStyles as jest.Mock;

  const defaultProps = {
    command: 'test-command' as TelegramScenario,
    label: 'Send to Telegram' as PrimaryButtonLabel,
    ariaId: 'telegram-description' as AriaId,
    ariaDescription: 'This is a button to send a message to Telegram' as AriaDescription,
    isOnLightBackground: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderTelegramButton = (overrides = {}) => {
    return render(
      <TelegramButton
        {...defaultProps}
        {...overrides}
      />,
    );
  };

  const getLinkElement = () => {
    return screen.getByRole('link', { name: defaultProps.label });
  };

  it('should render the TelegramButton component correctly', () => {
    mockGetAndEncodeDataObject.mockReturnValue('base64String');

    renderTelegramButton();

    const linkElement = getLinkElement();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '#');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkElement).toHaveClass('py-[17px]');
    expect(linkElement).toHaveAttribute('aria-describedby', defaultProps.ariaId);
    expect(mockGetPrimaryButtonStyles).toHaveBeenCalledWith(false);

    const ariaDescriptionElement = screen.getByText(defaultProps.ariaDescription);
    expect(ariaDescriptionElement).toBeInTheDocument();
  });

  it('should update href correctly when clicked', () => {
    mockGetAndEncodeDataObject.mockReturnValue('base64String');

    renderTelegramButton();

    const linkElement = getLinkElement();
    fireEvent.click(linkElement);

    expect(mockGetAndEncodeDataObject).toHaveBeenCalledWith(defaultProps.command);
    expect(linkElement).toHaveAttribute('href', 'https://t.me/AcademicAtlasBot?start=base64String');
  });

  it('should not update href if getAndEncodeDataObject returns null', () => {
    mockGetAndEncodeDataObject.mockReturnValue(null);

    renderTelegramButton();

    const linkElement = getLinkElement();
    fireEvent.click(linkElement);

    expect(linkElement).toHaveAttribute('href', '#');
  });

  it('should apply correct styles based on isOnLightBackground prop', () => {
    mockGetPrimaryButtonStyles.mockReturnValue(
      'hocus:text-accentPrimary dark:hocus:text-whiteBase py-[17px]',
    );
    renderTelegramButton({ isOnLightBackground: true });

    const linkElement = getLinkElement();
    expect(mockGetPrimaryButtonStyles).toHaveBeenCalledWith(true);
    expect(linkElement).toHaveClass('hocus:text-accentPrimary dark:hocus:text-whiteBase py-[17px]');
  });

  it('should render AriaDescriptionUI correctly', () => {
    renderTelegramButton();

    const ariaDescriptionElement = screen.getByTestId('aria-description-text');
    expect(ariaDescriptionElement).toBeInTheDocument();
    expect(ariaDescriptionElement).toHaveAttribute('id', defaultProps.ariaId);
    expect(ariaDescriptionElement).toHaveTextContent(defaultProps.ariaDescription);
  });

  it('should keep href as # if clicked before href is updated', () => {
    mockGetAndEncodeDataObject.mockReturnValueOnce('base64String');
    mockGetAndEncodeDataObject.mockReturnValueOnce(null);

    renderTelegramButton();

    const linkElement = getLinkElement();
    expect(linkElement).toHaveAttribute('href', '#');
    fireEvent.click(linkElement);

    expect(linkElement).toHaveAttribute('href', 'https://t.me/AcademicAtlasBot?start=base64String');
  });
});
