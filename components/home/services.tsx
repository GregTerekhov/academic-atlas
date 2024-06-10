import { SectionTemplate } from 'template';
import GridItem from './grid-item';
import { SectionTitle } from 'types/sectionTitle';

export default function Services() {
  return (
    <SectionTemplate title={SectionTitle.OurServices}>
      <p>Наші послуги</p>
      <ul>
        <GridItem />
      </ul>
    </SectionTemplate>
  );
}
