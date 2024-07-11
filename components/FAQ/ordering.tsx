'use client';

import { PrimaryButtonLabel, CtaText, SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import { createServiceObject, encodeTelegramData, IEncryptedData } from 'helpers';
import { useState } from 'react';

export default function Ordering() {
  const [getTelegramData, setGetTelegramData] = useState<IEncryptedData>();

  const universalDataObject = createServiceObject(getTelegramData);
  const base64String = encodeTelegramData(universalDataObject);

  return (
    <SectionTemplate
      title={SectionTitle.FAQOrder}
      hasCtaText
      ctaText={CtaText.FAQOrder}
      ctaStyle='text-center max-md:px-3 md:max-lg:px-[15px]'
    >
      <a
        href={`https://t.me/AcademicAtlasBot?start=${base64String}`}
        target='blank'
        rel='noopener noreferrer'
        onClick={() => {
          setGetTelegramData({ command: 'order' });
        }}
        className='flex items-center justify-center'
      >
        <PrimaryButtonUI>{PrimaryButtonLabel.Ordering}</PrimaryButtonUI>
      </a>
    </SectionTemplate>
  );
}
