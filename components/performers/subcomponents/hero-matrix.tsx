import Image from 'next/image';

import { IHeroGrid } from 'types';
import { getHeroGrid, heroMatrixImageSettings } from 'helpers';

import { MappedListTemplate } from 'template';

export default function HeroMatrix() {
  const cells = getHeroGrid();
  const { width, height, className: imageClass } = heroMatrixImageSettings;

  const cellSize = 'size-20 lg:size-44';

  return (
    <MappedListTemplate<IHeroGrid>
      items={cells}
      className='hidden w-max md:grid md:grid-rows-3 md:gap-2 lg:gap-1'
    >
      {({ id, className, imageSrc, imageAlt }) => (
        <li
          key={id}
          className={`${className} ${cellSize}`}
        >
          {imageSrc && imageAlt && (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={width}
              height={height}
              className={imageClass}
            />
          )}
        </li>
      )}
    </MappedListTemplate>
  );
}
