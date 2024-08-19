import { type IAboutUs } from 'types';
import { getAboutUsData } from 'data';
import { Container } from 'layout';
import { MappedListTemplate } from 'template';
import { AboutUsItem } from './subcomponents';

export default function AboutUs() {
  const aboutUsData = getAboutUsData();

  return (
    <section className='py-20 md:py-24 lg:py-[104px]'>
      <Container>
        <MappedListTemplate<IAboutUs>
          items={aboutUsData}
          className='space-y-8 max-lg:max-w-[512px] md:space-y-6 md:max-lg:mx-auto lg:px-[72px]'
        >
          {({ id, title, description, imageSrc, imageAlt }) => (
            <AboutUsItem
              key={id}
              header={title}
              description={description}
              src={imageSrc}
              alt={imageAlt}
            />
          )}
        </MappedListTemplate>
      </Container>
    </section>
  );
}
