import { getSectionProps } from 'data';

import { SectionTemplate } from 'template';
import { PriceControlsDesktop, PriceControlsMobile } from './subcomponents';

export default function Cost() {
  const sectionProps = getSectionProps();
  const mainCostProps = sectionProps.homeCost;

  return (
    <SectionTemplate {...mainCostProps}>
      <PriceControlsDesktop />
      <PriceControlsMobile />
    </SectionTemplate>
  );
}
