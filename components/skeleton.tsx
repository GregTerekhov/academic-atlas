import { Container } from 'layout';
import { getSkeletonLines, mapArray } from 'helpers';

import { skeletonStyles } from 'styles';

export default function Skeleton() {
  const { section, container, block } = skeletonStyles;

  const lines = getSkeletonLines();

  return (
    <section className={section}>
      <Container>
        <div className={container}>
          <div>
            {mapArray(lines, ({ id, className }) => (
              <div
                key={id}
                className={`${className} w-full rounded-3xl bg-accentPrimary/20 dark:bg-whiteBase/20`}
              ></div>
            ))}
          </div>
          <div className={block}></div>
        </div>
      </Container>
    </section>
  );
}
