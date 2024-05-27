import { SvgIconUI } from '.';

export default function Accordion({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  return (
    <>
      <p>Accordion</p>
      <div>
        <SvgIconUI />
        {title}
      </div>
      {children}
    </>
  );
}
