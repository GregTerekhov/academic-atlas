import Image from 'next/image';

import { SectionTitle } from 'types';

import { getOrderSteps, idValues } from 'helpers';

import { SectionTemplate } from 'template';
import { OverviewItem } from './subcomponents';

export default function ServiceOverview() {
  const orderSteps = getOrderSteps();
  return (
    <SectionTemplate
      title={SectionTitle.HowItWorks}
      id={idValues.Overview ?? ''}
    >
      <div className='flex items-center max-lg:bg-opacity-75 max-lg:bg-service-overview max-lg:bg-no-repeat md:max-lg:justify-end md:max-lg:bg-contain lg:justify-center lg:gap-x-16'>
        <div className='hidden lg:block'>
          <Image
            src='/backgroundImage/service-overview.webp'
            alt='A sheet of paper and a magnifying glass'
            width={402}
            height={512}
          />
        </div>
        <ul className='space-y-6 max-md:bg-center max-md:px-2 md:w-[430px] md:space-y-8 md:bg-left lg:w-[631px] lg:space-y-12'>
          {Array.isArray(orderSteps) &&
            orderSteps.map(({ id, step, iconName }) => (
              <OverviewItem
                key={id}
                step={step}
                iconName={iconName}
              />
            ))}
        </ul>
      </div>
    </SectionTemplate>
  );
}
