import Image, { StaticImageData } from 'next/image';

interface IAboutUsItemProps {
  header: string;
  description: string;
  imageData: {
    src: StaticImageData | string;
    alt: string;
  };
}

export default function AboutUsItem({ header, description, imageData }: IAboutUsItemProps) {
  return (
    <>
      <div>
        <h2 className='text-start'>{header}</h2>
        <p className='generalText my-6'>{description}</p>
      </div>
      <Image
        src={imageData.src}
        alt={imageData.alt}
        height={180}
        width={327}
        className='relative rounded-3xl bg-contain before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-accentSecondary/10 before:content-[""] md:h-[280px] md:w-[512px]'
      />
    </>
  );
}
