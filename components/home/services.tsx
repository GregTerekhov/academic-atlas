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
      <MappedListTemplate<IServiceItem>
        items={serviceItems}
        className='max-md:space-y-4 md:grid md:grid-cols-3 md:grid-rows-3 md:gap-[17px] lg:gap-10'
      >
        {({ id, imageSrc, imageAlt, serviceTitle, priority }) => (
          <ServiceItem
            key={id}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            serviceTitle={serviceTitle}
            priority={priority}
          />
        )}
      </MappedListTemplate>
    </SectionTemplate>
  );
}
