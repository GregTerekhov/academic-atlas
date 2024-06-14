import Image from 'next/image';

import { IServiceItem, WorkType } from 'types';

export default function ServiceItem({ imageSrc, imageAlt, serviceTitle }: Readonly<IServiceItem>) {
  return (
    <li className='relative h-[120px] w-[152px] overflow-hidden rounded-xl border border-accentSecondary p-2 align-bottom hocus:border-accentPrimary hocus:bg-whiteBase/10 md:w-[160px] lg:h-[307px] lg:w-[293px] lg:p-6'>
      <a
        href='#' //FIXME: --- add necessary link to backend
        className='flex h-full w-full flex-col justify-end'
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={152}
          height={80}
          className='absolute left-0 top-0 md:w-40 lg:h-[149px] lg:w-[293px]'
        />
        <h3 className='relative z-10 mb-2 mt-auto min-h-9 text-sm max-lg:text-whiteBase max-md:leading-130 lg:mb-4 lg:min-h-[66px] lg:text-lg'>
          {`${serviceTitle} ${serviceTitle === WorkType.Diplomas ? 'для коледжів, технікумів' : ''}`}
        </h3>
        <span className='text-base font-bold text-accentPrimary lg:text-xl'>Замовити</span>
      </a>
    </li>
  );
}
