import { getAboutUsData } from 'helpers';

import { Container } from 'layout';
import { AboutUsItem } from './subcomponents';

// import whoWeAreImage from '../../public/images/partnership-who-we-are.webp';
// import whatWeAreLookingImage from '../../public/images/partnership-what-we-are-looking-for.webp';

// const aboutUsData = [
//   {
//     header: 'Хто ми?',
//     description:
//       'Ми - платформа, що спеціалізується на виконанні наукових робіт на замовлення. Наша мета - надавати якісні та професійні послуги нашим клієнтам, допомагаючи їм досягти успіху в їхніх навчальних цілях',
//     imageData: {
//       src: whoWeAreImage,
//       alt: 'a couple arm pointing on a laptop',
//     },
//     lgPosition: 'lg:flex-row-reverse',
//   },
//   {
//     header: 'Кого ми шукаємо?',
//     description:
//       'Ми запрошуємо талановитих та відповідальних виконавців, готових долучитися до нашої команди. Якщо ви експерт у вашій галузі, володієте високим рівнем професіоналізму та бажаєте працювати в команді, це місце для вас',
//     imageData: {
//       src: whatWeAreLookingImage,
//       alt: 'people sitting at the desktop',
//     },
//     lgPosition: '',
//   },
// ];

export default function AboutUs() {
  const aboutUsData = getAboutUsData();

  return (
    <section className='py-8 md:py-16 lg:py-[114px]'>
      <Container>
        <ul className='space-y-8 max-lg:max-w-[512px] md:space-y-6 md:max-lg:mx-auto lg:px-[72px]'>
          {Array.isArray(aboutUsData) &&
            aboutUsData.map(({ header, description, imageData }) => (
              // <li
              //   key={header}
              //   className={`lg:flex lg:gap-20 ${lgPosition}`}
              // >
              <AboutUsItem
                key={header}
                header={header}
                description={description}
                imageData={imageData}
              />
              // </li>
            ))}
        </ul>
      </Container>
    </section>
  );
}
