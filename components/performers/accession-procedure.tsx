import { PrimaryButtonLabel } from 'types';

// import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Accession() {
  return (
    <>
      {/* <SectionTemplate> */}
      <p>Accession</p>
      <PrimaryButtonUI>{PrimaryButtonLabel.Accession}</PrimaryButtonUI>
      {/* </SectionTemplate> */}
    </>
  );
}
