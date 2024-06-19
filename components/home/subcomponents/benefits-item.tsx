import { IBenefitsItem, IconSize } from 'types';

import { SvgIconUI } from 'ui';

export default function BenefitsItem({ icon, label }: IBenefitsItem) {
  return (
    //FIXME: --- add responsive width for li on small devices
    <li className='w-[135px] space-y-4 text-center md:w-[154px] md:space-y-6 lg:w-[230px] lg:space-y-8'>
      <SvgIconUI
        id={icon}
        className='mx-auto md:size-14 lg:size-20'
        size={{ width: IconSize.L, height: IconSize.L }}
      />
      <p className='text-medium md:text-big lg:text-2xl'>{label}</p>
    </li>
  );
}
