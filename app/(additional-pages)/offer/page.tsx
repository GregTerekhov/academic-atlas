import { SectionTitle } from 'types';

import { SectionTemplate } from 'template';

export default function OfferAgreement() {
  return (
    <SectionTemplate
      isBigTitle
      title={SectionTitle.Offer}
      titleStyle='text-center'
    >
      <p>OfferAgreement</p>
    </SectionTemplate>
  );
}
