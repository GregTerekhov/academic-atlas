import { IOrderStep, SectionTitle } from 'types';
import { getOrderSteps, getIdValues, imageSettings } from 'helpers';

import { MappedListTemplate, SectionTemplate } from 'template';
import { OverviewItem } from './subcomponents';
import { ImageUI } from 'ui';

// import { getOverviewImageStyles } from 'styles'; //FIXME: use this function

export default function ServiceOverview() {
  const orderSteps = getOrderSteps();
  const { Overview } = getIdValues();
  // const backgroundImageClass = getOverviewImageStyles(); //FIXME: use this const
  const { serviceOverview } = imageSettings;
  const { src, width, height, className } = serviceOverview;

  return (
    <SectionTemplate
      title={SectionTitle.HowItWorks}
      id={Overview ?? ''}
    >
      <div className='absolute left-1/2 top-0 hidden h-full w-full max-w-[232px] -translate-x-1/2 items-center justify-center bg-service-overview bg-cover bg-center bg-no-repeat opacity-50 dark:opacity-20 max-md:flex'></div>
      {/* FIXME: replace these styles on const backgroundImageClass */}
      <div className='gap-x-0 md:flex lg:gap-x-16'>
        <div className='hidden md:block'>
          <ImageUI
            src={src}
            alt=''
            width={width}
            height={height}
            className={className}
          />
        </div>
        <MappedListTemplate<IOrderStep>
          items={orderSteps}
          className='space-y-6 max-md:bg-center md:w-[430px] md:space-y-8 md:bg-left lg:w-[631px] lg:space-y-12'
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
