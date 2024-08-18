import { render, screen } from '@testing-library/react';
import Image from 'next/image';

import { ImageSize, SectionDescriptions, SectionTitle } from 'types';

import Hero from 'components/FAQ/hero';
import { ImageUI } from 'ui';

interface IImageProps {
  src: string;
  alt: string;
  width: ImageSize;
  height: ImageSize;
  className: string;
  priority?: boolean;
}

jest.mock('ui', () => ({
  ImageUI: jest.fn().mockImplementation((props: IImageProps) => {
    const {  ...restProps } = props;

    return (
      <Image
        {...restProps}
        alt={props.alt}
        priority={false}
        data-testid='image-ui'
      />
    );
  }),
}));

jest.mock('template', () => ({
  SectionTemplate: jest.fn(({ title, children }) => {
    return (
      <section>
        <h1>
          {title === SectionTitle.FAQHero ? SectionDescriptions[SectionTitle.FAQHero] : title}
        </h1>
        {children}
      </section>
    );
  }),
}));

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    faqHero: {
      title: SectionTitle.FAQHero,
      description: SectionDescriptions[SectionTitle.FAQHero],
    },
  })),
  imageSettings: {
    faqHero: {
      src: '/images/faq-hero.png',
      alt: 'FAQ Hero Image',
      width: 537,
      height: 584,
      className: 'hero-image',
    },
  },
}));

describe('FAQ Hero Component', () => {
  it('should render FAQ Hero component correctly', () => {
    render(<Hero />);
    screen.debug();

    const heading = screen.getByText(SectionDescriptions[SectionTitle.FAQHero]);
    expect(heading).toBeInTheDocument();

    const image = screen.getByTestId('image-ui');
    expect(image).toBeInTheDocument();

    expect(ImageUI).toHaveBeenCalledWith(
      expect.objectContaining({
        src: '/images/faq-hero.png',
        alt: 'FAQ Hero Image',
        width: 537,
        height: 584,
        className: 'hero-image',
      }),
      {},
    );
  });
});
