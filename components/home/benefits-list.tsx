import { BenefitLabel, IBenefitsItem, IconName } from 'types';

import BenefitsItem from './benefits-item';

export default function BenefitsList() {
  const benefits: IBenefitsItem[] = [
    {
      icon: IconName.Benefits1,
      label: BenefitLabel.Uniqueness,
    },
    {
      icon: IconName.Benefits2,
      label: BenefitLabel.Guarantee,
    },
    {
      icon: IconName.Benefits3,
      label: BenefitLabel.Correction,
    },
    {
      icon: IconName.Benefits4,
      label: BenefitLabel.Support,
    },
  ];
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
