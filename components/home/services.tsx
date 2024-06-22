import { SectionTitle } from 'types';

import { getServices, idValues } from 'helpers';

import { SectionTemplate } from 'template';
import { ServiceItem } from './subcomponents';

export default function Services() {
  const serviceItems = getServices();

  return (
    <SectionTemplate
      title={SectionTitle.OurServices}
      id={idValues.Services ?? ''}
    >
      <ul className='max-sm:space-y-4 sm:flex sm:flex-wrap sm:justify-between sm:gap-y-6 md:gap-y-4 lg:gap-y-9'>
        {Array.isArray(serviceItems) &&
          serviceItems.map(({ imageSrc, imageAlt, serviceTitle }) => (
            <ServiceItem
              key={serviceTitle}
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              serviceTitle={serviceTitle}
            />
          ))}
      </ul>
    </SectionTemplate>
  );
}
