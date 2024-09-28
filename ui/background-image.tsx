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
    props: { srcSet, ...rest },
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
    BackgroundImageSizes.ExtraLargeWidth,
    BackgroundImageSizes.ExtraLargeHeight,
  );
  const desktopSrcSet = createImageSrcSet(
    common,
    desktopSrc,
    BackgroundImageSizes.DesktopWidth,
    BackgroundImageSizes.DesktopHeight,
  );
  const tabletSrcSet = createImageSrcSet(
    common,
    tabletSrc,
    BackgroundImageSizes.TabletWidth,
    BackgroundImageSizes.TabletHeight,
  );
  const mobileSrcSet = createImageSrcSet(
    common,
    mobileSrc,
    BackgroundImageSizes.MobileWidth,
    BackgroundImageSizes.MobileHeight,
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
        media='(max-width: 767px)'
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
