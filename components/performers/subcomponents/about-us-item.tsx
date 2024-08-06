import { partnershipAboutImageSettings } from 'data';

import { ImageUI } from 'ui';

import { getAboutUsImageStyles } from 'styles';

interface IAboutUsItemProps {
  header: string;
  description: string;
  src: string;
  alt: string;
}

export default function AboutUsItem({ header, description, src, alt }: IAboutUsItemProps) {
  const { width, height, className } = partnershipAboutImageSettings;

  const imageWrapperClass = getAboutUsImageStyles();

  return (
    <li className='lg:flex lg:items-center lg:justify-between lg:gap-x-20 lg:odd:flex-row-reverse'>
      <div className='lg:basis-1/2'>
        <h2 className='text-start'>{header}</h2>
        <p className='generalText my-6'>{description}</p>
      </div>
      <div className={imageWrapperClass}>
        <ImageUI
          src={src}
          alt={alt}
          height={width}
          width={height}
          className={className}
        />
      </div>
    </li>
  );
}
