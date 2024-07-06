import { type IBenefitsItem, IconSize } from 'types';

import { SvgIconUI } from 'ui';

export default function BenefitsItem({ iconName, label }: Omit<IBenefitsItem, 'id'>) {
  return (
    <li className='w-[149px] space-y-4 text-center md:space-y-6 md:max-lg:basis-1/2 lg:w-[232px] lg:space-y-8'>
      <SvgIconUI
        id={iconName}
        className='mx-auto fill-accentPrimary-darker md:size-14 lg:size-20'
        size={{ width: IconSize.L, height: IconSize.L }}
      />
      <p className='text-medium md:text-big lg:text-2xl'>{label}</p>
    </li>
  );
}
