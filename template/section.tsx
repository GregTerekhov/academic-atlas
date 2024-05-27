import { SectionHeading } from 'ui';

export default function Section({
  children,
  hasBackground,
}: Readonly<{
  children: React.ReactNode;
  hasBackground?: boolean;
}>) {
  return (
    <section className={hasBackground ? 'bg-transparent' : ''}>
      <SectionHeading />
      {children}
    </section>
  );
}
