import { IconName, IconSize } from 'types';

import { SvgIconUI } from 'ui';

interface IRequirementsItemProps {
  key?: string;
  title: string;
  desc: string;
}

export default function RequirementsItem({ title, desc }: IRequirementsItemProps) {
  return (
    <li className='rounded-[20px] border border-accentSecondary bg-whiteBase/10 p-4 lg:basis-1/3 lg:p-6'>
      <div className='mb-2 mr-auto flex items-center gap-x-4 lg:gap-x-2'>
        <SvgIconUI
          id={IconName.Requirements}
          size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
          className='fill-accentPrimary md:size-8 lg:size-10'
        />
        <h3 className='text-medium font-bold text-accentPrimary md:text-big lg:text-xl'>{title}</h3>
      </div>
      <p className='generalText'>{desc}</p>
    </li>
  );
}
