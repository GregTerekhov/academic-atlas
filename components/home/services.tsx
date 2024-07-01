import { IServiceItem, SectionTitle } from 'types';

import { getServices, getIdValues } from 'helpers';

import { MappedListTemplate, SectionTemplate } from 'template';
import { ServiceItem } from './subcomponents';

export default function Services() {
  const serviceItems = getServices();
  const { Services } = getIdValues();

  return (
    <SectionTemplate
      title={SectionTitle.OurServices}
      id={Services ?? ''}
    >
      {/* OLD_STYLES className='max-sm:space-y-4 sm:max-md:flex sm:max-md:flex-wrap sm:max-md:justify-between sm:max-md:gap-y-6 md:gap-6 md:max-lg:grid md:max-lg:grid-cols-4 md:max-lg:grid-rows-4 lg:flex lg:flex-wrap lg:gap-9'*/}
      <MappedListTemplate<IServiceItem>
        items={serviceItems}
        className='max-md:space-y-4 md:grid md:grid-cols-4 md:grid-rows-4 md:gap-6 lg:gap-9'
      >
        {({ id, imageSrc, imageAlt, serviceTitle, gridPosition }) => (
          <ServiceItem
            key={id}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            serviceTitle={serviceTitle}
            gridPosition={gridPosition}
          />
        )}
      </MappedListTemplate>
    </SectionTemplate>
  );
}
