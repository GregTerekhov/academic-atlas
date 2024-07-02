import { getImageProps } from 'next/image';

interface BackgroundImageProps {
  alt: string;
  desktopSrc: string;
  tabletSrc: string;
  mobileSrc: string;
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
  desktopDarkSrc,
  tabletDarkSrc,
  mobileDarkSrc,
  priority = false,
}) => {
  const common = { alt, sizes: '100vw', priority };

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

  const desktopDark = desktopDarkSrc
    ? getImageProps({
        ...common,
        src: desktopDarkSrc,
        width: 1440,
        height: 1080,
      }).props.srcSet
    : desktop;

  const tabletDark = tabletDarkSrc
    ? getImageProps({
        ...common,
        src: tabletDarkSrc,
        width: 768,
        height: 800,
      }).props.srcSet
    : tablet;

  const mobileDark = mobileDarkSrc
    ? getImageProps({
        ...common,
        src: mobileDarkSrc,
        width: 350,
        height: 1334,
      }).props.srcSet
    : mobile;

  return (
    <picture className='z-minus-1 absolute inset-0 h-full w-full'>
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
        className='h-full w-full'
      />
    </picture>
  );
};

export default BackgroundImage;
