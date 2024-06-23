import Container from 'layout/container';
import Image from 'next/image';

import whoWeAreImage from '/public/images/partneship-who-are-we.webp';
import whatWeAreLookingImage from '/public/images/partneship-what-we-are-looking-for.webp';

const localComponentData = [
  {
    header: 'Хто ми?',
    description:
      'Ми - платформа, що спеціалізується на виконанні наукових робіт на замовлення. Наша мета - надавати якісні та професійні послуги нашим клієнтам, допомагаючи їм досягти успіху в їхніх навчальних цілях',
    imageData: {
      src: whoWeAreImage,
      alt: 'a couple arm pointing on a laptop',
      style:
        'relative w-full max-md:h-[180px] bg-contain before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-accentSecondary/10 before:content-[""]',
    },
  },
  {
    header: 'Кого ми шукаємо?',
    description:
      'Ми запрошуємо талановитих та відповідальних виконавців, готових долучитися до нашої команди. Якщо ви експерт у вашій галузі, володієте високим рівнем професіоналізму та бажаєте працювати в команді, це місце для вас',
    imageData: {
      src: whatWeAreLookingImage,
      alt: 'people sitting at the desktop',
      style:
        'relative w-full max-md:h-[180px] bg-contain before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-accentSecondary/10 before:content-[""]',
    },
  },
];

export default function AboutUs() {
  return (
    <Container>
      <ul>
        {localComponentData.map(({ header, description, imageData }) => {
          return (
            <li
              key={header}
              className='mb-8'
            >
              <h2 className='text-start'>{header}</h2>
              <p className='generalText my-6'>{description}</p>
              <Image
                src={imageData.src}
                alt={imageData.alt}
                className={imageData.style}
              />
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
