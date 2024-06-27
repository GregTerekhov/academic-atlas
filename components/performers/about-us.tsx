import { getAboutUsData } from 'helpers';

import { Container } from 'layout';
import { AboutUsItem } from './subcomponents';

export default function AboutUs() {
  const aboutUsData = getAboutUsData();

  return (
    <section className='py-8 md:py-16 lg:py-[114px]'>
      <Container>
        <ul className='space-y-8 max-lg:max-w-[512px] md:space-y-6 md:max-lg:mx-auto lg:px-[72px]'>
          {Array.isArray(aboutUsData) &&
            aboutUsData.map(({ id, header, description, imageData }) => (
              <AboutUsItem
                key={id}
                header={header}
                description={description}
                imageData={imageData}
              />
            ))}
        </ul>
      </Container>
    </section>
  );
}
