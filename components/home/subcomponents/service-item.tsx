import { type IServiceItem, PrimaryButtonLabel, WorkType } from 'types';
import { serviceImageSettings } from 'helpers';

import { ImageUI } from 'ui';

type ServiceItemProps = Omit<IServiceItem, 'id'>;

export default function ServiceItem({
  imageSrc,
  imageAlt,
  serviceTitle,
  priority = false,
}: Readonly<ServiceItemProps>) {
  const { width, height, className } = serviceImageSettings;
  return (
    <li className='blockItem group relative w-full overflow-hidden bg-whiteBase/10 hocus:border-transparent hocus:outline-none hocus:ring-[2px] hocus:ring-accentSecondary max-md:h-[120px] md:h-[280px]'>
      <a
        href='#' //FIXME: --- add necessary link to backend
        className='absolute flex h-full w-full flex-col justify-end '
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
