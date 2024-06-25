import { getAboutUsData } from 'helpers/componentsData';
import Container from 'layout/container';
import { AboutUsItem } from './subcomponents';

export default function AboutUs() {
  const aboutUsData = getAboutUsData();

  return (
    <section className='py-8 md:py-16 lg:py-[114px]'>
      <Container>
        <ul className='space-y-8 max-lg:mx-auto max-lg:max-w-[512px] lg:flex lg:flex-wrap'>
          {Array.isArray(aboutUsData) &&
            aboutUsData.map(({ header, description, imageData, lgPosition }) => {
              return (
                <li
                  key={header}
                  className={`lg:flex lg:gap-20 ${lgPosition}`}
                >
                  <AboutUsItem
                    header={header}
                    description={description}
                    imageData={imageData}
                  />
                </li>
              );
            })}
        </ul>
      </Container>
    </section>
  );
}
