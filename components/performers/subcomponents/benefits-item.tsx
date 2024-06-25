import { IconName, IconSize } from 'types';
import { SvgIconUI } from 'ui/index';

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
    <>
      <div>
        <SvgIconUI
          id={iconId}
          size={{ width: IconSize.L, height: IconSize.L }}
          className='md:h-14 md:w-14 lg:h-20 lg:w-20'
        />
      </div>
      <div className='text-start md:text-center'>
        <h3 className='mx-auto mb-2 text-medium font-bold md:mb-4 max-lg:md:w-[110px] lg:text-xl'>
          {title}
        </h3>
        <p className='generalText'>{desc}</p>
      </div>
    </>
  );
}
