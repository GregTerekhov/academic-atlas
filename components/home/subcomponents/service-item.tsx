'use client';

import {
  type IServiceItem,
  AriaDescription,
  AriaId,
  PrimaryButtonLabel,
  TelegramScenario,
  WorkType,
} from 'types';
import { serviceImageSettings } from 'data';
import { getAndEncodeDataObject } from 'helpers';

import { AriaDescriptionUI, ImageUI } from 'ui';

import { getServiceItemStyles, getWorkTypeTitleStyles } from 'styles';

type ServiceItemProps = Omit<IServiceItem, 'id'>;

export default function ServiceItem({
  imageSrc,
  imageAlt,
  serviceTitle,
  priority = false,
}: Readonly<ServiceItemProps>) {
  const { width, height, className } = serviceImageSettings;

  const base64String = getAndEncodeDataObject(TelegramScenario.Order, serviceTitle);
  const linkHref = base64String ? `https://t.me/AcademicAtlasBot?start=${base64String}` : '#';

  const itemClass = getServiceItemStyles();
  const titleClass = getWorkTypeTitleStyles();

  return (
    <li className={itemClass}>
      <a
        target='_blank'
        href={linkHref}
        rel='noopener noreferrer'
        aria-describedby={AriaId.Service}
        className='relative flex h-full w-full flex-col justify-end'
      >
        <div className='absolute z-10 h-full w-full bg-darkBase/50'></div>
        <ImageUI
          src={imageSrc}
          alt={imageAlt}
          width={width}
          height={height}
          className={className}
          priority={priority}
        />
        <div className='relative z-20 rounded-b-[20px] p-3 lg:p-6'>
          <div className='max-md:flex max-md:min-h-[70px] max-md:items-center max-md:justify-between'>
            <h3 className={titleClass}>
              {`${serviceTitle} ${serviceTitle === WorkType.Diplomas ? 'та коледжів' : ''}`}
            </h3>
            <span className='text-big font-bold text-whiteBase group-hover:text-accentSecondary max-sm:text-medium md:text-lg lg:text-xl'>
              {PrimaryButtonLabel.Ordering}
            </span>
          </div>
        </div>
      </a>
      <AriaDescriptionUI
        id={AriaId.Service}
        description={AriaDescription.Service}
      />
    </li>
  );
}
