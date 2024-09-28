import { getSkeletonLines } from 'data';
import { mapArray } from 'helpers';

import { Container } from 'layout';

import { skeletonStyles } from 'styles';

export default function Skeleton() {
  const { section, container, block } = skeletonStyles;

  const lines = getSkeletonLines();

  return (
    <section
      className={section}
      data-testid='skeleton-section'
    >
      <Container>
        <div className={container}>
          <div>
            {mapArray(lines, ({ id, className }) => (
              <div
                key={id}
                data-testid={`line-${id}`}
                className={`${className} w-full rounded-3xl bg-accentPrimary/20 dark:bg-whiteBase/20`}
              ></div>
            ))}
          </div>
          <div
            className={block}
            data-testid='block'
          ></div>
        </div>
      </Container>
    </section>
  );
}
