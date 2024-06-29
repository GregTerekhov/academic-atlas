import { IconName, IconSize } from 'types';
import { SvgIconUI } from 'ui';

interface IPartnershipBenefitsItemProps {
  title: string;
  desc: string;
  iconId: IconName;
}

export default function PartnershipBenefitsItem({
  title,
  desc,
  iconId,
}: IPartnershipBenefitsItemProps) {
  return (
    <li className='rounded-2xl border border-accentSecondary bg-whiteBase/10 p-4 max-md:flex max-md:items-center max-md:gap-x-6 md:basis-1/3 md:space-y-6 md:text-center lg:space-y-8 lg:rounded-[20px] lg:p-6'>
      <SvgIconUI
        id={iconId}
        size={{ width: IconSize.L, height: IconSize.L }}
        className='mx-auto fill-accentSecondary-darker md:size-14 lg:size-20'
      />
      <div className='text-start md:text-center'>
        <h3 className='mx-auto mb-2 text-medium font-bold md:mb-4 max-lg:md:w-[110px] lg:text-xl'>
          {title}
        </h3>
        <p className='generalText'>{desc}</p>
      </div>
    </li>
  );
}
