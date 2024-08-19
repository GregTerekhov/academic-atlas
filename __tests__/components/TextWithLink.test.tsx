import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { TelegramScenario } from 'types';
import { getAndEncodeDataObject } from 'helpers';
import TelegramButton from 'components/telegram-text-link';

jest.mock('helpers', () => ({
  getAndEncodeDataObject: jest.fn(),
}));

describe('TextWithLink Component', () => {
  const mockTextWithLink = 'Click here to use Telegram-бот for further assistance.';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the TextWithLink component correctly', () => {
    render(
      <TelegramButton
        order={TelegramScenario.Order}
        textWithLink={mockTextWithLink}
      />,
    );

    const linkElement = screen.getByText('Telegram-бот');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '#');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should update the href attribute and create the base64String correctly when clicking on the link', async () => {
    (getAndEncodeDataObject as jest.Mock).mockReturnValue('mockedBase64String');

    render(
      <TelegramButton
        order={TelegramScenario.Order}
        textWithLink={mockTextWithLink}
      />,
    );

    const linkElement = screen.getByText('Telegram-бот');
    fireEvent.click(linkElement);

    await waitFor(() => {
      const expectedHref = 'https://t.me/AcademicAtlasBot?start=mockedBase64String';

      expect(linkElement).toHaveAttribute('href', expectedHref);
    });

    expect(getAndEncodeDataObject).toHaveBeenCalledWith(TelegramScenario.Order);
  });

  it('should prevent default and not update the href attribute if getAndEncodeDataObject returns undefined', async () => {
    (getAndEncodeDataObject as jest.Mock).mockReturnValue(undefined);

    render(
      <TelegramButton
        order={'' as TelegramScenario}
        textWithLink={mockTextWithLink}
      />,
    );

    const linkElement = screen.getByText('Telegram-бот');
    fireEvent.click(linkElement);

    await waitFor(() => {
      expect(linkElement).toHaveAttribute('href', '#');
    });

    expect(getAndEncodeDataObject).toHaveBeenCalledWith('');
  });
});
