import { Container } from 'layout';
import { GridItem } from 'components';
import { PopoverUI, PrimaryButtonUI } from 'ui';

export default function Partnership() {
  return (
    <main>
      <Container>
        <h1>Partnership</h1>
        <ul>
          <GridItem />
        </ul>
        <PopoverUI />
        <PrimaryButtonUI />
      </Container>
    </main>
  );
}
