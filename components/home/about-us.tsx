import { SectionTitle } from 'types';

import { getIdValues } from 'helpers';
import { SectionTemplate } from 'template';
import { BenefitsList, StatisticList } from './subcomponents';

export default function AboutUs() {
  const { AboutUs } = getIdValues();
  return (
    <SectionTemplate
      title={SectionTitle.AboutUs}
      id={AboutUs ?? ''}
    >
      <StatisticList />
      <BenefitsList />
    </SectionTemplate>
  );
}
