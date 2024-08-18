'use client';

import { useEffect, useState } from 'react';

import { TelegramScenario } from 'types';
import { getAndEncodeDataObject } from 'helpers';

interface ITextWithLinkProps {
  order: TelegramScenario;
  textWithLink: string;
}

export default function TextWithLink({ order, textWithLink }: ITextWithLinkProps) {
  const [clientRendered, setClientRendered] = useState(false);

  useEffect(() => {
    setClientRendered(true);
  }, []);

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const base64String = getAndEncodeDataObject(order);

    if (!base64String) {
      e.preventDefault();
      return;
    }

    e.currentTarget.href = `https://t.me/AcademicAtlasBot?start=${base64String}`;
  };

  const parts = textWithLink.split('Telegram-бот');

  return (
    <span>
      {parts[0]}
      {clientRendered ? (
        <a
          href='#'
          target='_blank'
          rel='noopener noreferrer'
          className='text-accentPrimary hocus:underline dark:text-accentSecondary'
          onClick={handleClick}
        >
          Telegram-бот
        </a>
      ) : (
        'Telegram-бот'
      )}
      {parts[1]}
    </span>
  );
}
