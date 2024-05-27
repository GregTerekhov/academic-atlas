import { SectionTemplate } from 'template';
import GridItem from './grid-item';

export default function Services() {
  return (
    <SectionTemplate>
      <p>Наші послуги</p>
      <ul>
        <GridItem />
      </ul>
    </SectionTemplate>
  );
}
