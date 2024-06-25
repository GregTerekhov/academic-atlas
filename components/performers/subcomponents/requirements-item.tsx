import { IRequirements, IconName, IconSize } from 'types';
import { SvgIconUI } from 'ui/index';

export default function RequirementsItem({ title, desc }: IRequirements) {
  return (
    <li
      key={title}
      className='flex flex-col items-center gap-x-6 rounded-[20px] border border-accentSecondary bg-whiteBase/10 p-4 lg:w-[400px] lg:gap-y-2'
    >
      <div className='mb-2 mr-auto flex items-center gap-x-4 lg:gap-x-2'>
        <SvgIconUI
          id={IconName.Requirements}
          size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
          className='fill-accentPrimary md:h-8 md:w-8 lg:h-10 lg:w-10'
        />
        <h3 className='text-medium font-bold text-accentPrimary md:text-big lg:text-xl'>{title}</h3>
      </div>
      <p className='generalText'>{desc}</p>
    </li>
  );
}
