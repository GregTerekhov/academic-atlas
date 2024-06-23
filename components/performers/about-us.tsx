import { getSectionClasses } from 'helpers/sectionHelper';
import Container from 'layout/container';
import { SectionTitle } from 'types/layoutTypes';

const localComponentData = [
  {
    header: 'Хто ми?',
    description:
      'Ми - платформа, що спеціалізується на виконанні наукових робіт на замовлення. Наша мета - надавати якісні та професійні послуги нашим клієнтам, допомагаючи їм досягти успіху в їхніх навчальних цілях',
    backgroundTitle: SectionTitle.Performers,
  },
  {
    header: 'Кого ми шукаємо?',
    description:
      'Ми запрошуємо талановитих та відповідальних виконавців, готових долучитися до нашої команди. Якщо ви експерт у вашій галузі, володієте високим рівнем професіоналізму та бажаєте працювати в команді, це місце для вас',
    backgroundTitle: SectionTitle.PartnershipAboutUs,
  },
];

export default function AboutUs() {
  return (
    <Container>
      <ul>
        {localComponentData.map(({ header, description, backgroundTitle }) => {
          const sectionClasses = getSectionClasses(backgroundTitle);

          return (
            <li
              key={header}
              className='mb-8'
            >
              <h2 className='text-start'>{header}</h2>
              <p className='generalText my-6'>{description}</p>
              <div className={`${sectionClasses}`}></div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
