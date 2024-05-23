import { Container } from 'layout';
import { AccordionUI } from 'ui';

export default function Faq() {
  return (
    <main>
      <Container>
        <h1>FAQ</h1>
        <AccordionUI>
          <AccordionUI>
            <p>Questions</p>
          </AccordionUI>
        </AccordionUI>
      </Container>
    </main>
  );
}
