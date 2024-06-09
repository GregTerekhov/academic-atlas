import Container from 'layout/container';
import { type SectionTitle, SectionDescriptions } from 'types';

export default function Section({
  title,
  children,
  isBigTitle = false,
  hasBackground = false,
  id,
}: Readonly<{
  title: SectionTitle;
  children: React.ReactNode;
  isBigTitle?: boolean;
  hasBackground?: boolean;
  id?: string;
}>) {
  const getSectionStyle = (hasBackground: boolean, title: SectionTitle) => {
    return hasBackground
      ? `bg-${title} py-20 lg:py-[120px] w-full bg-cover bg-center bg-no-repeat`
      : 'bg-transparent py-8 md:py-16 lg:py-[104px] w-full';
  };

  return (
    <section
      id={id}
      className={getSectionStyle(hasBackground, title)}
    >
      <Container>
        {isBigTitle ? <h1>{SectionDescriptions[title]}</h1> : <h2>{SectionDescriptions[title]}</h2>}
        {children}
      </Container>
    </section>
  );
}
