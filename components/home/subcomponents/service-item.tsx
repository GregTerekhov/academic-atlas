import Image from 'next/image';

import { IServiceItem, WorkType } from 'types';

export default function ServiceItem({ imageSrc, imageAlt, serviceTitle }: Readonly<IServiceItem>) {
  return (
    //FIXME: --- add responsive width for li on small devices
    <li className='relative h-[120px] overflow-hidden rounded-xl border border-accentSecondary hocus:border-transparent hocus:bg-whiteBase/10 hocus:outline-none hocus:ring-[2px] hocus:ring-accentPrimary max-md:w-[152px] md:w-[160px] lg:h-[307px] lg:w-[293px]'>
      <a
        href='#' //FIXME: --- add necessary link to backend
        className='flex h-full w-full flex-col justify-end'
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={152}
          height={80}
          className='absolute top-0 w-full md:w-40 lg:h-[149px] lg:w-[293px]'
        />
        <div className='p-2 lg:p-6'>
          <h3 className='relative mb-2 mt-auto min-h-9 text-sm max-lg:text-whiteBase max-md:leading-130 lg:mb-4 lg:min-h-[66px] lg:text-lg'>
            {`${serviceTitle} ${serviceTitle === WorkType.Diplomas ? 'для коледжів, технікумів' : ''}`}
          </h3>
          <span className='text-base font-bold text-accentPrimary lg:text-xl'>Замовити</span>
        </div>
      </a>
    </li>
  );
}
