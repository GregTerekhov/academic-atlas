import { PrimaryButtonLabel, SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Hero() {
  return (
    <SectionTemplate
      title={SectionTitle.Hero}
      isBigTitle
      titleStyle='md:w-[440px] lg:w-[550px]'
    >
      <p className='mb-6 mt-4 text-medium md:mb-8 md:mt-6 md:w-[440px] md:text-xl lg:mb-16 lg:w-[458px] lg:text-2xl'>
        Розпочніть шлях до успіху з нами — оформіть замовлення вже сьогодні
      </p>
      <PrimaryButtonUI>{PrimaryButtonLabel.Ordering}</PrimaryButtonUI>
    </SectionTemplate>
  );
}
