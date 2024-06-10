import { SectionTitle } from 'types';

import { idValues } from 'helpers';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Promotions() {
  return (
    <SectionTemplate
      title={SectionTitle.Promotions}
      id={idValues.Promotions ?? ''}
    >
      <p>Акційні пропозиції</p>
      <PrimaryButtonUI>Замовити</PrimaryButtonUI>
    </SectionTemplate>
  );
}
