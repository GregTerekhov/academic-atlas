import { IconName, IconSize } from 'types';

import { SvgIconUI } from 'ui';

interface IOverviewItem {
  iconName: IconName;
  step: string;
}

export default function OverviewItem({ iconName, step }: Readonly<IOverviewItem>) {
  return (
    <li className='flex items-center gap-x-2 lg:gap-x-4'>
      <div className='flex items-center gap-x-4 md:gap-x-6 lg:gap-x-10'>
        <div className='relative flex h-[28px] w-[28px] items-center justify-center rounded-full bg-whiteBase/10 lg:h-10 lg:w-10'>
          <div className='absolute h-4 w-4 rounded-full bg-accentSecondary lg:h-6 lg:w-6'></div>
        </div>
        <SvgIconUI
          id={iconName}
          size={{ width: IconSize.L, height: IconSize.L }}
          className='lg:size-16'
        />
      </div>
      <p className='generalText'>{step}</p>
    </li>
  );
}
