import Image from 'next/image';

import { getHeroGrid } from 'helpers';

function HeroMatrix() {
  const cells = getHeroGrid();

  const cellSize = 'size-20 lg:size-44';

  return (
    <ul className='hidden w-max md:grid md:grid-rows-3 md:gap-2 lg:gap-1'>
      {Array.isArray(cells) &&
        cells.map(({ id, className, imageSrc, imageAlt }) => (
          <li
            key={id}
            className={`${className} ${cellSize}`}
          >
            {imageSrc && imageAlt && (
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={80}
                height={80}
                className='lg:size-44'
              />
            )}
          </li>
        ))}
    </ul>
  );
}

export default HeroMatrix;
