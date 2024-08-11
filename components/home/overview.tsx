import { type IOrderStep } from 'types';
import { getOrderSteps, getSectionProps, imageSettings } from 'data';
import { getIdValues } from 'helpers';

import { MappedListTemplate, SectionTemplate } from 'template';
import { OverviewItem } from './subcomponents';
import { ImageUI } from 'ui';

import { getOverviewImageStyles } from 'styles';

export default function ServiceOverview() {
  const orderSteps = getOrderSteps();
  const { Overview } = getIdValues();
  const backgroundImageClass = getOverviewImageStyles();
  const { serviceOverview } = imageSettings;
  const { src, width, height, className } = serviceOverview;
  const sectionProps = getSectionProps(undefined, Overview);
  const mainOverviewProps = sectionProps.homeOverview;

  return (
    <SectionTemplate {...mainOverviewProps}>
      <div className={backgroundImageClass}></div>
      <div className='gap-x-0 md:flex lg:gap-x-16'>
        <div className='hidden md:block'>
          <ImageUI
            src={src}
            alt='overview'
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
