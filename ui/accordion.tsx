import { SvgIconUI } from '.';

export default function Accordion({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <p>Accordion</p>
      <SvgIconUI />
      {children}
    </>
  );
}
