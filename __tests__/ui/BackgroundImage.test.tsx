import { render, screen } from '@testing-library/react';

import { BackgroundImageUI } from 'ui';

jest.mock('next/image', () => ({
  getImageProps: jest.fn(({ src, width, height }) => ({
    props: {
      srcSet: `${src} ${width}w`,
      src,
      width,
      height,
      alt: 'Mocked Alt',
      sizes: '100vw',
      priority: true,
    },
  })),
}));

describe('BackgroundImageUI Component', () => {
  const props = {
    alt: 'Example Image',
    largeDesktopSrc: 'large-desktop.jpg',
    desktopSrc: 'desktop.jpg',
    tabletSrc: 'tablet.jpg',
    mobileSrc: 'mobile.jpg',
    priority: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render picture with correct sources and img', () => {
    render(<BackgroundImageUI {...props} />);

    const imgElement = screen.getByRole('img');

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('alt', props.alt);

    const pictureElement = imgElement.parentElement as HTMLElement;

    const sources = pictureElement.querySelectorAll('source');

    expect(sources[0]).toHaveAttribute('media', '(min-width: 2000px)');
    expect(sources[0]).toHaveAttribute('srcset', 'large-desktop.jpg 2000w');

    expect(sources[1]).toHaveAttribute('media', '(min-width: 1440px)');
    expect(sources[1]).toHaveAttribute('srcset', 'desktop.jpg 1440w');

    expect(sources[2]).toHaveAttribute('media', '(min-width: 768px)');
    expect(sources[2]).toHaveAttribute('srcset', 'tablet.jpg 768w');

    expect(sources[3]).toHaveAttribute('media', '(max-width: 767px)');
    expect(sources[3]).toHaveAttribute('srcset', 'mobile.jpg 375w');
  });
});
