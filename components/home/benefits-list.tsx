import { getBenefits } from 'helpers';

import BenefitsItem from './benefits-item';

export default function BenefitsList() {
  const benefits = getBenefits();

  return (
    <ul className='flex max-md:flex-wrap max-md:justify-center max-md:gap-6 md:justify-between'>
      {Array.isArray(benefits) &&
        benefits.map(({ icon, label }) => (
          <BenefitsItem
            key={label}
            icon={icon}
            label={label}
          />
        ))}
    </ul>
  );
}
