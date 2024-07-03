import { getImageProps } from 'next/image';

interface BackgroundImageProps {
  alt: string;
  largeDesktopSrc: string;
  desktopSrc: string;
  tabletSrc: string;
  mobileSrc: string;
  priority?: boolean;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  alt,
  largeDesktopSrc,
  desktopSrc,
  tabletSrc,
  mobileSrc,
  priority = false,
}) => {
  const common = { alt, sizes: '100vw', priority };

  const {
    props: { srcSet: largeDesktop },
  } = getImageProps({
    ...common,
    width: 2000,
    height: 1080,
    src: largeDesktopSrc,
  });

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: 1440,
    height: 1080,
    src: desktopSrc,
  });

  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    width: 768,
    height: 1080,
    src: tabletSrc,
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: 375,
    height: 1080,
    src: mobileSrc,
  });

  return (
    <picture className='z-minus-1 absolute inset-0 mx-auto h-full w-full max-w-[4000px]'>
      <source
        media='(min-width: 2000px)'
        srcSet={largeDesktop}
      />
      <source
        media='(min-width: 1440px)'
        srcSet={desktop}
      />
      <source
        media='(min-width: 768px)'
        srcSet={tablet}
      />
      <source
        media='(min-width: 375px)'
        srcSet={mobile}
      />
      <img
        {...rest}
        alt={alt}
        className='h-full w-full object-cover'
      />
    </picture>
  );
};

export default BackgroundImage;
