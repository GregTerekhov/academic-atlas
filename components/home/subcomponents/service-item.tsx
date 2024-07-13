'use client';

import { type IServiceItem, PrimaryButtonLabel, WorkType } from 'types';
import { getAndEncodeDataObject, serviceImageSettings } from 'helpers';

import { ImageUI } from 'ui';
// import { TelegramLinkTemplate } from 'template/index';

type ServiceItemProps = Omit<IServiceItem, 'id'>;

export default function ServiceItem({
  imageSrc,
  imageAlt,
  serviceTitle,
  priority = false,
}: Readonly<ServiceItemProps>) {
  const { width, height, className } = serviceImageSettings;

  const handleLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const base64String = getAndEncodeDataObject('order', serviceTitle);

    if (!base64String) {
      e.preventDefault();
      return;
    }

    e.currentTarget.href = `https://t.me/AcademicAtlasBot?start=${base64String}`;
  };

  // const typeOfWorks = getWorkTypeKeys(serviceTitle);

  return (
    <li className='group blockItem relative w-full overflow-hidden bg-whiteBase/10 hocus:border-transparent hocus:outline-none hocus:ring-[2px] hocus:ring-accentSecondary max-md:h-[180px] md:h-[280px]'>
      <a
        target='_blank'
        href='#'
        rel='noopener noreferrer'
        onClick={handleLinkClick}
        aria-label={`Посилання на телеграм-бот для замовлення типа послуг ${serviceTitle}`}
        className='flex h-full w-full flex-col justify-end'
      >
        <ImageUI
          src={imageSrc}
          alt={imageAlt}
          width={width}
          height={height}
          className={className}
          priority={priority}
        />
        <div className='relative bg-darkBase/70 p-3 backdrop-blur-sm dark:bg-darkBase/50 lg:p-6'>
          <div className='max-md:flex max-md:min-h-[70px] max-md:items-center max-md:justify-between'>
            <h3 className='text-balance text-medium text-whiteBase group-hover:underline max-sm:w-[108px] max-sm:text-base sm:max-md:w-[170px] md:mb-2 md:min-h-[100px] md:text-big lg:mb-4 lg:min-h-20 lg:text-lg'>
              {`${serviceTitle} ${serviceTitle === WorkType.Diplomas ? 'та коледжів' : ''}`}
            </h3>
            <span className='text-big font-bold text-whiteBase group-hover:text-accentSecondary max-sm:text-medium md:text-lg lg:text-xl'>
              {PrimaryButtonLabel.Ordering}
            </span>
          </div>
        </div>
      </TelegramLinkTemplate>
    </li>
  );
}
