import { SectionTemplate } from 'template/index';
import { CtaText, PrimaryButtonLabel, SectionTitle } from 'types';

// import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Hero() {
  return (
    <>
      <SectionTemplate
        isBigTitle
        title={SectionTitle.PartnershipHero}
        hasCtaText
        ctaText={CtaText.PartnershipHero}
      >
        <PrimaryButtonUI>{PrimaryButtonLabel.Accession}</PrimaryButtonUI>
      </SectionTemplate>
    </>
  );
}
