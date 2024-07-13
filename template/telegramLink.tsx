'use client';

import { createServiceObject, encodeTelegramData, IEncryptedData } from 'helpers';
import { useState } from 'react';

interface ITelegramLink {
  telegramBotData: IEncryptedData;
  children: React.ReactNode;
  className?: string;
}

const TelegramLink = ({ telegramBotData, children, className }: ITelegramLink) => {
  const [getTelegramData, setGetTelegramData] = useState<IEncryptedData>();

  const universalDataObject = createServiceObject(getTelegramData);
  const base64String = encodeTelegramData(universalDataObject);

  return (
    <a
      href={`https://t.me/AcademicAtlasBot?start=${base64String}`}
      target='blank'
      rel='noopener noreferrer'
      onClick={() => {
        setGetTelegramData(telegramBotData);
      }}
      className={className}
    >
      {children}
    </a>
  );
};

export default TelegramLink;
