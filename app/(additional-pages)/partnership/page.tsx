import { GridItem, Workflow } from 'components';
import { PrimaryButtonLabel } from 'types/ui';
import { PrimaryButtonUI } from 'ui';

export default function Partnership() {
  return (
    <>
      <h1>Partnership</h1>
      <ul>
        <GridItem />
      </ul>
      <Workflow />
      <PrimaryButtonUI>{PrimaryButtonLabel.Accession}</PrimaryButtonUI>
    </>
  );
}
