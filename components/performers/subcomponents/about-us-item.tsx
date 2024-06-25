import Image from 'next/image';
import { IAboutUs } from 'types/components';

export default function AboutUsItem({ header, description, imageData, lgPosition }: IAboutUs) {
  return (
    <li
      key={header}
      className={`lg:flex lg:gap-20 ${lgPosition}`}
    >
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
    </li>
  );
}
