import Image from 'next/image';

import { type IServiceItem, WorkType } from 'types';

type ServiceItemProps = Omit<IServiceItem, 'id'>;

export default function ServiceItem({
  imageSrc,
  imageAlt,
  serviceTitle,
  gridPosition,
}: Readonly<ServiceItemProps>) {
  return (
    <li
      className={`${gridPosition} group relative w-full overflow-hidden rounded-xl border border-accentSecondary hocus:border-transparent hocus:bg-whiteBase/10 hocus:outline-none hocus:ring-[2px] hocus:ring-accentPrimary max-md:h-[120px]`}
    >
      {' '}
      {/*OLD_STYLES: className={`${gridPosition} group relative w-full overflow-hidden rounded-xl border border-accentSecondary hocus:border-transparent hocus:bg-whiteBase/10 hocus:outline-none hocus:ring-[2px] hocus:ring-accentPrimary max-md:h-[120px] sm:max-md:w-[152px] lg:h-[307px] lg:w-[293px]`} */}
      <a
        href='#' //FIXME: --- add necessary link to backend
        className='flex h-full w-full flex-col justify-end'
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={152}
          height={80}
          className='absolute top-0 w-full object-cover max-sm:h-auto md:h-full'
        />
        {/*OLD_STYLES: className='absolute top-0 h-20 w-full max-sm:h-auto max-sm:object-cover md:h-full md:w-full md:max-lg:object-cover lg:h-[149px] lg:w-[293px]' */}
        <div className='p-2 lg:p-6'>
          <div className='max-lg:p-1 max-lg:backdrop-blur-[2px]'>
            <h3 className='relative mb-2 mt-auto text-medium group-hover:underline max-lg:text-whiteBase sm:min-h-9 md:text-big lg:mb-4 lg:text-xl'>
              {`${serviceTitle} ${serviceTitle === WorkType.Diplomas ? 'та коледжів' : ''}`}
            </h3>
            <span className='relative text-base font-bold text-whiteBase group-hover:text-accentPrimary md:text-lg lg:text-xl'>
              Замовити
            </span>
          </div>
        </div>
      </a>
    </li>
  );
}
