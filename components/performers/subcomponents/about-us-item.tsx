import Image from 'next/image';

interface IAboutUsItemProps {
  header: string;
  description: string;
  src: string;
  alt: string;
}

export default function AboutUsItem({ header, description, src, alt }: IAboutUsItemProps) {
  return (
    <li className='lg:flex lg:items-center lg:justify-between lg:gap-x-20 lg:odd:flex-row-reverse'>
      <div className='lg:basis-1/2'>
        <h2 className='text-start'>{header}</h2>
        <p className='generalText my-6'>{description}</p>
      </div>
      <div className='relative overflow-hidden rounded-lg bg-cover before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-accentSecondary/10 before:content-[""] lg:w-[512px]'>
        <Image
          src={src}
          alt={alt}
          height={180}
          width={327}
          className='w-auto object-cover md:h-[280px] md:w-[512px]'
        />
      </div>
    </li>
  );
}
