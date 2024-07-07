'use client';

import { useState } from 'react';

interface IEncryptedData {
  command: 'order' | 'join';
  workType?: string;
  expertiseArea?: string;
  executionTime?: string;
  uniqueness?: number | undefined;
}

export const encodeTelegramData = () => {
  const [telegramData, setTelegramData] = useState<IEncryptedData | null>();

  const accumulateUserData = (data: IEncryptedData) => {
    setTelegramData(data);
  };

  const dataToString = JSON.stringify(telegramData);

  const encodeURI = encodeURIComponent(dataToString);
  const base64String = btoa(encodeURI);

  return { accumulateUserData, base64String };
};
