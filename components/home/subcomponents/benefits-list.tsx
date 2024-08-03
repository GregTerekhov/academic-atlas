import { type IBenefitsItem } from 'types';
import { getBenefits } from 'helpers';

import { MappedListTemplate } from 'template';
import BenefitsItem from './benefits-item';

export default function BenefitsList() {
  const benefits = getBenefits();

  return (
    <MappedListTemplate<IBenefitsItem>
      items={benefits}
      className='max-lg:grid max-lg:grid-cols-2 max-lg:max-md:gap-6 md:max-lg:gap-y-6 lg:flex lg:justify-between'
    >
      {({ id, iconName, label }) => (
        <BenefitsItem
          key={id}
          iconName={iconName}
          label={label}
        />
      )}
    </MappedListTemplate>
  );
}
