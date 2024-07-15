import { IconName, IconSize } from 'types';

import { SvgIconUI } from 'ui';

interface IRequirementsItemProps {
  key?: string;
  title: string;
  desc: string;
}

export default function RequirementsItem({ title, desc }: IRequirementsItemProps) {
  return (
    <li className='blockItem space-y-2 p-4 backdrop-blur-lg dark:bg-whiteBase/10 md:max-lg:space-y-4 lg:basis-1/3 lg:p-6'>
      <div className='flex items-center gap-x-2'>
        <div className='max-md:size-6'>
          <SvgIconUI
            id={IconName.Requirements}
            size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
            className='fill-whiteBase dark:fill-accentSecondary md:size-8 lg:size-10'
          />
        </div>
        <h3 className='text-medium font-bold text-whiteBase dark:text-accentSecondary max-sm:text-base md:text-big lg:text-xl'>
          {title}
        </h3>
      </div>
      <p className='generalText'>{desc}</p>
    </li>
  );
}
