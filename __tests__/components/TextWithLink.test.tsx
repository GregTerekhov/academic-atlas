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
    text='Click here to use Telegram-бот for further assistance.'
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
        text={mockTextWithLink}
        ariaHidden={ariaHidden}
      />,
    );

  const getLinkElement = () => screen.getByText('Telegram-бот');

  const testBase64String = [
    {
      order: TelegramScenario.Order,
      expectedHref: 'https://t.me/AcademicAtlasBot?start=mockedBase64String',
      returnValue: 'mockedBase64String',
    },
    {
      order: '' as TelegramScenario,
      expectedHref: '#',
      returnValue: undefined,
    },
  ];

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
      expect(linkElement).toHaveAttribute('target', '_blank');
      expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it.each(testBase64String)(
    'should update href and create base64String correctly on click (order: $order)',
    async ({ order, expectedHref, returnValue }) => {
      mockGetAndEncodeDataObject.mockReturnValue(returnValue);

      renderTelegramButton(order);

      const linkElement = getLinkElement();
      fireEvent.click(linkElement);

      await waitFor(() => {
        expect(linkElement).toHaveAttribute('href', expectedHref);
      });

      expect(getAndEncodeDataObject).toHaveBeenCalledWith(order);
    },
  );

  it.each([
    { ariaHidden: true, expectedTabIndex: '-1' },
    { ariaHidden: false, expectedTabIndex: '0' },
  ])(
    'should set tabIndex to $expectedTabIndex when ariaHidden is $ariaHidden',
    ({ ariaHidden, expectedTabIndex }) => {
      render(<MockParentComponent ariaHidden={ariaHidden} />);

      const linkElement = getLinkElement();
      expect(linkElement).toHaveAttribute('tabIndex', expectedTabIndex);
    },
  );
});
