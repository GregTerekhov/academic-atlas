import Container from 'layout/container';
import { SectionTitle, SectionDescriptions } from 'types/sectionTitle';

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
  const backgroundImage = hasBackground ? `url('/backgroundImage/${title}.webp')` : '';

  const paddingClasses = hasBackground
    ? 'py-[80px] md:py-[80px] lg:py-[120px]'
    : 'py-[36px] md:py-[64px] lg:py-[104px]';

  return (
    <div
      style={{
        backgroundImage: hasBackground ? `${backgroundImage}` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
      }}
    >
      <Container>
        <section
          id={id}
          className={paddingClasses}
        >
          {isBigTitle ? (
            <h1>{SectionDescriptions[title]}</h1>
          ) : (
            <h2>{SectionDescriptions[title]}</h2>
          )}
          {children}
        </section>
      </Container>
    </div>
  );
}
