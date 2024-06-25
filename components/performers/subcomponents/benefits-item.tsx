import { IPartnershipBenefits, IconSize } from 'types';
import { SvgIconUI } from 'ui/index';

export default function PartnershipBenefitsItem({ id, title, desc, iconId }: IPartnershipBenefits) {
  return (
    <li
      key={id}
      className='flex items-center rounded-2xl border border-accentSecondary bg-whiteBase/10 p-4 max-md:gap-x-6 md:flex-col md:gap-y-6 lg:gap-y-8'
    >
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
    </li>
  );
}
