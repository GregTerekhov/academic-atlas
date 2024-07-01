import Image from 'next/image';

import { ImageSize } from 'types';

interface IImageProps {
  src: string;
  alt: string;
  width?: ImageSize;
  height?: ImageSize;
  className?: string;
  priority?: boolean;
}

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
    />
  );
}
