import { type IHeroGrid } from 'types';
import { getHeroGrid, heroMatrixImageSettings } from 'helpers';

import { MappedListTemplate } from 'template';
import { ImageUI } from 'ui';

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
            <ImageUI
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
