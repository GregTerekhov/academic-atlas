import { IBenefitsItem } from 'types';
import { getBenefits } from 'helpers';

import { MappedListTemplate } from 'template';
import BenefitsItem from './benefits-item';

export default function BenefitsList() {
  const benefits = getBenefits();

  return (
    <MappedListTemplate<IBenefitsItem>
      items={benefits}
      className='flex justify-between max-lg:flex-wrap max-md:gap-6 md:max-lg:gap-y-6'
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
