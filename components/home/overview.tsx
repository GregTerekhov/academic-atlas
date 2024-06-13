import { SectionTitle } from 'types';

import { idValues } from 'helpers';
import { SectionTemplate } from 'template';
// import { SvgIconUI } from 'ui';

export default function ServiceOverview() {
  return (
    <SectionTemplate
      title={SectionTitle.HowItWorks}
      id={idValues.Overview ?? ''}
    >
      <p>Як працює сервіс</p>

      {/* <SvgIconUI />
      <SvgIconUI />
      <SvgIconUI />
      <SvgIconUI /> */}
    </SectionTemplate>
  );
}
