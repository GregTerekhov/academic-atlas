import { getIdValues, getSectionProps } from 'helpers';

import { SectionTemplate } from 'template';
import { BenefitsList, StatisticList } from './subcomponents';

export default function AboutUs() {
  const { AboutUs } = getIdValues();
  const sectionProps = getSectionProps(undefined, AboutUs);
  const mainAboutProps = sectionProps.homeAbout;

  return (
    <SectionTemplate {...mainAboutProps}>
      <StatisticList />
      <BenefitsList />
    </SectionTemplate>
  );
}
