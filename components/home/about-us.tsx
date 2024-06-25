import { SectionTitle } from 'types';
import { idValues } from 'helpers';
import { SectionTemplate } from 'template';
import { BenefitsList, StatisticList } from './subcomponents';

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
