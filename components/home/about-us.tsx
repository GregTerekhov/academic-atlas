import { SectionTitle } from 'types';

import { idValues } from 'helpers';

import { SectionTemplate } from 'template';
import StatisticList from './statistic-list';
import BenefitsList from './benefits-list';

export default function AboutUs() {
  return (
    <SectionTemplate
      title={SectionTitle.AboutUs}
      id={idValues.AboutUs ?? ''}
    >
      <StatisticList />
      <BenefitsList />
    </SectionTemplate>
  );
}
