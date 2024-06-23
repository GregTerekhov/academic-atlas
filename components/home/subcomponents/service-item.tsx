import Image from 'next/image';

import { IServiceItem, WorkType } from 'types';

export default function ServiceItem({ imageSrc, imageAlt, serviceTitle }: Readonly<IServiceItem>) {
  return (
    //TODO: --- propose to accept this variant of the cards separation on small screens
    <li className='group relative h-[120px] w-full overflow-hidden rounded-xl border border-accentSecondary hocus:border-transparent hocus:bg-whiteBase/10 hocus:outline-none hocus:ring-[2px] hocus:ring-accentPrimary sm:max-md:w-[152px] md:w-[160px] lg:h-[307px] lg:w-[293px]'>
      <a
        href='#' //FIXME: --- add necessary link to backend
        className='flex h-full w-full flex-col justify-end'
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={152}
          height={80}
          className='absolute top-0 max-sm:h-auto max-sm:w-full max-sm:object-cover md:h-auto md:w-40 lg:h-auto lg:w-[293px]'
        />
        <div className='p-2 lg:p-6'>
          <div className='max-md:backdrop-blur-sm max-sm:p-1'>
            <h3 className='relative mb-2 mt-auto text-sm group-hover:underline max-lg:text-whiteBase max-md:leading-130 sm:min-h-9 lg:mb-4 lg:min-h-[66px] lg:text-lg'>
              {`${serviceTitle} ${serviceTitle === WorkType.Diplomas ? 'для коледжів, технікумів' : ''}`}
            </h3>
            <span className='relative text-base font-bold text-whiteBase group-hover:text-accentPrimary lg:text-xl'>
              Замовити
            </span>
          </div>
        </div>
      </a>
    </li>
  );
}
