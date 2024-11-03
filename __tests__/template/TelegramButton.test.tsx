/* eslint-disable jest/no-conditional-expect */
import { fireEvent, render, screen } from '@testing-library/react';

import { PrimaryButtonLabel, AriaDescription, AriaId, TelegramScenario } from 'types';
import { getAndEncodeDataObject } from 'helpers';

import { TelegramButton } from 'template';

import { getPrimaryButtonStyles } from 'styles';

const HREF_TO_BOT = 'https://t.me/AcademicAtlasBot?start=base64String';

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

  const testCasesForHref = [
    {
      description: 'should update href correctly when clicked',
      returnValue: 'base64String',
      expectedHref: 'https://t.me/AcademicAtlasBot?start=base64String',
    },
    {
      description: 'should not update href if getAndEncodeDataObject returns null',
      returnValue: null,
      expectedHref: '#',
    },
  ];

  const testCasesForAriaSpan = [
    {
      ariaId: undefined as unknown as AriaId,
      ariaDescription: undefined as unknown as AriaDescription,
      shouldRender: false,
    },
    {
      ariaId: 'test-id' as AriaId,
      ariaDescription: undefined as unknown as AriaDescription,
      shouldRender: false,
    },
    {
      ariaId: undefined as unknown as AriaId,
      ariaDescription: 'Test description' as AriaDescription,
      shouldRender: false,
    },
    {
      ariaId: AriaId.DefaultOrdering,
      ariaDescription: AriaDescription.DefaultOrdering,
      shouldRender: true,
    },
  ];

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

  it.each(testCasesForHref)('$description', ({ returnValue, expectedHref }) => {
    mockGetAndEncodeDataObject.mockReturnValue(returnValue);

    renderTelegramButton();

    const linkElement = getLinkElement();
    fireEvent.click(linkElement);

    expect(linkElement).toHaveAttribute('href', expectedHref);
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

  it('should keep href as # if clicked before href is updated', () => {
    mockGetAndEncodeDataObject.mockReturnValueOnce('base64String');
    mockGetAndEncodeDataObject.mockReturnValueOnce(null);

    renderTelegramButton();

    const linkElement = getLinkElement();
    expect(linkElement).toHaveAttribute('href', '#');
    fireEvent.click(linkElement);

    expect(linkElement).toHaveAttribute('href', HREF_TO_BOT);
  });

  it('should handle case when command is not provided', () => {
    mockGetAndEncodeDataObject.mockReturnValue(undefined);
    renderTelegramButton({ command: undefined as unknown as TelegramScenario });

    const linkElement = getLinkElement();
    fireEvent.click(linkElement);

    expect(mockGetAndEncodeDataObject).toHaveBeenCalledWith(undefined);
    expect(linkElement).toHaveAttribute('href', '#');
  });

  it('should handle multiple clicks correctly', () => {
    mockGetAndEncodeDataObject.mockReturnValue('base64String');
    renderTelegramButton();

    const linkElement = getLinkElement();
    fireEvent.click(linkElement);
    expect(linkElement).toHaveAttribute('href', HREF_TO_BOT);
    fireEvent.click(linkElement);
    expect(linkElement).toHaveAttribute('href', HREF_TO_BOT);
  });

  it.each(testCasesForAriaSpan)(
    'should $shouldRender render AriaDescriptionUI correctly if ariaId=$ariaId and ariaDescription=$ariaDescription',
    ({ ariaId, ariaDescription, shouldRender }) => {
      renderTelegramButton({ ariaId, ariaDescription });

      if (shouldRender) {
        const ariaDescriptionElement = screen.getByTestId('aria-description-text');

        expect(ariaDescriptionElement).toBeInTheDocument();
        expect(ariaDescriptionElement).toHaveAttribute('id', ariaId);
        expect(ariaDescriptionElement).toHaveTextContent(ariaDescription);
      } else {
        expect(screen.queryByTestId('aria-description-text')).toBeNull();
      }
    },
  );
});
