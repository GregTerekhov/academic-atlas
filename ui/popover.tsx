export default function Popover({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <p>Popover</p>
      {children}
    </>
  );
}
