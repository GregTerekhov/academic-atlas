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
    <li className='blockItem bg-whiteBase/10 p-4 max-md:flex max-md:items-center max-md:gap-x-6 md:basis-1/3 md:space-y-6 md:text-center lg:space-y-8 lg:p-6'>
      <div className='max-md:size-10'>
        <SvgIconUI
          id={iconId}
          size={{ width: IconSize.HalfL, height: IconSize.HalfL }}
          className='mx-auto fill-accentPrimary-darker md:size-14 lg:size-20'
        />
      </div>
      <div className='text-start md:text-center'>
        <h3 className='mx-auto mb-2 text-medium font-bold max-sm:text-base md:mb-4 max-lg:md:w-[110px] lg:text-xl'>
          {title}
        </h3>
        <p className='generalText'>{desc}</p>
      </div>
    </li>
  );
}
