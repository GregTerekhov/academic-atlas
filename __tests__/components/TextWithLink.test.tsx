import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { TelegramScenario } from 'types';
import { getAndEncodeDataObject } from 'helpers';
import TextWithLink from 'components/telegram-text-link';

jest.mock('helpers', () => ({
  getAndEncodeDataObject: jest.fn(),
}));

jest.spyOn(React, 'useEffect').mockImplementationOnce(() => {});

const MockParentComponent = ({ ariaHidden }: { ariaHidden: boolean }) => (
  <TextWithLink
    order={TelegramScenario.Join}
    textWithLink='Click here to use Telegram-бот for further assistance.'
    ariaHidden={ariaHidden}
  />
);

describe('TextWithLink Component', () => {
  const mockGetAndEncodeDataObject = getAndEncodeDataObject as jest.Mock;
  const mockTextWithLink = 'Click here to use Telegram-бот for further assistance.';

  const renderTelegramButton = (order: TelegramScenario, ariaHidden = false) =>
    render(
      <TextWithLink
        order={order}
        textWithLink={mockTextWithLink}
        ariaHidden={ariaHidden}
      />,
    );

  const getLinkElement = () => screen.getByText('Telegram-бот');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render plain text for Telegram-бот before client-side rendering', () => {
    const { container } = renderTelegramButton(TelegramScenario.Join);

    expect(container.textContent).toContain('Telegram-бот');
    expect(container.querySelector('a')).toBeNull();
  });

  it('should update the rendered link after client-side rendering', async () => {
    const { container } = renderTelegramButton(TelegramScenario.Join);

    await waitFor(() => {
      const linkElement = container.querySelector('a');
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', '#');
    });
  });

  it('should render the TextWithLink component correctly', () => {
    renderTelegramButton(TelegramScenario.Order);

    const linkElement = getLinkElement();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '#');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should update the href attribute and create the base64String correctly when clicking on the link', async () => {
    mockGetAndEncodeDataObject.mockReturnValue('mockedBase64String');

    renderTelegramButton(TelegramScenario.Order);

    const linkElement = getLinkElement();
    fireEvent.click(linkElement);

    await waitFor(() => {
      const expectedHref = 'https://t.me/AcademicAtlasBot?start=mockedBase64String';

      expect(linkElement).toHaveAttribute('href', expectedHref);
    });

    expect(getAndEncodeDataObject).toHaveBeenCalledWith(TelegramScenario.Order);
  });

  it('should prevent default and not update the href attribute if getAndEncodeDataObject returns undefined', async () => {
    mockGetAndEncodeDataObject.mockReturnValue(undefined);

    renderTelegramButton('' as TelegramScenario);

    const linkElement = getLinkElement();
    fireEvent.click(linkElement);

    await waitFor(() => {
      expect(linkElement).toHaveAttribute('href', '#');
    });

    expect(getAndEncodeDataObject).toHaveBeenCalledWith('');
  });

  it('should set tabIndex to -1 when ariaHidden true', () => {
    render(<MockParentComponent ariaHidden={true} />);
    const linkElement = screen.getByText('Telegram-бот');
    expect(linkElement).toHaveAttribute('tabIndex', '-1');
  });

  it('should set tabIndex to 0 when ariaHidden false', () => {
    render(<MockParentComponent ariaHidden={false} />);
    const linkElement = screen.getByText('Telegram-бот');
    expect(linkElement).toHaveAttribute('tabIndex', '0');
  });
});
