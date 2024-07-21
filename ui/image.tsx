import Image from 'next/image';

import { ImageSize } from 'types';

interface IImageProps {
  src: string;
  alt: string;
  width: ImageSize;
  height: ImageSize;
  className: string;
  priority?: boolean;
}

const BLUR_URL =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOUlgQAAFUANhyb7cwAAAAASUVORK5CYII=';

export default function DynamicImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: IImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      blurDataURL={BLUR_URL}
      placeholder='blur'
    />
  );
}
