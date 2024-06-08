import { SectionTemplate } from 'template';
import { SectionTitle } from 'types/sectionTitle';
// import { SvgIconUI } from 'ui';

export default function ServiceOverview() {
  return (
    <SectionTemplate title={SectionTitle.HowItWorks}>
      <p>Як працює сервіс</p>

      {/* <SvgIconUI />
      <SvgIconUI />
      <SvgIconUI />
      <SvgIconUI /> */}
    </SectionTemplate>
  );
}
