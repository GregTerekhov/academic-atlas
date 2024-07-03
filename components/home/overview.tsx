import { IOrderStep, SectionTitle } from 'types';

import { getOrderSteps, getIdValues, imageSettings } from 'helpers';

import { MappedListTemplate, SectionTemplate } from 'template';
import { OverviewItem } from './subcomponents';
import { ImageUI } from 'ui';

export default function ServiceOverview() {
  const orderSteps = getOrderSteps();
  const { Overview } = getIdValues();
  const { serviceOverview } = imageSettings;
  const { src, alt, width, height, className } = serviceOverview;

  return (
    <SectionTemplate
      title={SectionTitle.HowItWorks}
      id={Overview ?? ''}
    >
      <div className='top-5 flex h-full w-full items-center max-lg:bg-service-overview max-md:absolute max-md:bg-center max-md:bg-no-repeat max-md:opacity-20'></div>
      <div className='gap-x-0 md:flex lg:gap-x-16'>
        <div className='hidden md:block'>
          <ImageUI
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
          />
        </div>
        <MappedListTemplate<IOrderStep>
          items={orderSteps}
          className='space-y-6 max-md:bg-center max-md:px-2 md:w-[430px] md:space-y-8 md:bg-left lg:w-[631px] lg:space-y-12'
        >
          {({ id, step, iconName }) => (
            <OverviewItem
              key={id}
              step={step}
              iconName={iconName}
            />
          )}
        </MappedListTemplate>
      </div>
    </SectionTemplate>
  );
}
