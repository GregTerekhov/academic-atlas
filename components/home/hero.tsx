'use client';

import { CtaText, PrimaryButtonLabel, SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import { createServiceObject, encodeTelegramData, IEncryptedData } from 'helpers';
import { useState } from 'react';

export default function Hero() {
  const [getTelegramData, setGetTelegramData] = useState<IEncryptedData>();

  const universalDataObject = createServiceObject(getTelegramData);
  const base64String = encodeTelegramData(universalDataObject);

  return (
    <SectionTemplate
      title={SectionTitle.Hero}
      isBigTitle
      titleStyle='md:w-[440px] lg:w-[550px]'
      hasCtaText
      ctaStyle='md:w-[440px] lg:w-[458px]'
      ctaText={CtaText.MainHero}
      priority
    >
      <a
        href={`https://t.me/AcademicAtlasBot?start=${base64String}`}
        target='blank'
        rel='noopener noreferrer'
        onClick={() => {
          setGetTelegramData({ command: 'order' });
        }}
      >
        <PrimaryButtonUI>{PrimaryButtonLabel.Ordering}</PrimaryButtonUI>
      </a>
    </SectionTemplate>
  );
}
