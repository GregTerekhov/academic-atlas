import { getImageProps } from 'next/image';

import { BackgroundImageSizes } from 'types';

interface IBackgroundImageProps {
  alt: string;
  largeDesktopSrc: string;
  desktopSrc: string;
  tabletSrc: string;
  mobileSrc: string;
  priority?: boolean;
}

interface ICommonImageProps {
  alt: string;
  sizes: string;
  priority: boolean;
}

const createImageSrcSet = (
  common: ICommonImageProps,
  src: string,
  width: number,
  height: number,
) => {
  const {
    props: { srcSet, ...rest }, //FIXME --- А що ми маємо передавати в rest?
  } = getImageProps({
    ...common,
    src,
    width,
    height,
  });

  return { srcSet, rest };
};

export default function BackgroundImage({
  alt,
  largeDesktopSrc,
  desktopSrc,
  tabletSrc,
  mobileSrc,
  priority = false,
}: IBackgroundImageProps) {
  const common = { alt, sizes: '100vw', priority };

  const largeDesktopSrcSet = createImageSrcSet(
    common,
    largeDesktopSrc,
    BackgroundImageSizes.ExtraLarge,
    BackgroundImageSizes.CommonHeight,
  );
  const desktopSrcSet = createImageSrcSet(
    common,
    desktopSrc,
    BackgroundImageSizes.Desktop,
    BackgroundImageSizes.CommonHeight,
  );
  const tabletSrcSet = createImageSrcSet(
    common,
    tabletSrc,
    BackgroundImageSizes.Tablet,
    BackgroundImageSizes.CommonHeight,
  );
  const mobileSrcSet = createImageSrcSet(
    common,
    mobileSrc,
    BackgroundImageSizes.Mobile,
    BackgroundImageSizes.CommonHeight,
  );

  return (
    <picture className='absolute inset-0 mx-auto h-full w-full max-w-[4000px]'>
      <source
        media='(min-width: 2000px)'
        srcSet={largeDesktopSrcSet.srcSet}
      />
      <source
        media='(min-width: 1440px)'
        srcSet={desktopSrcSet.srcSet}
      />
      <source
        media='(min-width: 768px)'
        srcSet={tabletSrcSet.srcSet}
      />
      <source
        media='(min-width: 375px)'
        srcSet={mobileSrcSet.srcSet}
      />
      <img
        {...mobileSrcSet.rest}
        alt={alt}
        className='h-full w-full object-cover'
      />
    </picture>
  );
}
