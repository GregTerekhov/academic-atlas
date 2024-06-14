import { SectionTitle, SectionDescriptions } from 'types';

import { Container } from 'layout';

export default function Section({
  title,
  children,
  isBigTitle = false,
  id,
  titleStyle,
  noAlignment,
}: Readonly<{
  title: SectionTitle;
  children: React.ReactNode;
  isBigTitle?: boolean;
  id?: string;
  titleStyle?: string;
  noAlignment?: string;
}>) {
  const backgroundVariants: Partial<Record<SectionTitle, string>> = {
    [SectionTitle.Hero]: 'bg-hero',
    [SectionTitle.FindOutCost]: 'bg-find-out-cost',
    [SectionTitle.Performers]: 'bg-performers',
    [SectionTitle.Promotions]: 'bg-promotions',
  };

  return (
    <section
      id={id}
      className={
        backgroundVariants[title]
          ? `${backgroundVariants[title]} relative w-full bg-cover bg-center bg-no-repeat py-20 text-whiteBase before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-accentSecondary/10 before:content-[""] lg:py-[120px]`
          : 'bg-transparent text-darkBase dark:text-whiteBase'
      }
    >
      <Container>
        {isBigTitle ? (
          <h1 className={titleStyle ?? ''}>{SectionDescriptions[title]}</h1>
        ) : (
          <h2 className={noAlignment ?? ''}>{SectionDescriptions[title]}</h2>
        )}
        {children}
      </Container>
    </section>
  );
}
