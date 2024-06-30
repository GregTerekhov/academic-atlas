import { IBenefitsItem } from 'types';
import { getBenefits } from 'helpers';

import { MappedListTemplate } from 'template';
import BenefitsItem from './benefits-item';

export default function BenefitsList() {
  const benefits = getBenefits();

  return (
    <MappedListTemplate<IBenefitsItem>
      items={benefits}
      className='flex max-md:flex-wrap max-md:justify-center max-md:gap-6 md:justify-between'
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
