'use client';

import { type IServiceItem, PrimaryButtonLabel, WorkType } from 'types';
import {
  createServiceObject,
  encodeTelegramData,
  getWorkTypeKeys,
  IEncryptedData,
  serviceImageSettings,
} from 'helpers';

import { ImageUI } from 'ui';
import { useState } from 'react';

type ServiceItemProps = Omit<IServiceItem, 'id'>;

export default function ServiceItem({
  imageSrc,
  imageAlt,
  serviceTitle,
  priority = false,
}: Readonly<ServiceItemProps>) {
  const { width, height, className } = serviceImageSettings;

  const [getTelegramData, setGetTelegramData] = useState<IEncryptedData>();
  const setTypeOfWorks = getWorkTypeKeys(serviceTitle);

  const universalDataObject = createServiceObject(getTelegramData);
  const base64String = encodeTelegramData(universalDataObject);

  return (
    <li className='group blockItem relative w-full overflow-hidden bg-whiteBase/10 hocus:border-transparent hocus:outline-none hocus:ring-[2px] hocus:ring-accentSecondary max-md:h-[120px] md:h-[280px]'>
      <a
        href={`https://t.me/AcademicAtlasBot?start=${base64String}`}
        target='blank'
        rel='noopener noreferrer'
        className='absolute flex h-full w-full flex-col justify-end'
        onClick={() => {
          setGetTelegramData({ command: 'order', workType: setTypeOfWorks });
        }}
      >
        <ImageUI
          src={imageSrc}
          alt={imageAlt}
          width={width}
          height={height}
          className={className}
          priority={priority}
        />
        <div className='relative bg-darkBase/50 p-2 lg:p-6'>
          <div className='max-lg:p-1 max-lg:backdrop-blur-[2px]'>
            <h3 className='mb-2 mt-auto min-h-9 text-medium text-whiteBase group-hover:underline md:min-h-[90px] md:text-big lg:mb-4 lg:text-xl'>
              {`${serviceTitle} ${serviceTitle === WorkType.Diplomas ? 'та коледжів' : ''}`}
            </h3>
            <span className='text-base font-bold text-whiteBase group-hover:text-accentSecondary md:text-lg lg:text-xl'>
              {PrimaryButtonLabel.Ordering}
            </span>
          </div>
        </div>
      </a>
    </li>
  );
}
