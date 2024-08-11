import { render, screen } from '@testing-library/react';
import Image from 'next/image';
import Hero from 'components/FAQ/hero';

import { SectionDescriptions, SectionTitle } from 'types';

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

jest.mock('ui', () => ({
  ImageUI: jest.fn(({ src, alt, width, height, className, ...rest }) => (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...rest}
    />
  )),
}));

describe('FAQ Hero Component', () => {
  it('should render FAQ Hero component correctly', () => {
    render(<Hero />);
    screen.debug();

    const heading = screen.getByText(SectionDescriptions[SectionTitle.FAQHero]);
    expect(heading).toBeInTheDocument();

    const image = screen.getByAltText('FAQ Hero Image');
    expect(image).toBeInTheDocument();

    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('/_next/image?url=%2Fimages%2Ffaq-hero.png'),
    );

    expect(image).toHaveAttribute('width', '537');
    expect(image).toHaveAttribute('height', '584');
    expect(image).toHaveClass('hero-image');
  });
});
