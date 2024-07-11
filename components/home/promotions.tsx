'use client';

import { CtaText, PrimaryButtonLabel, SectionTitle } from 'types';

import {
  createServiceObject,
  encodeTelegramData,
  getIdValues,
  IEncryptedData,
  imageSettings,
} from 'helpers';

import { SectionTemplate } from 'template';
import { ImageUI, PrimaryButtonUI } from 'ui';
import { useState } from 'react';

export default function Promotions() {
  const [getTelegramData, setGetTelegramData] = useState<IEncryptedData>();

  const universalDataObject = createServiceObject(getTelegramData);
  const base64String = encodeTelegramData(universalDataObject);

  const { promotions } = imageSettings;
  const { Promotions } = getIdValues();

  const { src, alt, width, height, className } = promotions;

  return (
    <SectionTemplate
      title={SectionTitle.Promotions}
      id={Promotions ?? ''}
      noAlignment='text-start'
      hasCtaText
      ctaStyle='md:w-[421px] lg:w-[572px]'
      ctaText={CtaText.MainPromotions}
    >
      <ImageUI
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
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
