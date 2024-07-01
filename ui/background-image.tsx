import { getImageProps } from 'next/image';

interface BackgroundImageProps {
  alt: string;
  desktopSrc: string;
  tabletSrc: string;
  mobileSrc: string;
  desktopWidth: number;
  desktopHeight: number;
  tabletWidth: number;
  tabletHeight: number;
  mobileWidth: number;
  mobileHeight: number;
  desktopDarkSrc?: string;
  tabletDarkSrc?: string;
  mobileDarkSrc?: string;
  priority?: boolean;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  alt,
  desktopSrc,
  tabletSrc,
  mobileSrc,
  desktopWidth,
  desktopHeight,
  tabletWidth,
  tabletHeight,
  mobileWidth,
  mobileHeight,
  desktopDarkSrc,
  tabletDarkSrc,
  mobileDarkSrc,
}) => {
  const common = { alt, sizes: '100vw' };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: desktopWidth,
    height: desktopHeight,
    quality: 80,
    src: desktopSrc,
  });

  const {
    props: { srcSet: tablet },
  } = getImageProps({
    ...common,
    width: tabletWidth,
    height: tabletHeight,
    quality: 70,
    src: tabletSrc,
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: mobileWidth,
    height: mobileHeight,
    quality: 70,
    src: mobileSrc,
  });

  const desktopDark = desktopDarkSrc
    ? getImageProps({
        ...common,
        width: desktopWidth,
        height: desktopHeight,
        quality: 80,
        src: desktopDarkSrc,
      }).props.srcSet
    : desktop;

  const tabletDark = tabletDarkSrc
    ? getImageProps({
        ...common,
        width: tabletWidth,
        height: tabletHeight,
        quality: 70,
        src: tabletDarkSrc,
      }).props.srcSet
    : tablet;

  const mobileDark = mobileDarkSrc
    ? getImageProps({
        ...common,
        width: mobileWidth,
        height: mobileHeight,
        quality: 70,
        src: mobileDarkSrc,
      }).props.srcSet
    : mobile;

  return (
    <picture>
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
      <source
        media='(min-width: 1440px) and (prefers-color-scheme: dark)'
        srcSet={desktopDark}
      />
      <source
        media='(min-width: 768px) and (prefers-color-scheme: dark)'
        srcSet={tabletDark}
      />
      <source
        media='(min-width: 375px) and (prefers-color-scheme: dark)'
        srcSet={mobileDark}
      />
      <img
        {...rest}
        alt={alt}
        // style={{ width: '100%', height: 'auto', position: 'absolute', top: 0, left: 0, zIndex: -1 }}
        className='z-minus-1 absolute left-0 top-0 h-auto w-full'
      />
    </picture>
  );
};

export default BackgroundImage;
