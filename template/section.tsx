export default function Section({
  children,
  hasBackground,
  isBigTitle,
}: Readonly<{
  children: React.ReactNode;
  hasBackground?: boolean;
  isBigTitle?: boolean;
}>) {
  return (
    <section className={hasBackground ? 'bg-transparent' : ''}>
      {isBigTitle ? <h1>SectionHeading</h1> : <h2>SectionHeading</h2>}
      {children}
    </section>
  );
}
