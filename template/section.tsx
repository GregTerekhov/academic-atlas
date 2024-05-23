export default function Section({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <h2 className='text-5xl'>Section</h2>
      {children}
    </section>
  );
}
