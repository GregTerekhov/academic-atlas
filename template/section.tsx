import Container from 'layout/container';
import { SectionTitle, SectionDescriptions } from 'types';

export default function Section({
  title,
  children,
  isBigTitle = false,
  id,
}: Readonly<{
  title: SectionTitle;
  children: React.ReactNode;
  isBigTitle?: boolean;
  id?: string;
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
          ? `${backgroundVariants[title]} w-full bg-cover bg-center bg-no-repeat py-20 lg:py-[120px]`
          : 'bg-transparent'
      }
    >
      <Container>
        {isBigTitle ? <h1>{SectionDescriptions[title]}</h1> : <h2>{SectionDescriptions[title]}</h2>}
        {children}
      </Container>
    </section>
  );
}
